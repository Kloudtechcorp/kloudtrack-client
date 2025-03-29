import { createStation, updateStation } from "@/services/stationService";
import { StationData, StationDetails } from "@/types/station.type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "../use-toast";
import { useNavigate } from "react-router-dom";
import { deleteStation } from "@/services/adminService";

export const useCreateStation = () => {
  return useMutation({
    mutationFn: (values: StationData) => createStation(values),
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

// ** UPDATE
export const useUpdateStation = () => {
  return useMutation({
    mutationFn: (values: StationDetails) => updateStation(values),
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

// ** DELETE
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
