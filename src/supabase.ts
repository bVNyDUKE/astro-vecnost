import { createClient } from "@supabase/supabase-js";

export const sp = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.SUPABASE_ANON_KEY
);
