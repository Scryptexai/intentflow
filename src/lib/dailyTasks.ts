// Daily Task Generation System
import { supabase } from '@/integrations/supabase/client';

export interface DbDApp {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  website_url: string;
  icon_url: string | null;
  actions: { action: string; verb: string }[];
  is_verified: boolean;
  is_featured: boolean;
  is_active: boolean;
  target_contract: string | null;
  chain_id: number;
}

export interface DailyTask {
  id: string;
  dapp: DbDApp;
  action: string;
  actionVerb: string;
  minAmount?: number;
  completed: boolean;
  verificationStatus: 'pending' | 'verified' | 'failed';
  verifiedAt?: string;
  txHash?: string;
}

export interface DailyTaskSet {
  date: string;
  walletAddress: string;
  tasks: DailyTask[];
  allCompleted: boolean;
  seed: number;
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function seededRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

function shuffleWithSeed<T>(array: T[], random: () => number): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getTodayDateString(): string {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

export async function fetchDAppsFromDatabase(): Promise<DbDApp[]> {
  // Return empty array - arc_dapps table needs to be created
  // This is a placeholder until the database schema is set up
  console.log('arc_dapps table not yet configured');
  return [];
}

export async function generateDailyTasksAsync(
  walletAddress: string,
  date: string = getTodayDateString(),
  taskCount: number = 3
): Promise<DailyTaskSet> {
  const dapps = await fetchDAppsFromDatabase();
  
  if (dapps.length === 0) {
    return {
      date,
      walletAddress,
      tasks: [],
      allCompleted: false,
      seed: 0,
    };
  }

  const seedString = `${walletAddress.toLowerCase()}-${date}`;
  const seed = hashCode(seedString);
  const random = seededRandom(seed);

  const eligibleDapps = dapps.filter(
    dapp => dapp.is_verified && dapp.website_url
  );

  const shuffled = shuffleWithSeed(eligibleDapps, random);
  
  const usedCategories = new Set<string>();
  const selectedDapps: DbDApp[] = [];
  
  for (const dapp of shuffled) {
    if (selectedDapps.length >= taskCount) break;
    
    if (!usedCategories.has(dapp.category) || selectedDapps.length < taskCount - 1) {
      selectedDapps.push(dapp);
      usedCategories.add(dapp.category);
    }
  }

  const tasks: DailyTask[] = selectedDapps.map((dapp, index) => {
    const availableActions = dapp.actions.length > 0 
      ? dapp.actions 
      : [{ action: 'Interact with protocol', verb: 'interact' }];
    
    const actionIndex = Math.floor(random() * availableActions.length);
    const selectedAction = availableActions[actionIndex];

    return {
      id: `${date}-${walletAddress.slice(0, 8)}-${index}`,
      dapp,
      action: selectedAction.action,
      actionVerb: selectedAction.verb,
      minAmount: ['DeFi', 'Gaming'].includes(dapp.category) ? 10 : undefined,
      completed: false,
      verificationStatus: 'pending' as const,
    };
  });

  return {
    date,
    walletAddress,
    tasks,
    allCompleted: false,
    seed,
  };
}

let cachedDapps: DbDApp[] | null = null;

export function setCachedDapps(dapps: DbDApp[]): void {
  cachedDapps = dapps;
}

export function generateDailyTasks(
  walletAddress: string,
  date: string = getTodayDateString(),
  taskCount: number = 3,
  dapps: DbDApp[] = cachedDapps || []
): DailyTaskSet {
  if (dapps.length === 0) {
    return {
      date,
      walletAddress,
      tasks: [],
      allCompleted: false,
      seed: 0,
    };
  }

  const seedString = `${walletAddress.toLowerCase()}-${date}`;
  const seed = hashCode(seedString);
  const random = seededRandom(seed);

  const eligibleDapps = dapps.filter(
    dapp => dapp.is_verified && dapp.website_url
  );

  const shuffled = shuffleWithSeed(eligibleDapps, random);
  
  const usedCategories = new Set<string>();
  const selectedDapps: DbDApp[] = [];
  
  for (const dapp of shuffled) {
    if (selectedDapps.length >= taskCount) break;
    if (!usedCategories.has(dapp.category) || selectedDapps.length < taskCount - 1) {
      selectedDapps.push(dapp);
      usedCategories.add(dapp.category);
    }
  }

  const tasks: DailyTask[] = selectedDapps.map((dapp, index) => {
    const availableActions = dapp.actions.length > 0 
      ? dapp.actions 
      : [{ action: 'Interact with protocol', verb: 'interact' }];
    
    const actionIndex = Math.floor(random() * availableActions.length);
    const selectedAction = availableActions[actionIndex];

    return {
      id: `${date}-${walletAddress.slice(0, 8)}-${index}`,
      dapp,
      action: selectedAction.action,
      actionVerb: selectedAction.verb,
      minAmount: ['DeFi', 'Gaming'].includes(dapp.category) ? 10 : undefined,
      completed: false,
      verificationStatus: 'pending' as const,
    };
  });

  return {
    date,
    walletAddress,
    tasks,
    allCompleted: false,
    seed,
  };
}

export function areAllTasksCompleted(taskSet: DailyTaskSet): boolean {
  return taskSet.tasks.length > 0 && taskSet.tasks.every(task => task.verificationStatus === 'verified');
}

export function getTaskContextForCaption(taskSet: DailyTaskSet): {
  dapps: string[];
  dappUrls: string[];
  actions: string[];
  categories: string[];
} {
  const verifiedTasks = taskSet.tasks.filter(t => t.verificationStatus === 'verified');
  
  return {
    dapps: verifiedTasks.map(t => t.dapp.name),
    dappUrls: verifiedTasks.map(t => t.dapp.website_url).filter(Boolean),
    actions: verifiedTasks.map(t => t.actionVerb),
    categories: [...new Set(verifiedTasks.map(t => t.dapp.category))],
  };
}

export function getTaskStorageKey(walletAddress: string, date: string): string {
  return `daily-tasks-${walletAddress.toLowerCase()}-${date}`;
}

export function saveTaskState(taskSet: DailyTaskSet): void {
  const key = getTaskStorageKey(taskSet.walletAddress, taskSet.date);
  const saveData = {
    date: taskSet.date,
    walletAddress: taskSet.walletAddress,
    seed: taskSet.seed,
    allCompleted: taskSet.allCompleted,
    tasks: taskSet.tasks.map(t => ({
      id: t.id,
      dappId: t.dapp.id,
      completed: t.completed,
      verificationStatus: t.verificationStatus,
      verifiedAt: t.verifiedAt,
      txHash: t.txHash,
    })),
  };
  localStorage.setItem(key, JSON.stringify(saveData));
}

export function loadTaskState(
  walletAddress: string, 
  date: string,
  dapps: DbDApp[]
): DailyTaskSet | null {
  const key = getTaskStorageKey(walletAddress, date);
  const saved = localStorage.getItem(key);
  if (!saved) return null;
  
  try {
    const parsed = JSON.parse(saved);
    
    const regenerated = generateDailyTasks(walletAddress, date, 3, dapps);
    
    parsed.tasks?.forEach((savedTask: any, idx: number) => {
      if (regenerated.tasks[idx]) {
        regenerated.tasks[idx].completed = savedTask.completed;
        regenerated.tasks[idx].verificationStatus = savedTask.verificationStatus;
        regenerated.tasks[idx].verifiedAt = savedTask.verifiedAt;
        regenerated.tasks[idx].txHash = savedTask.txHash;
      }
    });
    
    regenerated.allCompleted = areAllTasksCompleted(regenerated);
    return regenerated;
  } catch {
    return null;
  }
}
