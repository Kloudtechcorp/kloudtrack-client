import { ColumnDef } from "@tanstack/react-table";

export type apiKeys = {
  createdAt: string;
  updatedAt: string | null;
  apiKey: string;
  expiresAt: string | null;
  isActive: boolean;
};

export const columns: ColumnDef<apiKeys, unknown>[] = [
  {
    accessorKey: "isActive",
    header: "Status",
  },
  {
    accessorKey: "apiKey",
    header: "Key",
  },
  {
    accessorKey: "expiresAt",
    header: "Expiration",
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
  },
];
