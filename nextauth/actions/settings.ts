'use server';

import { getUserByEmail, getUserById } from '@/data/users';
import { CurrentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens';
import { SettingsSchema } from '@/schemas';
import * as z from 'zod';
import bcrypt from 'bcryptjs';
export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await CurrentUser();
  if (!user) {
    return { error: 'Unauthorized' };
  }
  const dbUSer = await getUserById(user.id);
  if (!dbUSer) {
    return { error: 'Unauthorizes' };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);
    if (existingUser && existingUser.id !== user.id) {
      return { error: 'Email already in use!' };
    }

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );
    return { success: 'Verification Email Sent' };
  }

  if (values.password && values.newPassword && dbUSer.password) {
    const passwordMatch = await bcrypt.compare(
      values.password,
      dbUSer.password,
    );

    if (!passwordMatch) {
      return { error: 'Incorrect Password!' };
    }
    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await db.user.update({
    where: { id: dbUSer.id },
    data: {
      ...values,
    },
  });

  return { success: 'Settings updated successfully' };
};
