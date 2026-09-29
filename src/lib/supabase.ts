import { createClient, SupabaseClient } from '@supabase/supabase-js';

const env: Record<string, string | undefined> =
  typeof import.meta !== 'undefined' && (import.meta as any).env
    ? (import.meta as any).env
    : {};
const supabaseUrl =
  env.VITE_SUPABASE_URL || 'https://lllrkmbpdjwhztvjbilr.supabase.co';
const supabaseAnonKey =
  env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_AY8LCRMhr_bNCfDUhZrcKA_2r0s6XKi';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('https://') &&
  supabaseAnonKey.length > 20
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface SupabaseConfigStatus {
  isConfigured: boolean;
  url: string;
}

export function getSupabaseStatus(): SupabaseConfigStatus {
  return {
    isConfigured: isSupabaseConfigured,
    url: isSupabaseConfigured ? supabaseUrl : 'Not configured (using local reactive store)',
  };
}

export async function testSupabaseConnection(): Promise<{
  connected: boolean;
  tablesFound: string[];
  latencyMs: number;
  message: string;
}> {
  if (!supabase) {
    return {
      connected: false,
      tablesFound: [],
      latencyMs: 0,
      message: 'Supabase client not initialized.',
    };
  }

  const start = performance.now();
  const tablesChecked = ['profiles', 'projects', 'skills', 'education', 'certifications', 'contact_messages'];
  const reachableTables: string[] = [];

  try {
    for (const t of tablesChecked) {
      const { error } = await supabase.from(t).select('*').limit(1);
      if (!error || error.code === 'PGRST116' || error.message.includes('0 rows')) {
        reachableTables.push(t);
      } else if (error.code === '42501') {
        // Table exists, protected by RLS
        reachableTables.push(`${t} (RLS secured)`);
      }
    }

    const elapsed = Math.round(performance.now() - start);
    return {
      connected: reachableTables.length > 0,
      tablesFound: reachableTables,
      latencyMs: elapsed,
      message:
        reachableTables.length > 0
          ? `Successfully connected to Supabase (${elapsed}ms). Detected ${reachableTables.length} tables.`
          : 'Connected to Supabase endpoint, but tables could not be verified.',
    };
  } catch (err: any) {
    return {
      connected: false,
      tablesFound: [],
      latencyMs: Math.round(performance.now() - start),
      message: err?.message || 'Failed to communicate with Supabase.',
    };
  }
}
