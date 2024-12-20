import { createClient } from '@supabase/supabase-js'

// single supabase client
export const supabase = createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_ANON_KEY as string
);
