import {
  deleteApiKey,
  downloadCoastalData,
  downloadRainGaugeData,
  downloadRiverLevelData,
  downloadWeatherData,
  generateApi,
  reportDetails,
  updateApiKey,
  updateUserPassword,
} from "@/services/userService";
import {
  ApiKey,
  DownloadRequirements,
  ReportDetails,
  UserPasswordUpdate,
} from "@/types/user.type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "../use-toast";

export const useGenerateApi = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: ({ expiresAt, title }: ApiKey) =>
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

export const useWeatherDownloadData = () => {
  return useMutation({
    mutationFn: (data: DownloadRequirements) => downloadWeatherData(data),
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
    mutationFn: (data: DownloadRequirements) => downloadCoastalData(data),
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
    mutationFn: (data: DownloadRequirements) => downloadRiverLevelData(data),
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
    mutationFn: (data: DownloadRequirements) => downloadRainGaugeData(data),
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

export const useReport = () => {
  return useMutation({
    mutationFn: (data: ReportDetails) => reportDetails(data),
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

// ** UPDATE
export const useUpdateUserPassword = () => {
  return useMutation({
    mutationFn: (values: UserPasswordUpdate) => updateUserPassword(values),
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

// ** DELETE
export const useDeleteApiKey = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: (id: number) => deleteApiKey(id),
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
