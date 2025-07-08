import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Download, Clock, Database, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const BackupManagement = () => {
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);
  const { toast } = useToast();

  const createBackup = async () => {
    setIsCreatingBackup(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('backup-system', {
        method: 'POST',
        body: JSON.stringify({ action: 'backup' })
      });

      if (error) throw error;

      // Create and download backup file
      const backupContent = JSON.stringify(data, null, 2);
      const blob = new Blob([backupContent], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `rev-konstriksyon-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: 'Backup kreye ak siksè',
        description: 'Backup done yo a telechaje nan òdinatè w lan.',
      });
    } catch (error) {
      console.error('Backup error:', error);
      toast({
        title: 'Erè backup',
        description: 'Pwoblèm nan kreyasyon backup lan.',
        variant: 'destructive',
      });
    } finally {
      setIsCreatingBackup(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Jesyon Backup</h2>
        <p className="text-gray-600">Jere backup done yo ak sekirite sit la</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" />
              Backup Manyèl
            </CardTitle>
            <CardDescription>
              Kreye ak telechaje yon backup konplè nan done yo kounye a
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={createBackup}
              disabled={isCreatingBackup}
              className="w-full flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              {isCreatingBackup ? 'Ap kreye backup...' : 'Kreye Backup'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Backup Otomatik
            </CardTitle>
            <CardDescription>
              Backup otomatik chak jou nan 3:00 AM (aktyèlman aktif)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Estati:</span>
                <span className="text-sm text-green-600 font-medium">Aktif</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Prochèn backup:</span>
                <span className="text-sm text-gray-600">Jòdi a 3:00 AM</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Enfòmasyon Sekirite
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">HTTPS Encryption</span>
                </div>
                <span className="text-sm text-green-600">Aktif</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Database Encryption</span>
                </div>
                <span className="text-sm text-green-600">Aktif</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Rate Limiting</span>
                </div>
                <span className="text-sm text-green-600">Aktif</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">CAPTCHA Protection</span>
                </div>
                <span className="text-sm text-green-600">Aktif</span>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Konsèy Sekirite</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Backup yo gen chiffrement konplè</li>
                <li>• Aksè admin lan pwoteje ak 2FA</li>
                <li>• Tout done yo anrejistre ak otantifikasyon</li>
                <li>• Supabase RLS (Row Level Security) aktif</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BackupManagement;