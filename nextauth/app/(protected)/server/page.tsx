import { UserInfo } from "@/components/user-info";
import { CurrentUser } from "@/lib/auth";

const ServerPage = async () => {
  const user = await CurrentUser();

  return (
    <UserInfo lable="💻Server Components" user={user} />
  )
};

export default ServerPage;
