import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { method } = req
    const url = new URL(req.url)
    const action = url.searchParams.get('action')

    if (method === 'POST' && action === 'backup') {
      // Create full database backup
      const backupData = await createBackup(supabase)
      
      // Store backup in a JSON file format
      const backupFile = {
        timestamp: new Date().toISOString(),
        data: backupData,
        version: '1.0'
      }

      return new Response(JSON.stringify(backupFile), {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="backup-${new Date().toISOString().split('T')[0]}.json"`
        }
      })
    }

    if (method === 'GET' && action === 'schedule') {
      // This would be called by a cron job to create scheduled backups
      const backupData = await createBackup(supabase)
      
      // Log the backup creation
      console.log('Scheduled backup created:', new Date().toISOString())
      
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Backup created successfully',
        timestamp: new Date().toISOString()
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    return new Response(JSON.stringify({ error: 'Invalid request' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Backup error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
})

async function createBackup(supabase: any) {
  const tables = ['blogs', 'projects', 'services', 'static_content', 'translations', 'homepage_slider', 'inspiration_gallery', 'newsletter_subscribers']
  
  const backupData: any = {}
  
  for (const table of tables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error(`Error backing up ${table}:`, error)
        continue
      }
      
      backupData[table] = data
    } catch (error) {
      console.error(`Error backing up ${table}:`, error)
    }
  }
  
  return backupData
}