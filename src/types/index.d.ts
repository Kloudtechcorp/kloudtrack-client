type WeatherTerminology = {
  term: string;
  definition: string;
  threshold?: string;
  leadTime?: string;
  subtitle?: string;
  subcategory?: string;
  category: "heatIndex" | "windSpeed" | "precipitation" | "uvIndex";
};

interface GraphData {
  recorded: string;
  [key: string]: number | string;
}

interface Barangay {
  name: string;
  citymun: string;
  code: number;
}

interface Region {
  name: string;
  designation: string;
}

interface Province {
  name: string;
  region: string;
}

interface Municipality {
  name: string;
  province: string;
}

interface MappedRegion extends Region {
  provinces: Array<Province>;
}

interface MappedProvince extends Province {
  municipalities: Array<Municipality>;
}

interface MappedMunicipality extends Municipality {
  barangays: Array<Barangay>;
}

interface ModeToggle {
  expand: boolean;
}

interface RangeRepeatSelectorProps {
  repeatData: string;
  setRepeatData: React.Dispatch<React.SetStateAction<string>>;
  rangeData: string;
  setRangeData: React.Dispatch<React.SetStateAction<string>>;
}

interface HeaderToggle {
  burgerMenu: (data: boolean) => void;
}

interface SidebarToggle {
  clicked: boolean;
}
