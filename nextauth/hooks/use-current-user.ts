import { ExtendedUser } from "@/next-auth";
import { useSession } from "next-auth/react";

export const useCurrentUser = () => {
  const session = useSession();
  const user = session.data?.user as ExtendedUser | undefined;
  if (user && user.role && user.isTwoFactorEnabled !== undefined) {
    return user;
  }
  return undefined;
};
