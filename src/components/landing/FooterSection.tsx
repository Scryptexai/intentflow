import { motion } from "framer-motion";
import { Twitter, MessageCircle, Send, Shield } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xl font-bold text-gradient mb-3">INTENT</h3>
            <p className="text-sm text-muted-foreground">
              Proof of Structured Participation on Arc Network
            </p>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Security Audit</a></li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub Repo</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Arc Explorer</a></li>
            </ul>
          </div>
          
          {/* Community */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Community</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="https://twitter.com/ArcFlowFinance" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors inline-flex items-center gap-2">
                  <Twitter className="w-4 h-4" /> Twitter/X
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors inline-flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" /> Discord
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors inline-flex items-center gap-2">
                  <Send className="w-4 h-4" /> Telegram
                </a>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        {/* Supported dApps */}
        <div className="py-6 border-t border-border mb-8">
          <p className="text-sm text-muted-foreground mb-4">Supported dApps:</p>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="hover:text-primary transition-colors">ArcFlow Finance</span>
            <span className="text-border">|</span>
            <span className="hover:text-primary transition-colors">Aave on Arc</span>
            <span className="text-border">|</span>
            <span className="hover:text-primary transition-colors">Across Protocol</span>
            <span className="text-border">|</span>
            <span className="hover:text-primary transition-colors">Stargate</span>
            <span className="text-border">|</span>
            <span className="hover:text-primary transition-colors">Alchemy</span>
          </div>
        </div>
        
        {/* Security Warning */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20 mb-8"
        >
          <Shield className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            <span className="text-destructive font-semibold">INTENT will NEVER ask for your seed phrase or private keys.</span>
            <br />
            Always verify you're on intent.sbs before connecting wallet.
          </p>
        </motion.div>
        
        {/* Copyright */}
        <div className="text-center text-sm text-muted-foreground">
          © 2025 INTENT Platform. Built on Arc Network Testnet.
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
