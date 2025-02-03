import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAwsSensors } from "@/hooks/react-query/queries";
import { weatherSensorsType } from "@/types";
import { checkBadge } from "@/lib/helper";
import { formatDateString } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import NoDataOptions from "@/components/shared/NoDataOptions";
import AdminControls from "@/components/shared/AdminControls";

export function AwsSensors() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const { data: weatherData, isLoading, isError } = useGetAwsSensors();

  const columns: ColumnDef<weatherSensorsType[number]>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Station Name
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "serial",
      header: "Serial",
      cell: ({ row }) => <div>{row.getValue("serial")}</div>,
    },
    {
      accessorKey: "BME280a",
      header: "BME280-1",
      cell: ({ row }) => <div>{checkBadge(row.getValue("BME280a"))}</div>,
    },
    {
      accessorKey: "BME280b",
      header: "BME280-2",
      cell: ({ row }) => <div>{checkBadge(row.getValue("BME280b"))}</div>,
    },
    {
      accessorKey: "BME280c",
      header: "BME280-3",
      cell: ({ row }) => <div>{checkBadge(row.getValue("BME280c"))}</div>,
    },
    {
      accessorKey: "BH1750",
      header: "BH1750",
      cell: ({ row }) => <div>{checkBadge(row.getValue("BH1750"))}</div>,
    },
    {
      accessorKey: "AS5600",
      header: "AS5600",
      cell: ({ row }) => <div>{checkBadge(row.getValue("AS5600"))}</div>,
    },
    {
      accessorKey: "UV",
      header: "UV",
      cell: ({ row }) => <div>{checkBadge(row.getValue("UV"))}</div>,
    },
    {
      accessorKey: "SLAVE",
      header: "SLAVE",
      cell: ({ row }) => <div>{checkBadge(row.getValue("SLAVE"))}</div>,
    },
    {
      accessorKey: "recordedAt",
      header: "Date Recorded",
      cell: ({ row }) => (
        <div>
          {row.getValue("recordedAt")
            ? formatDateString(row.getValue("recordedAt"), "long")
            : "No date"}
        </div>
      ),
    },
    {
      header: () => <div className="text-center">Actions</div>,
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const data = row.original;
        return <AdminControls id={data.id} />;
      },
    },
  ];

  const table = useReactTable({
    data: weatherData || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 md:gap-5 w-full container p-2 py-4">
        <Skeleton className="w-full !h-6 cardContainer dark:bg-secondary" />
        <Skeleton className="w-full !h-64 cardContainer dark:bg-secondary" />
      </div>
    );
  }

  if (!weatherData || isError) {
    return (
      <div className="py-4">
        <NoDataOptions />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4 pl-2">
        <Input
          placeholder="Filter Station Names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => {
                    column.toggleVisibility(!!value);
                  }}
                  onSelect={(event) => event.preventDefault()}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
