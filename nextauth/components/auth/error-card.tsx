import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { CardWrapper } from "./card-wrapper";

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLable="Oops! Something went wrong"
      backButtonHref="/auth/login"
      backButtonLable="back to login"
    >
      <div className="w-full flex justify-center items-center">
        <ExclamationTriangleIcon className="text-destructive" />
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
