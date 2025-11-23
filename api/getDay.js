// api/getDay.js
import { createClient } from '@supabase/supabase-js';

const client = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  try {
    const { data, error } = await client
      .from('uberman_counter')
      .select('day')
      .limit(1)
      .single();

    if (error) {
      console.error('getDay server error:', error);
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json({ day: data?.day ?? 0 });
  } catch (e) {
    console.error('getDay exception:', e);
    return res.status(500).json({ error: 'internal' });
  }
}
