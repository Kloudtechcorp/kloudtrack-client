import { WeatherDataProps, ChartData } from "@/lib/types/chartTypes";

export const chartData: ChartData [] = [
    {
      stationId: 1,
      parameters:{
        temperature: [26, 27, 30, 32, 34, 37, 42, 48, 42, 35, 33, 36],
        humidity: [60, 55, 50, 65, 70, 75, 80, 85, 80, 75, 70, 65],
        heatIndex: [30, 31, 32, 33, 34, 35, 36, 37, 36, 35, 34, 33],
        airPressure: [1012, 1010, 1011, 1013, 1014, 1015, 1016, 1017, 1016, 1015, 1014, 1013,],
        precipitation: [2, 3, 0, 1, 4, 5, 0, 0, 2, 1, 3, 0],
        windSpeed: [8, 10, 9, 11, 7, 12, 14, 16, 13, 11, 10, 9],
        windDirection: [180, 185, 190, 195, 200, 205, 210, 215, 220, 225, 230, 235],
        uvIndex: [5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4],
        irradiance: [500, 550, 600, 650, 700, 750, 700, 650, 600, 550, 500, 450,],
        lux: [ 10000, 10500, 11000, 11500, 12000, 12500, 12000, 11500, 11000, 10500, 10000, 9500,],
        batteryLevel: [95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84],
    },
    },
    
    {
      stationId: 2,
      parameters:{
        temperature: [29.1, 30.2, 31.0, 30.5, 29.8, 30.0, 31.2, 32.0, 31.5, 30.7, 31.0, 30.9],
        humidity: [65, 63, 60, 58, 62, 64, 66, 67, 65, 63, 62, 61],
        heatIndex: [32.5, 33.1, 34.2, 33.7, 32.9, 33.0, 34.5, 35.2, 34.8, 33.5, 34.0, 33.9,],
        airPressure: [1009, 1008, 1007, 1006, 1007, 1008, 1009, 1010, 1009, 1008, 1007, 1008,],
        precipitation: [0, 0.2, 0, 0, 0.1, 0, 0.3, 0.4, 0.2, 0, 0, 0.1],
        windSpeed: [20, 22, 21, 19, 18, 20, 23, 25, 22, 21, 19, 20],
        windDirection: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110],
        uvIndex: [5, 6, 7, 8, 7, 6, 5, 6, 7, 6, 7, 8],
        irradiance: [800, 850, 900, 950, 920, 880, 870, 900, 920, 940, 930, 910,],
        lux: [15000, 15500, 16000, 16500, 16200, 15800, 15600, 16000, 16200, 16400, 16300, 15900,],
        batteryLevel: [95, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83],
      },
    },
     
    {
      stationId: 3,
      parameters:{
        temperature: [28.5, 29.0, 30.0, 29.5, 28.8, 29.0, 30.5, 31.0, 30.5, 29.7, 30.0, 29.9,],
        humidity: [70, 68, 65, 63, 67, 69, 71, 72, 70, 68, 67, 66],
        heatIndex: [31.5, 32.1, 33.2, 32.7, 31.9, 32.0, 33.5, 34.2, 33.8, 32.5, 33.0,32.9,],
        airPressure: [1008, 1007, 1006, 1005, 1006, 1007, 1008, 1009, 1008, 1007, 1006,1007,],
        precipitation: [0, 0.1, 0, 0, 0.2, 0, 0.4, 0.3, 0.1, 0, 0, 0.2],
        windSpeed: [12, 14, 15, 13, 11, 14, 16, 18, 17, 13, 12, 15],
        windDirection: [220, 225, 230, 235, 240, 245, 250, 255, 260, 265, 270, 275],
        uvIndex: [4, 5, 6, 7, 6, 5, 4, 5, 6, 5, 6, 7],
        irradiance: [750, 800, 850, 900, 870, 830, 820, 850, 870, 890, 880, 860,],
        lux: [14500, 15000, 15500, 16000, 15700, 15300, 15100, 15500, 15700, 15900,15800, 15400,],
        batteryLevel: [90, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78],
      },

      },
      {
        stationId: 4,
        parameters:{
          temperature: [26, 27, 30, 32, 34, 37, 42, 48, 42, 35, 33, 36],
          humidity: [60, 55, 50, 65, 70, 75, 80, 85, 80, 75, 70, 65],
          heatIndex: [30, 31, 32, 33, 34, 35, 36, 37, 36, 35, 34, 33],
          airPressure: [1012, 1010, 1011, 1013, 1014, 1015, 1016, 1017, 1016, 1015, 1014, 1013,],
          precipitation: [2, 3, 0, 1, 4, 5, 0, 0, 2, 1, 3, 0],
          windSpeed: [5, 7, 8, 6, 9, 10, 11, 8, 6, 7, 9, 5],
          windDirection: [300, 310, 320, 330, 340, 350, 360, 10, 20, 30, 40, 50],
          uvIndex: [5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4],
          irradiance: [500, 550, 600, 650, 700, 750, 700, 650, 600, 550, 500, 450,],
          lux: [ 10000, 10500, 11000, 11500, 12000, 12500, 12000, 11500, 11000, 10500, 10000, 9500,],
          batteryLevel: [95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84],
      },
      },
      
      {
        stationId: 5,
        parameters:{
          temperature: [29.1, 30.2, 31.0, 30.5, 29.8, 30.0, 31.2, 32.0, 31.5, 30.7, 31.0, 30.9],
          humidity: [65, 63, 60, 58, 62, 64, 66, 67, 65, 63, 62, 61],
          heatIndex: [32.5, 33.1, 34.2, 33.7, 32.9, 33.0, 34.5, 35.2, 34.8, 33.5, 34.0, 33.9,],
          airPressure: [1009, 1008, 1007, 1006, 1007, 1008, 1009, 1010, 1009, 1008, 1007, 1008,],
          precipitation: [0, 0.2, 0, 0, 0.1, 0, 0.3, 0.4, 0.2, 0, 0, 0.1],
          windSpeed: [15, 18, 17, 16, 14, 19, 20, 22, 21, 17, 18, 16],
          windDirection: [120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230],          
          uvIndex: [5, 6, 7, 8, 7, 6, 5, 6, 7, 6, 7, 8],
          irradiance: [800, 850, 900, 950, 920, 880, 870, 900, 920, 940, 930, 910,],
          lux: [15000, 15500, 16000, 16500, 16200, 15800, 15600, 16000, 16200, 16400, 16300, 15900,],
          batteryLevel: [95, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83],
        },
      },
       
      {
        stationId: 6,
        parameters:{
          temperature: [28.5, 29.0, 30.0, 29.5, 28.8, 29.0, 30.5, 31.0, 30.5, 29.7, 30.0, 29.9,],
          humidity: [70, 68, 65, 63, 67, 69, 71, 72, 70, 68, 67, 66],
          heatIndex: [31.5, 32.1, 33.2, 32.7, 31.9, 32.0, 33.5, 34.2, 33.8, 32.5, 33.0,32.9,],
          airPressure: [1008, 1007, 1006, 1005, 1006, 1007, 1008, 1009, 1008, 1007, 1006,1007,],
          precipitation: [0, 0.1, 0, 0, 0.2, 0, 0.4, 0.3, 0.1, 0, 0, 0.2],
          windSpeed: [25, 27, 26, 24, 23, 28, 29, 31, 28, 27, 25, 26],
          windDirection: [45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
          uvIndex: [4, 5, 6, 7, 6, 5, 4, 5, 6, 5, 6, 7],
          irradiance: [750, 800, 850, 900, 870, 830, 820, 850, 870, 890, 880, 860,],
          lux: [14500, 15000, 15500, 16000, 15700, 15300, 15100, 15500, 15700, 15900,15800, 15400,],
          batteryLevel: [90, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78],
        },
  
        }
     
  ];


  export const stationInfo: WeatherDataProps[] = [
    {
      stationId: 1,
      name: "Alpha",
      type: "Automatic Weather Station",
      location: "Pto. Rivas Ibaba, Balanga City, Bataan",
      coordinates: [120.5566, 14.6907],
      imgStation:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Processed_seafood_clipped.jpg/1280px-Processed_seafood_clipped.jpg",
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
      status: "Inactive",
    },
  ];
 
  const fetchDetails = (parameters: number[]) => {
    return {
      temperature: [
        { label: "Date Recorded", value: "August 30, 2024 (1:00 PM)" },
        { label: "Current", value: `${parameters.temperature[parameters.temperature.length - 1]}°C` },
        { label: "Minimum (12-Hour)", value: `${Math.min(...parameters.temperature)}°C` },
        { label: "Maximum (12-Hour)", value: `${Math.max(...parameters.temperature)}°C` },
        { label: "Past (6-Hour)", value: `${calculateAverage(parameters.temperature.slice(-6))}°C` },
      ],
      humidity: [
        { label: "Date Recorded", value: "August 30, 2024 (1:00 PM)" },
        { label: "Current", value: `${parameters.humidity[parameters.humidity.length - 1]}%` },
        { label: "Minimum (12-Hour)", value: `${Math.min(...parameters.humidity)}%` },
        { label: "Maximum (12-Hour)", value: `${Math.max(...parameters.humidity)}%` },
        { label: "Past (6-Hour)", value: `${calculateAverage(parameters.humidity.slice(-6))}%` },
      ],
      heatIndex: [
        { label: "Date Recorded", value: "August 30, 2024 (1:00 PM)" },
        { label: "Current", value: `${parameters.heatIndex[parameters.heatIndex.length - 1]}°C` },
        { label: "Minimum (12-Hour)", value: `${Math.min(...parameters.heatIndex)}°C` },
        { label: "Maximum (12-Hour)", value: `${Math.max(...parameters.heatIndex)}°C` },
        { label: "Past (6-Hour)", value: `${calculateAverage(parameters.heatIndex.slice(-6))}°C` },
      ],
      airPressure: [
        { label: "Date Recorded", value: "August 30, 2024 (1:00 PM)" },
        { label: "Current", value: `${parameters.airPressure[parameters.airPressure.length - 1]} hPa` },
        { label: "Minimum (12-Hour)", value: `${Math.min(...parameters.airPressure)} hPa` },
        { label: "Maximum (12-Hour)", value: `${Math.max(...parameters.airPressure)} hPa` },
        { label: "Past (6-Hour)", value: `${calculateAverage(parameters.airPressure.slice(-6))} hPa` },
      ],
      precipitation: [
        { label: "Date Recorded", value: "August 30, 2024 (1:00 PM)" },
        { label: "Current", value: `${parameters.precipitation[parameters.precipitation.length - 1]} mm` },
        { label: "Minimum (12-Hour)", value: `${Math.min(...parameters.precipitation)} mm` },
        { label: "Maximum (12-Hour)", value: `${Math.max(...parameters.precipitation)} mm` },
        { label: "Past (6-Hour)", value: `${calculateAverage(parameters.precipitation.slice(-6))} mm` },
      ],
      windSpeed: [
        { label: "Date Recorded", value: "August 30, 2024 (1:00 PM)" },
        { label: "Current", value: `${parameters.windSpeed[parameters.precipitation.length - 1]} mm` },
        { label: "Minimum (12-Hour)", value: `${Math.min(...parameters.precipitation)} mm` },
        { label: "Maximum (12-Hour)", value: `${Math.max(...parameters.precipitation)} mm` },
        { label: "Past (6-Hour)", value: `${calculateAverage(parameters.precipitation.slice(-6))} mm` },
      ],
      windDirection: [
        { label: "Date Recorded", value: "August 30, 2024 (1:00 PM)" },
        { label: "Current", value: `${parameters.precipitation[parameters.precipitation.length - 1]} mm` },
        { label: "Minimum (12-Hour)", value: `${Math.min(...parameters.precipitation)} mm` },
        { label: "Maximum (12-Hour)", value: `${Math.max(...parameters.precipitation)} mm` },
        { label: "Past (6-Hour)", value: `${calculateAverage(parameters.precipitation.slice(-6))} mm` },
      ],
      uvIndex: [
        { label: "Date Recorded", value: "August 30, 2024 (1:00 PM)" },
        { label: "Current", value: `${parameters.uvIndex[parameters.uvIndex.length - 1]}` },
        { label: "Minimum (12-Hour)", value: `${Math.min(...parameters.uvIndex)}` },
        { label: "Maximum (12-Hour)", value: `${Math.max(...parameters.uvIndex)}` },
        { label: "Past (6-Hour)", value: `${calculateAverage(parameters.uvIndex.slice(-6))}` },
      ],
      irradiance: [
        { label: "Date Recorded", value: "August 30, 2024 (1:00 PM)" },
        { label: "Current", value: `${parameters.irradiance[parameters.irradiance.length - 1]} W/m²` },
        { label: "Minimum (12-Hour)", value: `${Math.min(...parameters.irradiance)} W/m²` },
        { label: "Maximum (12-Hour)", value: `${Math.max(...parameters.irradiance)} W/m²` },
        { label: "Past (6-Hour)", value: `${calculateAverage(parameters.irradiance.slice(-6))} W/m²` },
      ],
      lux: [
        { label: "Date Recorded", value: "August 30, 2024 (1:00 PM)" },
        { label: "Current", value: `${parameters.lux[parameters.lux.length - 1]} lx` },
        { label: "Minimum (12-Hour)", value: `${Math.min(...parameters.lux)} lx` },
        { label: "Maximum (12-Hour)", value: `${Math.max(...parameters.lux)} lx` },
        { label: "Past (6-Hour)", value: `${calculateAverage(parameters.lux.slice(-6))} lx` },
      ],
      batteryLevel: [
        { label: "Date Recorded", value: "August 30, 2024 (1:00 PM)" },
        { label: "Current", value: `${parameters.batteryLevel[parameters.batteryLevel.length - 1]}%` },
        { label: "Minimum (12-Hour)", value: `${Math.min(...parameters.batteryLevel)}%` },
        { label: "Maximum (12-Hour)", value: `${Math.max(...parameters.batteryLevel)}%` },
        { label: "Past (6-Hour)", value: `${calculateAverage(parameters.batteryLevel.slice(-6))}%` },
      ],
    };
  };
  

  
  export const mergeStationData = (stationInfo, chartData) => {
    return stationInfo.map(station => {
      // Find corresponding chart data
      const data = chartData.find(cd => cd.stationId === station.stationId);
  
      // If data is found, return combined object with details
      if (data) {
        const { parameters } = data;
  
        return {
          ...station,
          parameters: parameters,
          details: fetchDetails(parameters),
        };
      }
  
      // If no matching data is found, return station info only
      return station;
    });
  };
  

  export const mergeMapData = (stationInfo, chartData) => {
    return stationInfo.map(station => {
      // Find corresponding chart data
      const data = chartData.find(cd => cd.stationId === station.stationId);
  
      // If data is found, return combined object with details
      if (data) {
        const { parameters } = data;
  
        return {
          ...station,
          parameters: parameters[parameters.length - 1],
        };
      }
  
      // If no matching data is found, return station info only
      return station;
    });
  };


 
    // Helper function to calculate average
    function calculateAverage(dataArray: number[]) {
        const sum = dataArray.reduce(
          (acc: number, value: number) => acc + value,
          0
        );
        return (sum / dataArray.length).toFixed(2); // rounded to 2 decimal places
      }
