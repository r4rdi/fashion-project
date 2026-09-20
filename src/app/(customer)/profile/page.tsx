import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { logout } from '@/actions/auth';

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const userProfile = await prisma.user.findUnique({
    where: { id: user.id },
    include: { profile: true },
  });

  if (!userProfile) {
    // Should not happen if sync is correct, but just in case
    return <div>Profile not found. Please contact support.</div>;
  }

  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <div className="bg-muted/30 p-6 rounded-lg border mb-8">
        <h2 className="text-xl font-semibold mb-4">Profile Details</h2>
        <div className="space-y-4">
          <div>
            <span className="text-sm text-muted-foreground block">Email</span>
            <span className="font-medium">{userProfile.email}</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-muted-foreground block">First Name</span>
              <span className="font-medium">{userProfile.profile?.firstName || '-'}</span>
            </div>
            <div>
              <span className="text-sm text-muted-foreground block">Last Name</span>
              <span className="font-medium">{userProfile.profile?.lastName || '-'}</span>
            </div>
          </div>
        </div>
      </div>

      <form action={logout}>
        <Button variant="destructive" type="submit">Sign Out</Button>
      </form>
    </div>
  );
}
