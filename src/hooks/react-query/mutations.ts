"use client";
import { useMutation } from "@tanstack/react-query";
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
  downloadCoastalData,
  downloadRainGaugeData,
  downloadRiverLevelData,
  downloadWeatherData,
  generateApi,
  handleLogout,
  signInAccount,
} from "@/api/post";
import { toast } from "@/hooks/use-toast";
import { updateApiKey, updateUserPassword } from "@/api/put";
import { deleteApiKey } from "@/api/delete";
import { downloadParamsTypes } from "@/types/queryTypes";
import { apiKeyType } from "@/types";

//CREATE DATA
export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: signInAccountType) => signInAccount(user),
    onSuccess: () => {
      toast({
        title: "Login Successful!",
        description: "Welcome to Kloudtrack!",
      });
    },
  });
};

export const useAddPsgc = () => {
  return useMutation({
    mutationFn: (values: addPsgcType) => addPsgc(values),
    onError: (error: Error) => {
      toast({
        title: "Error!",
        description: error.message,
      });
    },
    onSuccess: () => {
      toast({
        title: "Creation Successful!",
        description: "PSGC Added.",
      });
    },
  });
};

export const useAddStationType = () => {
  return useMutation({
    mutationFn: (values: addStationTypeType) => addStationType(values),
    onError: (error: Error) => {
      toast({
        title: "Error!",
        description: error.message,
      });
    },
    onSuccess: () => {
      toast({
        title: "Creation Successful!",
        description: "Station Type Added.",
      });
    },
  });
};

export const useCreateStation = () => {
  return useMutation({
    mutationFn: (values: createStationType) => createStation(values),
    onError: (error: Error) => {
      toast({
        title: "Error!",
        description: error.message,
      });
    },
    onSuccess: () => {
      toast({
        title: "Creation Successful!",
        description: "Station Created.",
      });
    },
  });
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (values: createUserData) => createUser(values),
    onError: (error: Error) => {
      toast({
        title: "Error!",
        description: error.message,
      });
    },
    onSuccess: () => {
      toast({
        title: "Creation Successful!",
        description: "User Created.",
      });
    },
  });
};

export const useGenerateApi = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: ({ expiresAt, title }: apiKeyType) =>
      generateApi({ expiresAt, title }),
    onError: (error: Error) => {
      toast({
        title: "Error!",
        description: error.message,
      });
    },
    onSuccess: () => {
      toast({
        title: "Creation Successful!",
        description: "API Key Created.",
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

//UPDATE
export const useUpdateUserPassword = () => {
  return useMutation({
    mutationFn: (values: updateUserPasswordType) => updateUserPassword(values),
    onError: (error: Error) => {
      toast({
        title: "Error!",
        description: error.message,
      });
    },
    onSuccess: () => {
      toast({
        title: "Update Successful!",
        description: "Password updated.",
      });
    },
  });
};

export const useUpdateApiKey = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: () => updateApiKey(),
    onError: (error: Error) => {
      toast({
        title: "Error!",
        description: error.message,
      });
    },
    onSuccess: () => {
      toast({
        title: "Update Successful!",
        description: "API key updated.",
      });
    },
  });
};

//DELETE
export const useDeleteApiKey = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: () => deleteApiKey(),
    onError: (error: Error) => {
      toast({
        title: "Error!",
        description: error.message,
      });
    },
    onSuccess: () => {
      toast({
        title: "Delete Successful!",
        description: "API Key Deleted.",
      });
    },
  });
};

export const useWeatherDownloadData = () => {
  return useMutation({
    mutationFn: (data: downloadParamsTypes) => downloadWeatherData(data),
    onError: (error: Error) => {
      toast({
        title: "Error!",
        description: error.message,
      });
    },
    onSuccess: () => {
      toast({
        title: "Download Successful!",
        description: "Weather Data Downloaded.",
      });
    },
  });
};

export const useCoastalDownloadData = () => {
  return useMutation({
    mutationFn: (data: downloadParamsTypes) => downloadCoastalData(data),
    onError: (error: Error) => {
      toast({
        title: "Error!",
        description: error.message,
      });
    },
    onSuccess: () => {
      toast({
        title: "Download Successful!",
        description: "Coastal Data Downloaded.",
      });
    },
  });
};

export const useRiverLevelDownloadData = () => {
  return useMutation({
    mutationFn: (data: downloadParamsTypes) => downloadRiverLevelData(data),
    onError: (error: Error) => {
      toast({
        title: "Error!",
        description: error.message,
      });
    },
    onSuccess: () => {
      toast({
        title: "Download Successful!",
        description: "River Level Data Downloaded.",
      });
    },
  });
};

export const useRainGaugeDownloadData = () => {
  return useMutation({
    mutationFn: (data: downloadParamsTypes) => downloadRainGaugeData(data),
    onError: (error: Error) => {
      toast({
        title: "Error!",
        description: error.message,
      });
    },
    onSuccess: () => {
      toast({
        title: "Download Successful!",
        description: "Rain Gauge Data Downloaded.",
      });
    },
  });
};
