import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addPsgcType,
  addStationTypeType,
  createStationType,
  createUserData,
  signInAccountType,
  updateUserPasswordType,
} from "@/types/mutationTypes";
import {
  addPsgc,
  addStationType,
  createStation,
  createUser,
  downloadData,
  generateApi,
  handleLogout,
  signInAccount,
} from "@/api/post";
import toast from "react-hot-toast";
import { updateApiKey, updateUserPassword } from "@/api/put";
import { deleteApiKey } from "@/api/delete";
import { downloadParamsTypes } from "@/types/queryTypes";

//CREATE DATA
export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: signInAccountType) => signInAccount(user),
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Login Successfull!");
    },
  });
};

export const useAddPsgc = () => {
  return useMutation({
    mutationFn: (values: addPsgcType) => addPsgc(values),
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Successfully added a psgc!");
    },
  });
};

export const useAddStationType = () => {
  return useMutation({
    mutationFn: (values: addStationTypeType) => addStationType(values),
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Successfully added a station type!");
    },
  });
};

export const useCreateStation = () => {
  return useMutation({
    mutationFn: (values: createStationType) => createStation(values),
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Successfully created a station!");
    },
  });
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (values: createUserData) => createUser(values),
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Successfully created user!");
    },
  });
};

export const useGenerateApi = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: () => generateApi(),
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("API key successfully generated!");
      onSuccess();
    },
  });
};

export const useHandleLogout = () => {
  return useMutation({
    mutationFn: () => handleLogout(),
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Logout Successfull!");
    },
  });
};

//UPDATE
export const useUpdateUserPassword = () => {
  return useMutation({
    mutationFn: (values: updateUserPasswordType) => updateUserPassword(values),
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Successfully updated password!");
    },
  });
};

export const useUpdateApiKey = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: () => updateApiKey(),
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("API key successfully updated!");
      onSuccess();
    },
  });
};

//DELETE
export const useDeleteApiKey = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: () => deleteApiKey(),
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("API key successfully Deleted!");
      onSuccess();
    },
  });
};

export const useDownloadData = () => {
  return useMutation({
    mutationFn: (data: downloadParamsTypes) => downloadData(data),
    onError: (error: Error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Data Downloaded!");
    },
  });
};
