import {
  addPsgc,
  addStationType,
  createUser,
  deleteUser,
  updateReportStatus,
  updateUser,
} from "@/services/adminService";
import {
  PsgcData,
  ReportStatus,
  StationType,
  UserData,
  UserInformation,
} from "@/types/admin.type";
import { useMutation } from "@tanstack/react-query";
import { toast } from "../use-toast";
import { useNavigate } from "react-router-dom";

export const useAddPsgc = () => {
  return useMutation({
    mutationFn: (values: PsgcData) => addPsgc(values),
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
    mutationFn: (values: StationType) => addStationType(values),
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

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (values: UserData) => createUser(values),
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

// ** UPDATE
export const useUpdateUser = () => {
  return useMutation({
    mutationFn: (data: UserInformation) => updateUser(data),
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

export const useUpdateReportStatus = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: (data: ReportStatus) => updateReportStatus(data),
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

// ** DELETE
export const useDeleteUser = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onError: (error: Error) => {
      toast({
        title: "Error!",
        description: error.message,
      });
    },
    onSuccess: () => {
      toast({
        title: "Delete Successful!",
        description: "User Deleted.",
      });
      navigate("/");
    },
  });
};
