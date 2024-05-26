"use server";

import { getPasswordTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/users";
import { NewPasswordSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string | null
) => {
  if (!token) {
    return { error: "Missing Token!" };
  }
  const validatedFields = NewPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fiels" };
  }

  const { password } = validatedFields.data;
  const existingToken = await getPasswordTokenByToken(token);
  if (!existingToken) {
    return { error: "Invalid Token" };
  }
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token Expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Email does not exist!" };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: "Password Updated Successfully!" };
};
