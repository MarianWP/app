import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    '[Supabase] Відсутні VITE_SUPABASE_URL або VITE_SUPABASE_ANON_KEY. ' +
      'Переконайтесь, що .env містить ці змінні і збірка (npm run build) виконувалась з наявним .env.'
  )
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '')
