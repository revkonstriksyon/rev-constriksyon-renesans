
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: 'Erè koneksyon',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Konekte ak siksè!',
          description: 'Ou konekte nan admin dashboard la.',
        });
        navigate('/admin');
      }
    } catch (error) {
      toast({
        title: 'Erè',
        description: 'Gen yon pwoblèm ak koneksyon an.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!email || !password) {
      toast({
        title: 'Erè',
        description: 'Tanpri antre email ak motdepas ou yo.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const redirectUrl = `${window.location.origin}/admin`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl
        }
      });

      if (error) {
        toast({
          title: 'Erè enskripsyon',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Enskripsyon ak siksè!',
          description: 'Tcheke email ou pou konfime kont lan.',
        });
      }
    } catch (error) {
      toast({
        title: 'Erè',
        description: 'Gen yon pwoblèm ak enskripsyon an.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">
            Admin Dashboard
          </CardTitle>
          <CardDescription>
            Konekte pou aksè nan sistèm jesyon kontni an
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@revkonstriksyon.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Motdepas</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <div className="space-y-2">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? 'Ap konekte...' : 'Konekte'}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={handleSignUp}
                disabled={isLoading}
              >
                Kreye nouvo kont
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLoginPage;
