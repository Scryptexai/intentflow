import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Wallet, CheckCircle2, Sparkles, Share2, Trophy } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { DailyTasksPanel } from '@/components/campaign/DailyTasksPanel';
import { CampaignPreview } from '@/components/campaign/CampaignPreview';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { useCampaignGeneration } from '@/hooks/useCampaignGeneration';
import { useWallet } from '@/contexts/WalletContext';
import { useAccessLevel } from '@/contexts/AccessLevelContext';
import { getTaskContextForCaption } from '@/lib/dailyTasks';
import { IntentCategory } from '@/components/campaign/IntentCategorySelector';
import { TimeWindow } from '@/components/campaign/TimeWindowSelector';

export interface CampaignData {
  campaignType: string;
  tones: string[];
  arcContext: string[];
  customInput: string;
  imageStyle: string;
  intentCategory: IntentCategory | '';
  targetDApps: string[];
  actionOrder: string[];
  timeWindow: TimeWindow;
}

export type { GeneratedCampaign } from '@/hooks/useCampaignGeneration';

type FlowStep = 'tasks' | 'generate' | 'preview' | 'share';

const CreateCampaign: React.FC = () => {
  const { isConnected, address, connect, isConnecting, isCorrectNetwork, switchNetwork } = useWallet();
  const { accessLevel, refreshAccessLevel } = useAccessLevel();
  const {
    isGenerating,
    generatedCampaign,
    error,
    generateCampaign,
    regenerateCampaign,
    updateCaption,
    completeCampaign,
    isCompleting
  } = useCampaignGeneration();

  const [currentStep, setCurrentStep] = useState<FlowStep>('tasks');
  const [taskContext, setTaskContext] = useState<ReturnType<typeof getTaskContextForCaption> | null>(null);
  const [completedCampaignId, setCompletedCampaignId] = useState<string | null>(null);
  const [showPreviewInline, setShowPreviewInline] = useState(false);

  const buildCampaignData = useCallback((): CampaignData & { dappUrls?: string[] } => {
    if (!taskContext) {
      return {
        campaignType: 'defi-promotion',
        tones: ['professional'],
        arcContext: [],
        customInput: '',
        imageStyle: 'abstract',
        intentCategory: 'defi' as IntentCategory,
        targetDApps: [],
        actionOrder: [],
        timeWindow: 'day' as TimeWindow,
        dappUrls: [],
      };
    }

    return {
      campaignType: 'defi-promotion',
      tones: ['professional', 'hype'],
      arcContext: taskContext.dapps,
      customInput: `Completed: ${taskContext.actions.join(', ')} on ${taskContext.dapps.join(', ')}`,
      imageStyle: 'abstract',
      intentCategory: (taskContext.categories.includes('DeFi Protocols') ? 'defi' : 'ecosystem') as IntentCategory,
      targetDApps: taskContext.dapps,
      actionOrder: taskContext.actions,
      timeWindow: 'day' as TimeWindow,
      dappUrls: taskContext.dappUrls || [],
    };
  }, [taskContext]);

  const handleAllTasksCompleted = useCallback((context: ReturnType<typeof getTaskContextForCaption>) => {
    setTaskContext(context);
    setCurrentStep('generate');
  }, []);

  const handleGenerate = async () => {
    if (!isConnected) {
      await connect();
      return;
    }
    if (!isCorrectNetwork) {
      await switchNetwork();
      return;
    }
    
    const campaignData = buildCampaignData();
    setShowPreviewInline(true);
    setCurrentStep('preview');
    await generateCampaign(campaignData, address);
  };

  const handleRegenerate = async () => {
    const campaignData = buildCampaignData();
    await regenerateCampaign(campaignData, address);
  };

  const handleMint = async () => {
    if (!isConnected) {
      await connect();
      return;
    }
    if (!isCorrectNetwork) {
      await switchNetwork();
      return;
    }
    if (!address || !generatedCampaign) return;

    const campaignData = buildCampaignData();
    const result = await completeCampaign(campaignData, address);
    if (result?.id) {
      setCompletedCampaignId(result.id);
      setCurrentStep('share');
      refreshAccessLevel();
    }
  };

  const handleBackToTasks = () => {
    setShowPreviewInline(false);
    setCurrentStep('tasks');
  };

  const steps = [
    { id: 'tasks', label: 'Complete Tasks', icon: CheckCircle2 },
    { id: 'generate', label: 'Generate', icon: Sparkles },
    { id: 'preview', label: 'Mint Proof', icon: Trophy },
    { id: 'share', label: 'Share', icon: Share2 },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">Create Your Intent</h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Complete your daily tasks, generate a campaign caption, and mint your proof.
            </p>
          </motion.div>

          {/* Step Indicator */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-center justify-center gap-2 md:gap-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentStepIndex;
                const isCompleted = index < currentStepIndex;
                
                return (
                  <React.Fragment key={step.id}>
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm transition-all
                      ${isActive ? 'bg-primary text-primary-foreground' : ''}
                      ${isCompleted ? 'bg-primary/20 text-primary' : ''}
                      ${!isActive && !isCompleted ? 'bg-muted text-muted-foreground' : ''}`}>
                      <Icon className="w-4 h-4" />
                      <span className="hidden md:inline">{step.label}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-8 h-0.5 ${index < currentStepIndex ? 'bg-primary' : 'bg-muted'}`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </motion.div>

          {!isConnected && (
            <Alert className="border-primary/50 bg-primary/10 mb-8">
              <Wallet className="h-4 w-4 text-primary" />
              <AlertDescription className="flex items-center justify-between">
                <span>Connect your wallet to see your daily tasks.</span>
                <Button variant="gradient" size="sm" onClick={connect} disabled={isConnecting} className="ml-4">
                  {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert className="border-destructive/50 bg-destructive/10 mb-8">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              {!showPreviewInline && (
                <motion.div key="tasks-panel" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <DailyTasksPanel onAllTasksCompleted={handleAllTasksCompleted} disabled={!isConnected || !isCorrectNetwork} />

                  <AnimatePresence>
                    {currentStep === 'generate' && !generatedCampaign && (
                      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mt-6">
                        <Card className="border-primary/30 bg-gradient-to-r from-primary/10 to-accent/10">
                          <CardContent className="py-6">
                            <div className="text-center">
                              <Sparkles className="w-10 h-10 mx-auto text-primary mb-3" />
                              <h3 className="font-semibold text-lg mb-2">Ready to Generate!</h3>
                              <p className="text-sm text-muted-foreground mb-4">
                                Your completed tasks: {taskContext?.dapps.join(', ')}
                              </p>
                              <Button variant="gradient" size="lg" onClick={handleGenerate} disabled={isGenerating} className="gap-2">
                                {isGenerating ? 'Generating...' : <><Sparkles className="w-4 h-4" />Generate Caption</>}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {showPreviewInline && (
                <motion.div key="preview-panel" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                  {!completedCampaignId && !isGenerating && (
                    <Button variant="ghost" size="sm" onClick={handleBackToTasks} className="mb-4">← Back to Tasks</Button>
                  )}
                  <CampaignPreview
                    campaign={generatedCampaign}
                    isGenerating={isGenerating}
                    onRegenerate={handleRegenerate}
                    onUpdateCaption={updateCaption}
                    campaignData={buildCampaignData()}
                    onComplete={handleMint}
                    isCompleting={isCompleting}
                    completedCampaignId={completedCampaignId}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateCampaign;
