import provinces from "../provinces.json";
import municipalities from "../municipalities.json";
import regions from "../regions.json";

const findProvinceMunicipalities = (
  provinceName: string
): Array<Municipality> => {
  return municipalities.filter((municipality: Municipality) => {
    return municipality.province === provinceName;
  });
};
const findProvinceRegion = (provinceName: string): Array<Region> => {
  return regions.filter((region: Region) => {
    return region.name === provinceName;
  });
};

export default {
  all: (): Array<MappedProvince> => {
    return provinces.map((province: Province) => {
      const provinceMunicipalities: Array<Municipality> =
        findProvinceMunicipalities(province.name);

      return { ...province, municipalities: provinceMunicipalities };
    });
  },

  find: (name: string): MappedProvince | void => {
    const province: Province | void = provinces.find(
      (province: Province) => province.name === name
    );

    if (!province) return undefined;

    const provinceMunicipalities: Array<Municipality> =
      findProvinceMunicipalities(province.name);

    return { ...province, municipalities: provinceMunicipalities };
  },

  filter: (name: string): Array<MappedProvince> => {
    const searchPattern = new RegExp(`[a-zA-Z\\s]*${name}[a-zA-Z]*`, "i");
    const filteredProvinces: Array<Province> = provinces.filter(
      (province: Province) => !!searchPattern.exec(province.name)
    );

    return filteredProvinces.map((province: Province) => {
      const provinceMunicipalities: Array<Municipality> =
        findProvinceMunicipalities(province.name);

      return { ...province, municipalities: provinceMunicipalities };
    });
  },

  region: (name: string) => {
    return provinces.filter((province) => province.region == name);
  },
};
