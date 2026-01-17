import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { useAccount, useBalance, useDisconnect, useSwitchChain, useChainId, useSignMessage } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { formatUnits } from 'viem';
import toast from 'react-hot-toast';
import { arcTestnet } from '@/lib/wagmi';
import { supabase } from '@/integrations/supabase/client';
import { 
  createSiweMessage, 
  formatSiweMessage, 
  generateNonce,
  type SiweMessage 
} from '@/lib/siwe';
import { Session, User } from '@supabase/supabase-js';

interface SiweSession {
  message: SiweMessage;
  signature: `0x${string}`;
  formattedMessage: string;
}

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  truncatedAddress: string | null;
  balance: string;
  isCorrectNetwork: boolean;
  isConnecting: boolean;
  siweSession: SiweSession | null;
  isAuthenticated: boolean;
  isSigning: boolean;
  supabaseUser: User | null;
  supabaseSession: Session | null;
  userId: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  switchNetwork: () => Promise<void>;
  signIn: () => Promise<boolean>;
  signOut: () => void;
  getAuthHeaders: () => Record<string, string>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

const SIWE_SESSION_KEY = 'intent_siwe_session';
const SESSION_EXPIRY_MINUTES = 60;

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const { address, isConnected, isConnecting: wagmiConnecting } = useAccount();
  const chainId = useChainId();
  const { open } = useWeb3Modal();
  const { disconnect: wagmiDisconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const { signMessageAsync } = useSignMessage();
  
  const [siweSession, setSiweSession] = useState<SiweSession | null>(null);
  const [isSigning, setIsSigning] = useState(false);
  const [supabaseUser, setSupabaseUser] = useState<User | null>(null);
  const [supabaseSession, setSupabaseSession] = useState<Session | null>(null);
  
  const { data: balanceData } = useBalance({
    address: address,
    chainId: arcTestnet.id,
  });

  const isCorrectNetwork = chainId === arcTestnet.id;
  
  const balance = balanceData 
    ? parseFloat(formatUnits(balanceData.value, balanceData.decimals)).toFixed(4) 
    : '0.0000';

  const truncatedAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : null;

  const isAuthenticated = useCallback(() => {
    if (!siweSession || !address) return false;
    
    if (siweSession.message.address.toLowerCase() !== address.toLowerCase()) {
      return false;
    }
    
    if (siweSession.message.expirationTime) {
      if (new Date(siweSession.message.expirationTime) < new Date()) {
        return false;
      }
    }
    
    return !!supabaseSession;
  }, [siweSession, address, supabaseSession]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSupabaseSession(session);
        setSupabaseUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSupabaseSession(session);
      setSupabaseUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(SIWE_SESSION_KEY);
      if (stored) {
        const session = JSON.parse(stored) as SiweSession;
        if (address && session.message.address.toLowerCase() === address.toLowerCase()) {
          if (session.message.expirationTime && new Date(session.message.expirationTime) > new Date()) {
            setSiweSession(session);
          } else {
            sessionStorage.removeItem(SIWE_SESSION_KEY);
          }
        }
      }
    } catch (e) {
      console.error('Failed to restore SIWE session:', e);
      sessionStorage.removeItem(SIWE_SESSION_KEY);
    }
  }, [address]);

  const authenticateWithBackend = useCallback(async (
    formattedMessage: string,
    signature: string,
    walletAddress: string
  ): Promise<boolean> => {
    try {
      console.log('[WalletContext] Authenticating with backend...');
      
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/auth-service/siwe-auth`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
          body: JSON.stringify({
            message: formattedMessage,
            signature,
            address: walletAddress,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('[WalletContext] Backend auth failed:', errorData);
        return false;
      }

      const data = await response.json();
      
      if (data.session) {
        const { error } = await supabase.auth.setSession({
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
        });

        if (error) {
          console.error('[WalletContext] Failed to set Supabase session:', error);
          return false;
        }

        console.log('[WalletContext] Supabase session established');
      }

      return true;
    } catch (error) {
      console.error('[WalletContext] Backend authentication error:', error);
      return false;
    }
  }, []);

  const signIn = useCallback(async (): Promise<boolean> => {
    if (!address || !isCorrectNetwork) {
      toast.error('Please connect wallet and switch to Arc Testnet');
      return false;
    }

    setIsSigning(true);
    
    try {
      const nonce = generateNonce();
      const message = createSiweMessage({
        address,
        chainId: arcTestnet.id,
        nonce,
        statement: 'Sign this message to authenticate with INTENT and prove ownership of your wallet.',
        expirationMinutes: SESSION_EXPIRY_MINUTES,
        resources: [`${window.location.origin}/api`],
      });
      
      const formattedMessage = formatSiweMessage(message);
      
      const signature = await signMessageAsync({
        message: formattedMessage,
        account: address as `0x${string}`,
      });
      
      const backendSuccess = await authenticateWithBackend(
        formattedMessage,
        signature,
        address
      );

      if (!backendSuccess) {
        toast.error('Backend authentication failed');
        return false;
      }

      const session: SiweSession = {
        message,
        signature: signature as `0x${string}`,
        formattedMessage,
      };
      
      setSiweSession(session);
      sessionStorage.setItem(SIWE_SESSION_KEY, JSON.stringify(session));
      
      toast.success('Signed in successfully');
      return true;
    } catch (error) {
      console.error('SIWE sign-in error:', error);
      if ((error as Error).message?.includes('rejected')) {
        toast.error('Signature rejected');
      } else {
        toast.error('Failed to sign in');
      }
      return false;
    } finally {
      setIsSigning(false);
    }
  }, [address, isCorrectNetwork, signMessageAsync, authenticateWithBackend]);

  const signOut = useCallback(async () => {
    setSiweSession(null);
    sessionStorage.removeItem(SIWE_SESSION_KEY);
    
    await supabase.auth.signOut();
    
    toast.success('Signed out');
  }, []);

  const getAuthHeaders = useCallback((): Record<string, string> => {
    const headers: Record<string, string> = {};
    
    if (siweSession) {
      headers['X-SIWE-Message'] = siweSession.formattedMessage;
      headers['X-SIWE-Signature'] = siweSession.signature;
      headers['X-SIWE-Address'] = siweSession.message.address;
    }
    
    if (supabaseSession?.access_token) {
      headers['Authorization'] = `Bearer ${supabaseSession.access_token}`;
    }
    
    return headers;
  }, [siweSession, supabaseSession]);

  const connect = async () => {
    try {
      await open();
    } catch (error) {
      console.error('Connection error:', error);
      toast.error('Failed to connect wallet');
    }
  };

  const disconnect = async () => {
    await signOut();
    wagmiDisconnect();
    toast.success('Wallet disconnected');
  };

  const switchNetworkHandler = async () => {
    try {
      switchChain({ chainId: arcTestnet.id });
      toast.success('Switched to Arc Testnet');
    } catch (error) {
      console.error('Switch network error:', error);
      toast.error('Failed to switch network');
    }
  };

  useEffect(() => {
    if (isConnected && isCorrectNetwork && address && !siweSession && !isSigning && !supabaseSession) {
      const timer = setTimeout(() => {
        signIn();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isConnected, isCorrectNetwork, address, siweSession, isSigning, signIn, supabaseSession]);

  useEffect(() => {
    if (siweSession && address && siweSession.message.address.toLowerCase() !== address.toLowerCase()) {
      signOut();
    }
  }, [address, siweSession, signOut]);

  useEffect(() => {
    if (isConnected && !isCorrectNetwork) {
      toast.error('Please switch to Arc Testnet', {
        duration: 4000,
        icon: '⚠️',
      });
    }
  }, [isConnected, isCorrectNetwork]);

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address: address || null,
        truncatedAddress,
        balance,
        isCorrectNetwork,
        isConnecting: wagmiConnecting,
        siweSession,
        isAuthenticated: isAuthenticated(),
        isSigning,
        supabaseUser,
        supabaseSession,
        userId: supabaseUser?.id || null,
        connect,
        disconnect,
        switchNetwork: switchNetworkHandler,
        signIn,
        signOut,
        getAuthHeaders,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
