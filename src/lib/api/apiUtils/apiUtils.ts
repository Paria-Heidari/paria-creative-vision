import { PostgrestError } from '@supabase/supabase-js';

export const logPostgrestError = (context: string, error: PostgrestError) => {
  console.error(context, {
    message: error.message,
    details: error.details,
    hint: error.hint,
    code: error.code,
  });
};
