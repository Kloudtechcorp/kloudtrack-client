import { Navigate, useNavigate } from "react-router-dom";
import { useUserContext } from "@/hooks/context/authContext";
import { useSignInAccount } from "@/hooks/react-query/mutations";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import { SigninForm } from "@/components/auth/forms/SigninForm";
import { DeviceInfoProvider } from "@/components/auth/DeviceInforProvider";
import { Logo } from "@/components/ui/logo";
import { WelcomeMessage } from "@/components/auth/WelcomeMessage";

const Signin = () => {
  const navigate = useNavigate();
  const { isAuthenticated, checkAuthUser } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync: signInAccount } = useSignInAccount();

  const handleSignIn = async (loginData: any) => {
    setIsLoading(true);
    try {
      const session = await signInAccount(loginData);

      if (session.message) {
        toast({ title: session.message });
      }
      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        navigate("/");
      } else {
        toast({ title: "Login failed. Please try again." });
      }
    } catch (error) {
      toast({
        title:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center bgColor">
        <PuffLoader color={"#545454"} size={500} />
      </div>
    );
  }

  return (
    <DeviceInfoProvider>
      {(deviceInfo) => (
        <div className="w-full h-full items-center flex flex-col justify-center gap-5 bg-secondary p-4">
          <Logo />
          <div className="font-Courier py-4 px-6 pb-6 rounded-md w-[40rem] max-w-full bgColor border">
            <WelcomeMessage />
            <SigninForm onSubmit={handleSignIn} deviceInfo={deviceInfo} />
          </div>
        </div>
      )}
    </DeviceInfoProvider>
  );
};

export default Signin;
