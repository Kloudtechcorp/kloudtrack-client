import { WeatherDataProps } from "../../types";

const staticData = [
  {
    dataName: "Temperature",
    iconSrc: "assets/icons/temp.svg",
    toolTip: "This is a tip for temperature....",
  },
  {
    dataName: "Heat Index",
    iconSrc: "assets/icons/heatIndex.svg",
    toolTip: "This is a tip for humidity....",
  },
  {
    dataName: "Humidity",
    iconSrc: "assets/icons/humidity.svg",
    toolTip: "This is a tip for humidity....",
  },
  {
    dataName: "Precipitation",
    iconSrc: "assets/icons/precip.svg",
    toolTip: "This is a tip for precipitation....",
  },
  {
    dataName: "Air Pressure",
    iconSrc: "assets/icons/airPressure.svg",
    toolTip: "This is a tip for air pressure....",
  },
  {
    dataName: "Wind Speed",
    iconSrc: "assets/icons/windSpeed.svg",
    toolTip: "This is a tip for temperature....",
  },
  {
    dataName: "Wind Direction",
    iconSrc: "assets/icons/windDirection.svg",
    toolTip: "This is a tip for temperature....",
  },
  {
    dataName: "Irradiance",
    iconSrc: "assets/icons/windDirection.svg",
    toolTip: "This is a tip for irradiance....",
  },
  {
    dataName: "Light Intensity",
    iconSrc: "assets/icons/windDirection.svg",
    toolTip: "This is a tip for light intensity....",
  },
  {
    dataName: "Battery Level",
    iconSrc: "assets/icons/windDirection.svg",
    toolTip: "This is a tip for battery level....",
  },
];

export const locationArray = [
  {
    stationId: 1,
    name: "Alpha",
    type: "Automatic Weather Station",
    location: "Pto. Rivas Ibaba, Balanga City, Bataan",
    coordinates: [120.5566, 14.6907],
    imgStation:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Processed_seafood_clipped.jpg/1280px-Processed_seafood_clipped.jpg",
    temperature: 20,
    heatIndex: 30,
    humidity: 40,
    precipitation: 100,
    airPressure: 1000,
    windSpeed: 4.61,
    windDirection: 75,
    uvIndex: 1,
    irradiance: 40000,
    lux: 5400,
    batteryLevel: 90,
    status: "Active",
  },
  {
    stationId: 2,
    name: "Beta",
    type: "Automatic Weather Station",
    location: "Pag-asa, Bagac, Bataan",
    coordinates: [120.3892, 14.5933],
    imgStation:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/BRP_Jose_Rizal_at_RIMPAC_2020_005.jpg/1280px-BRP_Jose_Rizal_at_RIMPAC_2020_005.jpg",
    temperature: 30,
    heatIndex: 37,
    humidity: 25,
    precipitation: 508,
    airPressure: 2034,
    windSpeed: 4.61,
    windDirection: 100.5,
    uvIndex: 1,
    irradiance: 40000,
    lux: 5400,
    batteryLevel: 35,
    status: "Active",
  },
  {
    stationId: 3,
    name: "Cupcake",
    type: "Automatic Weather Station",
    location: "Sisiman, Mariveles, Bataan",
    coordinates: [120.5177, 14.4273],
    imgStation:
      "https://upload.wikimedia.org/wikipedia/commons/c/cd/Carabao.jpg",
    temperature: 24,
    heatIndex: 63,
    humidity: 9,
    precipitation: 50,
    airPressure: 231,
    windSpeed: 3.2,
    windDirection: 360,
    uvIndex: 3,
    irradiance: 400,
    lux: 500,
    batteryLevel: 25,
    status: "Inactive",
  },
  {
    stationId: 4,
    name: "Donut",
    type: "Automatic Weather Station",
    location: "Bayan-bayanan, Dinalupihan, Bataan",
    coordinates: [120.4474, 14.8643],
    imgStation:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Core_Value.JPG/1280px-Core_Value.JPG",
    temperature: 60,
    heatIndex: 65,
    humidity: 30,
    precipitation: 948,
    airPressure: 1234,
    windSpeed: 534.2,
    windDirection: 270,
    uvIndex: 1,
    irradiance: 40000,
    lux: 5400,
    batteryLevel: 69,
    status: "Active",
  },

  {
    stationId: 5,
    name: "Eclair",
    type: "Automatic Weather Station",
    location: "Townsite, Limay, Bataan",
    coordinates: [120.5912, 14.5553],
    imgStation:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/St._Agustine_Paoay_Church_02.jpg/1280px-St._Agustine_Paoay_Church_02.jpg",
    temperature: 153,
    heatIndex: 234,
    humidity: 2352,
    precipitation: 2345,
    airPressure: 62341,
    windSpeed: 342.234,
    windDirection: 180,
    uvIndex: 1,
    irradiance: 40000,
    lux: 5400,
    batteryLevel: 78,
    status: "Active",
  },
  {
    stationId: 6,
    name: "Foxtrot",
    type: "Automatic Weather Station",
    location: "Abucay, Bataan",
    coordinates: [120.51655749421144, 14.722171591112968],
    imgStation:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Processed_seafood_clipped.jpg/1280px-Processed_seafood_clipped.jpg",
    temperature: 20,
    heatIndex: 30,
    humidity: 40,
    precipitation: 100,
    airPressure: 1000,
    windSpeed: 4.61,
    windDirection: 75,
    uvIndex: 1,
    irradiance: 40000,
    lux: 5400,
    batteryLevel: 56,
    status: "Inactive",
  },
];

export const styles = [
  {
    title: "Dark",
    uri: "mapbox://styles/mapbox/dark-v11",
  },
  {
    title: "Light",
    uri: "mapbox://styles/mapbox/light-v11",
  },
  {
    title: "Day",
    uri: "mapbox://styles/mapbox/navigation-day-v1",
  },
  {
    title: "Night",
    uri: "mapbox://styles/mapbox/navigation-night-v1",
  },
  {
    title: "Satellite",
    uri: "mapbox://styles/mapbox/satellite-streets-v11",
  },
  {
    title: "Streets",
    uri: "mapbox://styles/mapbox/streets-v11",
  },
];

export const band = [
  {
    title: "Sandwich",
    value: "snd",
  },
  {
    title: "Heavy rainfall potential areas",
    value: "hrp",
  },
  {
    title: "True Color Reproduction Image",
    value: "trm",
  },
  {
    title: "B13 (Infrared)",
    value: "b13",
  },
  {
    title: "B03 (Visible)",
    value: "b03",
  },
  {
    title: "B08 (Water Vapor)",
    value: "b08",
  },
  {
    title: "B07 (Short Wave Infrared)",
    value: "b07",
  },
  {
    title: "Day Microphysics RGB",
    value: "dms",
  },
  {
    title: "Night Microphysics RGB",
    value: "ngt",
  },
  {
    title: "Dust RGB",
    value: "dst",
  },
  {
    title: "Airmass RGB",
    value: "arm",
  },
  {
    title: "Day Snow-Fog RGB",
    value: "dsl",
  },
  {
    title: "Natural Color RGB",
    value: "dnc",
  },
  {
    title: "True Color RGB (Enhanced)",
    value: "tre",
  },
  {
    title: "Day Convective Storm RGB",
    value: "cve",
  },
  {
    title: "B03 combined with B13",
    value: "vir",
  },
  {
    title: "B03 and B13 at night",
    value: "irv",
  },
];

