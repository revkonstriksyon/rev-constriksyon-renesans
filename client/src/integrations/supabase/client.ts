// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ezgliiptbsuszvsoftev.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV6Z2xpaXB0YnN1c3p2c29mdGV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5NzUzMTIsImV4cCI6MjA2NjU1MTMxMn0.Uo69dVThhhMEi2ozCcEjlesuuYHg002pqSE7Z9HTMPs";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);