import { supabase } from '../lib/supabaseClient';

export async function getRodTableData() {
  const { data, error } = await supabase
    .from('specials')
    .select('*');
  if (error) throw error;
  return data;
}
