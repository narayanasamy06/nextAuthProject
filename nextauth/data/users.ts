import { db } from "@/lib/db";
import { ExtendedUser } from "@/next-auth";
import { User } from "next-auth";

export const getUserByEmail = async (email:string)=>{
    
    try {
        const user = await db.user.findUnique({
            where:{email:email}
        });
        return user;
    }
    catch {
        return null;
    }

};
export const getUserById = async (id:string|undefined)=>{
    try {
        const user = await db.user.findUnique({
            where:{id:id}
        });
        return user ;
    }
    catch {
        return null;
    }

};