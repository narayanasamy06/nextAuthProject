"use client";
import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ExtendedUser } from "@/next-auth";

const ClientPage = () => {
  const user: ExtendedUser | undefined = useCurrentUser();

  return <UserInfo lable="📱Client Components" user={user} />;
};

export default ClientPage;
