'use server';
import { CurrentRole } from '@/lib/auth';
import { Role } from '@prisma/client';

export const admin = async () => {
  const role = await CurrentRole();

  if (role === Role.ADMIN) {
    return { success: 'Allowed Server Action' };
  }
  return { error: 'Forbiddent Action' };
};
