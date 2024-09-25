import { Barangay } from "@/types";
import barangays from "../data/psgc/barangays.json";

export default {
  all: (): Array<Barangay> => barangays,

  find: (name: string): string => {
    const psgcCode: Barangay = barangays.find(
      (barangay: Barangay) => barangay.name === name
    );
    return String(psgcCode.code);
  },

  filter: (name: string): Array<Barangay> => {
    const searchPattern = new RegExp(`[a-zA-Z\\s]*${name}[a-zA-Z]*`, "i");

    return barangays.filter(
      (barangay: Barangay) => !!searchPattern.exec(barangay.name)
    );
  },
  municipality: (name: string) => {
    return barangays.filter((barangay: Barangay) => barangay.citymun == name);
  },
};
