import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ShareRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/', { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-muted-foreground">Redirecting to INTENT...</p>
      </div>
    </div>
  );
};

export default ShareRedirect;
