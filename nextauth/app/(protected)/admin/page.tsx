'use client';
import { Role } from '@prisma/client';
import { RoleGate } from '@/components/auth/role-gate';
import { FormSuccess } from '@/components/form-success';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useCurrentRole } from '@/hooks/use-current-role';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { admin } from '@/actions/admin';

const AdminPage = () => {
  const role = useCurrentRole();
  const onServerClick = () => {
    admin().then((data) => {
      if (data.success) {
        toast.success(data.success);
      } else {
        toast.error(data.error);
      }
    });
  };

  const onAPIRouteClick = () => {
    fetch('/api/admin').then((response) => {
      if (response.ok) {
        toast.success('Allowed API Route');
      } else {
        toast.error('Forbidden API Route');
      }
    });
  };

  return (
    <Card className='w-[600px] '>
      <CardHeader className='text-2xl font-semibold text-center'>
        🔑Admin
      </CardHeader>
      <CardContent className='space-y-4'>
        <RoleGate allowedRole={Role.ADMIN}>
          <FormSuccess message='You are allowed' />
        </RoleGate>
        <div
          className='flex flex-row justify-between items-center 
                p-3 rounded-lg border shadow-md'
        >
          <p className='font-medium text-sm'>Admin only API Route</p>
          <Button onClick={onAPIRouteClick}>Click to test</Button>
        </div>
        <div
          className='flex flex-row justify-between items-center 
                p-3 rounded-lg border shadow-md'
        >
          <p className='font-medium text-sm'>Admin only Server Actions</p>
          <Button onClick={onServerClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
