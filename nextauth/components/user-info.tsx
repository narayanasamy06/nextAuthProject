import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

interface UserInfoProps {
  user?: ExtendedUser;
  lable: string;
}
export const UserInfo = ({ user, lable }: UserInfoProps) => {
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{lable}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className="flex flex-row items-center 
                justify-between border p-3 shadow-sm rounded-lg"
        >
          <p className="text-sm font-medium">ID</p>
          <p className="text-xs truncate max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.id}
          </p>
        </div>
        <div
          className="flex flex-row items-center 
                justify-between border p-3 shadow-sm rounded-lg"
        >
          <p className="text-sm font-medium">Name</p>
          <p className="text-xs truncate max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.name}
          </p>
        </div>
        <div
          className="flex flex-row items-center 
                justify-between border p-3 shadow-sm rounded-lg"
        >
          <p className="text-sm font-medium">Email</p>
          <p className="text-xs truncate max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.email}
          </p>
        </div>
        <div
          className="flex flex-row items-center 
                justify-between border p-3 shadow-sm rounded-lg"
        >
          <p className="text-sm font-medium">Role</p>
          <p className="text-xs truncate max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.role}
          </p>
        </div>
        <div
          className="flex flex-row items-center 
                justify-between border p-3 shadow-sm rounded-lg"
        >
          <p className="text-sm font-medium">Two factor authentication</p>
          <Badge variant={user?.isTwoFactorEnabled ? "success" :"destructive"}>
          {user?.isTwoFactorEnabled ? "ON" :"OFF"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
