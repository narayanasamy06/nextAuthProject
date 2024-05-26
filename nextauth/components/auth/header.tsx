import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font  = Poppins({
    subsets:["latin"],
    weight:["600"],
});
interface HeaderProps {
    lable :string
}

export const Header = ({lable}:HeaderProps)=>{
    return(
        <div className="flex flex-col w-full gap-y-4 items-center justify-center">
            <h1 className={cn("text-3xl font-semibold",font.className)}>
                🔐 Auth
            </h1>
            <p className="text-muted-foreground text-sm">
                {lable}
            </p>
        </div>
    );
}