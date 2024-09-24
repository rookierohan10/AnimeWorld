import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ajlccoudtaijpauzgkuu.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqbGNjb3VkdGFpanBhdXpna3V1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA2MDE4MDAsImV4cCI6MjAzNjE3NzgwMH0.mecDHVkMsXuZCw21FFMt8FVP5m5wheGF3O66bZMxDis"

export const supabase = createClient(supabaseUrl, supabaseKey);