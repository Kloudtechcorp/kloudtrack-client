"use client";
import { useMutation } from "@tanstack/react-query";
import {
  addPsgcType,
  addStationTypeType,
  createStationType,
  createUserData,
  reportBugType,
  signInAccountType,
  UpdateStationProps,
  updateUserGrantsProps,
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
  reportBug,
  signInAccount,
} from "@/api/post";
import { toast } from "@/hooks/use-toast";
import {
  updateApiKey,
  updateBugReport,
  updateStation,
  updateUserGrants,
  updateUserPassword,
} from "@/api/put";
import { deleteApiKey, deleteStation } from "@/api/delete";
import { downloadParamsTypes } from "@/types/queryTypes";
import { apiKeyType, bugUpdateType } from "@/types";
import { useNavigate } from "react-router-dom";
import { bugSchema } from "@/types/validation";
import { z } from "zod";

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

export const useUpdateStation = () => {
  return useMutation({
    mutationFn: (values: UpdateStationProps) => updateStation(values),
    onError: (error: Error) => {
      toast({
        title: "Error!",
        description: error.message,
      });
    },
    onSuccess: () => {
      toast({
        title: "Update Successful!",
        description: "Station updated.",
      });
    },
  });
};

//DELETE
export const useDeleteApiKey = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: (id: string) => deleteApiKey(id),
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

export const useDeleteStation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (id: string) => deleteStation(id),
    onError: (error: Error) => {
      toast({
        title: "Error!",
        description: error.message,
      });
    },
    onSuccess: () => {
      toast({
        title: "Delete Successful!",
        description: "Station Deleted.",
      });
      navigate("/");
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

export const useUpdateUserGrants = () => {
  return useMutation({
    mutationFn: (data: updateUserGrantsProps) => updateUserGrants(data),
    onError: (error: Error) => {
      toast({
        title: "Error!",
        description: error.message,
      });
    },
    onSuccess: () => {
      toast({
        title: "Update Successful!",
        description: "User stations grant updated.",
      });
    },
  });
};

export const useReportBug = () => {
  return useMutation({
    mutationFn: (data: reportBugType) => reportBug(data),
    onError: (error: Error) => {
      toast({
        title: "Error!",
        description: error.message,
      });
    },
    onSuccess: () => {
      toast({
        title: "Report Successful!",
        description: "Bug Reported.",
      });
    },
  });
};

export const useUpdateBug = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: (data: bugUpdateType) => updateBugReport(data),
    onError: (error: Error) => {
      toast({
        title: "Error!",
        description: error.message,
      });
    },
    onSuccess: () => {
      toast({
        title: "Update Successful!",
        description: "Bug Updated.",
      });
    },
  });
};
