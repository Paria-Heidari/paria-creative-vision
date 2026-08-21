import { PostgrestError } from '@supabase/supabase-js';

export const logPostgrestError = (context: string, error: PostgrestError) => {
  // Next.js PPR aborts in-flight fetches in dev mode and restarts the render.
  if (error.message?.startsWith('AbortError')) return;

  console.error(context, {
    message: error.message,
    details: error.details,
    hint: error.hint,
    code: error.code,
  });
};
