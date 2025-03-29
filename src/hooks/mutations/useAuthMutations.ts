import { handleLogout, signInAccount } from "@/services/authService";
import { SignIn } from "@/types/auth.type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: SignIn) => signInAccount(user),
    onSuccess: () => {
      toast({
        title: "Login Successful!",
        description: "Welcome to Kloudtrack!",
      });
    },
  });
};

export const useHandleLogout = () => {
  return useMutation({
    mutationFn: () => handleLogout(),
    onError: (error: Error) => {
      toast({
        title: "Error!",
        description: error.message,
      });
    },
  });
};
