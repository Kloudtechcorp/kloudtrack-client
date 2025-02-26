import React, { useState } from "react";

// TypeScript interface for weather terminology
interface WeatherTerminology {
  term: string;
  definition: string;
  threshold?: string;
  category: "heatIndex" | "windSpeed" | "precipitation" | "uvIndex";
}

const Reference: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");
  // PAGASA weather terminology data
  const weatherTerminologies: WeatherTerminology[] = [
    {
      term: "Caution",
      threshold: "27-32°C",
      definition:
        "Fatigue is possible with prolonged exposure and activity. Continuing activity could lead to heat cramps.",
      category: "heatIndex",
    },
    {
      term: "Extreme Caution",
      threshold: "33-41°C",
      definition:
        "Heat cramps and heat exhaustion are possible. continuing activity could lead to heat stroke.",
      category: "heatIndex",
    },
    {
      term: "Danger",
      threshold: "42-51°C",
      definition:
        "Heat cramps and heat exhaustion are likely; heat stroke is probable with continued exposure.",
      category: "heatIndex",
    },
    {
      term: "Extreme Danger",
      threshold: "52°C and beyond",
      definition: "Heat stroke is imminent.",
      category: "heatIndex",
    },
    {
      term: "Light Winds",
      threshold: "19KPH or less",
      definition:
        "Wind felt on face. Ordinary wind vanes moved by wind. Leaves rustle.",
      category: "windSpeed",
    },
    {
      term: "Moderate Winds",
      threshold: "20-29KPH",
      definition: "Wind raises dust and loose paper. Small branches are moved.",
      category: "windSpeed",
    },
    {
      term: "Fresh Winds",
      threshold: "30-39KPH",
      definition:
        "Small trees in leaf begin to sway. Crested wavelets appear on inland waters.",
      category: "windSpeed",
    },
    {
      term: "Strong Winds",
      threshold: "40-50KPH",
      definition:
        "Large branches in motion. Whistling heard in telephone wires. Umbrellas used with difficulty.",
      category: "windSpeed",
    },

    {
      term: "Gale",
      threshold: "51-87KPH",
      definition:
        "Whole trees in motion. Incovenience felt when walking against wind. Twigs break off road. Cars veer on road. Larger brances break off. Slight structural damage occurs-roofing disloged.",
      category: "windSpeed",
    },
    {
      term: "Stormy",
      threshold: "88KPH or more",
      definition:
        "Trees uprooted. Considered structural damage. Widespread damage.",
      category: "windSpeed",
    },
    {
      term: "Light Rains",
      threshold: "2.5mm/ph and below",
      definition:
        "Individual drops easily identified and puddles(small muddy pools) form slowly. Small streams may flow in gutters.",
      category: "precipitation",
    },
    {
      term: "Moderate Rains",
      threshold: "2.5-7.5mm/ph",
      definition: "Puddles rapidly forming and down pipes flowing freely",
      category: "precipitation",
    },
    {
      term: "Heavy Rains",
      threshold: "7.5mm/ph and above",
      definition:
        "The sky is overcast, there is a continuous precipitation. Falls in sheets, misty spray over hard surfaces. May cause roaring noise on roofs.",
      category: "precipitation",
    },
    {
      term: "Minimal",
      threshold: "1-2",
      definition:
        "Wear sunglasses on bright days. In winter, reflection off snow can nearly double UV strength. If you burn easily, cover up and use sunscreen.",
      category: "uvIndex",
    },
    {
      term: "Moderate",
      threshold: "3-5",
      definition:
        "Take precautions, such as covering and using sunscreen, if you will be outside. Stay in shade near midday when the sun is strongest.",
      category: "uvIndex",
    },
    {
      term: "High",
      threshold: "6-7",
      definition:
        "Protection against sunburn is needed. Reduce time in the sun between 11 a.m. and 4 p.m. Cover up, wear a hat and sunglasses, and use sunscreen",
      category: "uvIndex",
    },
    {
      term: "Very High",
      threshold: "8-10",
      definition:
        "Take extra precautions. Unprotected skin will be damaged and can burn quickly. Try to avoid the sun between 11 a.m and 4 p.m. Otherwise, seek shade, cover up, wear a hat and sunglasses, and use sunscreen.",
      category: "uvIndex",
    },
    {
      term: "Extreme",
      threshold: "11+",
      definition:
        "Take all precautions. unprotected skin can burn in minutes. Beachgoers should know that white sand and other bright surfaces reflect UV and will increase UV exposure. Avoid the sun between 11 a.m and 4 p.m. Seek shade, cover up, wear a hat and sunglasses, and use sunscreen.",
      category: "uvIndex",
    },
  ];

  // Filter terminology based on category selection
  const filteredTerminologies =
    filter === "all"
      ? weatherTerminologies
      : weatherTerminologies.filter((item) => item.category === filter);

  // Color coding based on category
  const getCategoryColor = (category: string): string => {
    switch (category) {
      case "heatIndex":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "windSpeed":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "precipitation":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "uvIndex":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  // Category label text
  const getCategoryLabel = (category: string): string => {
    switch (category) {
      case "heatIndex":
        return "Heat Index";
      case "windSpeed":
        return "Wind Speed";
      case "precipitation":
        return "Rainfall";
      case "uvIndex":
        return "UV Index";
      default:
        return "uvIndex";
    }
  };

  return (
    <div className="bg-[#F6F8FC] dark:bg-secondary w-full overflow-auto rounded-xl p-6 custom-scrollbar">
      <div className="container w-full">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Weather Terminology Reference
        </h1>

        {/* Filter options */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("heatIndex")}
            className={`px-4 py-2 rounded-lg ${
              filter === "heatIndex"
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            }`}
          >
            Heat Index
          </button>
          <button
            onClick={() => setFilter("windSpeed")}
            className={`px-4 py-2 rounded-lg ${
              filter === "windSpeed"
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            }`}
          >
            Wind Speed
          </button>
          <button
            onClick={() => setFilter("precipitation")}
            className={`px-4 py-2 rounded-lg ${
              filter === "precipitation"
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            }`}
          >
            Rainfall
          </button>
          <button
            onClick={() => setFilter("uvIndex")}
            className={`px-4 py-2 rounded-lg ${
              filter === "uvIndex"
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200"
            }`}
          >
            UV Index
          </button>
        </div>

        {/* Terminology cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTerminologies.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {item.term}
                  </h2>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(
                      item.category
                    )}`}
                  >
                    {getCategoryLabel(item.category)}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                  {item.definition}
                </p>
                {item.threshold && (
                  <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-md">
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      <span className="font-bold">Threshold:</span>{" "}
                      {item.threshold}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredTerminologies.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">
              No terminology found for this category.
            </p>
          </div>
        )}

        <div className="mt-6 text-sm text-gray-600 dark:text-gray-400 flex flex-col">
          <p>Sources:</p>
          <a
            href="https://www.pagasa.dost.gov.ph/weather/heat-index"
            target="_blank"
          >
            Pagasa's Heat Index
          </a>
          <a
            href="https://www.pagasa.dost.gov.ph/information/weather-terminologies"
            target="_blank"
          >
            Pagasa's Weather Terminologies
          </a>
        </div>
      </div>
    </div>
  );
};

export default Reference;
