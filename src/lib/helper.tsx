import { Badge } from "@/components/ui/badge";

export const checkBadge = (check: string) => {
  if (check === "Failed") {
    return <Badge variant={"destructive"}>Failed</Badge>;
  } else if (check === "No Value") {
    return <Badge variant={"outline"}>No Value</Badge>;
  } else if (check === undefined) {
    return <Badge variant={"destructive"}>Missing</Badge>;
  }
  return <Badge variant={"default"}>Working</Badge>;
};
