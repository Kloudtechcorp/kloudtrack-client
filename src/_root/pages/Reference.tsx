import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";

// TypeScript interface for weather terminology
interface WeatherTerminology {
  term: string;
  definition: string;
  threshold?: string;
  leadTime?: string;
  subtitle?: string;
  subcategory?: string;
  category: "heatIndex" | "windSpeed" | "precipitation" | "uvIndex";
}

const Reference: React.FC = () => {
  // Track expanded state for each terminology item
  const [expandedItems, setExpandedItems] = useState<{
    [key: number]: boolean;
  }>({});

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
      threshold: "2.5mm/h and below",
      definition:
        "Individual drops easily identified and puddles(small muddy pools) form slowly. Small streams may flow in gutters.",
      category: "precipitation",
    },
    {
      term: "Moderate Rains",
      threshold: "2.5-7.5mm/h",
      definition: "Puddles rapidly forming and down pipes flowing freely",
      category: "precipitation",
    },
    {
      term: "Heavy Rains",
      subtitle: "Yellow Rainfall",
      threshold: "7.5-15mmph",
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
    {
      term: "Tropical Depression",
      subtitle: "Wind Signal 1",
      threshold: "39-61KPH",
      definition: `<strong>Potential Impacts:</strong> House of poor construction (e.g., wood frame, bamboo, makeshift), old dilapidated structures, and other structures made of light materials will suffer minimal to minor damage. Some banana and similar plants are tilted, while twigs of small trees may sway with the wind. Rice crops, especially those in flowering and ripening stages, may suffer some damage. Minimal disruption to public transportation.`,
      category: "windSpeed",
      leadTime: "36 Hours",
      subcategory: "cyclone",
    },
    {
      term: "Tropical Storm",
      subtitle: "Wind Signal 2",
      threshold: "62-88KPH",
      definition: `<strong>Potential Impacts:</strong> Minor to moderate damage may occur to makeshift or old dilapidated structures, and other structures made of light materials. Houses of poor and average construction (e.g., unreinforced CHB/masonry, mixed timber-CHB) may receive minor roof damage. Unsecures, exposed lightweight items may become projectiles which may cause additional damage. Some electrical wires may be blown down, resulting in local power outages. Minor to moderate disruption to public transportation. Most banana and similar plants are tilted, with some stooped or downed. Some small trees blow over, with twigs and branches of frail trees broken. Considerable damage is likely to rice and other similar crops, especially those in flowering and ripening stages.`,
      category: "windSpeed",
      leadTime: "24 Hours",
      subcategory: "cyclone",
    },
    {
      term: "Severe Tropical Storm",
      subtitle: "Wind Signal 3",
      threshold: "89-117KPH",
      definition: `<strong>Potential Impacts:</strong>
    Makeshift or old, dilapidated structures, and other structures made of light materials may suffer substantial damage. Houses of poor or average construction will have considerate roof damage, some blown-out windows, and/or partial wall damage. Well-constructed houses (e.g., reinforced/pre-cast CHB, reinforced concrete moment frame) may suffer minimal to minor roof damage.
    Warehouses and other buildings in industrial parks may suffer minor to moderate damage.
    Unsecured, exposed outdoor items of light to moderate weight may become projectiles, causing additional damage or injuries.
    Many areas may suffer power outages with numerous downed power lines ans posts. Minimal to minor disruption in telecommunications and potable water suppy.
    Moderate to significant disruption to public transportation
    Some small trees. most banana and similar plants, and a few large trees are downed or broken. Rice and other similar crops, especially those in flowering and ripening stages may suffer heavy damage.
`,
      category: "windSpeed",
      leadTime: "18 Hours",
      subcategory: "cyclone",
    },
    {
      term: "Typhoon",
      subtitle: "Wind Signal 4",
      threshold: "118-184KPH",
      definition: `<strong>Potential Impacts:</strong>
    Severe damage will occur to makeshift or old, dilapidated of light structures, and other structures made of light materials. Houses of poor or average construction may receive major damage, including complete roof failure and possible wall collapse; a few may suffer severe damage.
    Most well-constructed houses may sufer minor to moderate roof damage, with some houses experiencing major roof failure; blown out windows are also likely.
    Failure of aluminum and steel roofs and ceverings may occure in buildings at industrial parks.
    Some glass in most high-rise office buildings may be blown out; a few of these buildings may have minor to moderate damage and higher proportion of blown-out windows due to swaying.
    Considerable airborne debris willbe generated and may cause damage, injury, and possible fatalities.
    Near total loss of power supply and telecommunications due to numerous downed power lines, poles, and cellular towers. Diminished availability of potable water supply is also likely.
    Significant to severe disruption to public transportation.
    Significant damage to banana and similar plants. Most small tress and some large trees will be broken, defoliated, or uprooted. Almost total damage to rice and other crops.

`,
      category: "windSpeed",
      leadTime: "18 Hours",
      subcategory: "cyclone",
    },
    {
      term: "Super Typhoon",
      subtitle: "Wind Signal 5",
      threshold: "185KPH and above",
      definition: `<strong>Potential Impacts:</strong>
    
    Severe to catasrophic damage is expected to houses of poor or average construction, makeshift or old, dilapidated structures, and other structures made of light materials. Well-constructed houses may suffer substatial roof and wall failure or damage.
    Many industrial buildings will be destroyed, with only few receiving partial roof and wall damage.
    Most windows will be blowdn out n high-rise office buildings; Moderate structural damage is possible due to swaying.
    Extensive damage will be cause by airborne debris. People, pets, and livestock exposed to the wind are at great risk of injury or death.
    Electricity, potable water supply, and telecommunications will be unavailable for prolonged periods due to significant disruption in infrastructure.
    Prolonged significant to severe disruption to pucblic transportation.
    Vast majority of the trees will be broken, defoliated, or unrooted. Banana and similar plants will be extensively damaged. Few strees, plants, and crops will survive.
`,
      category: "windSpeed",
      leadTime: "12 Hours",
      subcategory: "cyclone",
    },
    {
      term: "Intense Rain",
      subtitle: "Orange Rainfall",
      threshold: "15-30mm/h",
      definition: "Flooding is threatening",
      category: "precipitation",
    },
    {
      term: "Torrential Rain",
      subtitle: "Red Rainfall",
      threshold: "30mm/h and above",
      definition: "Flooding is threatening",
      category: "precipitation",
    },
  ];

  // Function to toggle expansion state for a specific item
  const toggleExpand = (index: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Color coding based on category
  const getCategoryColor = (category: string, subcategory?: string): string => {
    switch (category) {
      case "heatIndex":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "windSpeed":
        if (subcategory === "cyclone")
          return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
        else
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

  // Function to render definition with expansion logic
  const renderDefinition = (definition: string, index: number) => {
    const isExpanded = expandedItems[index] || false;
    const CHARACTER_LIMIT = 200;
    const isLongDefinition = definition.length > CHARACTER_LIMIT;

    if (!isLongDefinition) {
      return <div dangerouslySetInnerHTML={{ __html: definition }} />;
    }

    if (isExpanded) {
      return (
        <div>
          <div dangerouslySetInnerHTML={{ __html: definition }} />
          <button
            onClick={() => toggleExpand(index)}
            className="mt-2 text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline focus:outline-none"
          >
            See Less
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <div
            dangerouslySetInnerHTML={{
              __html: definition.substring(0, CHARACTER_LIMIT) + "...",
            }}
          />
          <button
            onClick={() => toggleExpand(index)}
            className="mt-2 text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline focus:outline-none"
          >
            See More
          </button>
        </div>
      );
    }
  };

  return (
    <div className="bg-[#F6F8FC] dark:bg-secondary w-full overflow-auto rounded-xl p-6 custom-scrollbar">
      <div className="container w-full">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Weather Terminology Reference
        </h1>

        <Tabs
          defaultValue="all"
          className="w-full flex flex-col p-3 rounded-2xl gap-5 "
        >
          <TabsList className="flex flex-row justify-start gap-3 w-full p-5 container">
            <TabsTrigger value="all" className="w-fit">
              All
            </TabsTrigger>
            <TabsTrigger value="heatIndex" className="w-fit">
              Heat Index{" "}
            </TabsTrigger>
            <TabsTrigger value="windSpeed" className="w-fit">
              Wind Speed{" "}
            </TabsTrigger>
            <TabsTrigger value="precipitation" className="w-fit">
              Rainfall{" "}
            </TabsTrigger>
            <TabsTrigger value="uvIndex" className="w-fit">
              UV Index{" "}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <Card className="p-2">
              {weatherTerminologies.map((item, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                          {item.term}
                        </h2>
                        {item.subtitle && (
                          <h3 className="text-base font-semibold text-gray-600 dark:text-white">
                            {item.subtitle}
                          </h3>
                        )}
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(
                          item.category,
                          item.subcategory
                        )}`}
                      >
                        {getCategoryLabel(item.category)}
                      </span>
                    </div>
                    <div className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {renderDefinition(item.definition, index)}
                    </div>
                    {item.threshold && (
                      <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-md mt-2">
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                          <span className="font-bold">Threshold:</span>{" "}
                          {item.threshold}
                        </p>
                      </div>
                    )}
                    {item.leadTime && (
                      <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-md mt-2">
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                          <span className="font-bold">Warning Lead Time:</span>{" "}
                          {item.leadTime}
                        </p>
                      </div>
                    )}
                  </div>{" "}
                  <hr className="bg-black h-0.4 w-full" />
                </div>
              ))}
            </Card>
          </TabsContent>
          <TabsContent value="heatIndex">
            <Card className="p-2">
              {weatherTerminologies
                .filter((item) => item.category === "heatIndex")
                .map((item, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                            {item.term}
                          </h2>
                          {item.subtitle && (
                            <h3 className="text-base font-semibold text-gray-600 dark:text-white">
                              {item.subtitle}
                            </h3>
                          )}
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(
                            item.category,
                            item.subcategory
                          )}`}
                        >
                          {getCategoryLabel(item.category)}
                        </span>
                      </div>
                      <div className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                        {renderDefinition(item.definition, index)}
                      </div>
                      {item.threshold && (
                        <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-md mt-2">
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            <span className="font-bold">Threshold:</span>{" "}
                            {item.threshold}
                          </p>
                        </div>
                      )}
                      {item.leadTime && (
                        <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-md mt-2">
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            <span className="font-bold">
                              Warning Lead Time:
                            </span>{" "}
                            {item.leadTime}
                          </p>
                        </div>
                      )}
                    </div>
                    <hr className="bg-black h-0.4 w-full" />
                  </div>
                ))}
              <div className="w-full h-full mt-5">
                <img
                  src="/assets/references/heatindex-pagasa.png"
                  alt="pagasa-heatindex"
                />
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="windSpeed">
            <Card className="p-2">
              {weatherTerminologies
                .filter((item) => item.category === "windSpeed")
                .map((item, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                            {item.term}
                          </h2>
                          {item.subtitle && (
                            <h3 className="text-base font-semibold text-gray-600 dark:text-white">
                              {item.subtitle}
                            </h3>
                          )}
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(
                            item.category,
                            item.subcategory
                          )}`}
                        >
                          {getCategoryLabel(item.category)}
                        </span>
                      </div>
                      <div className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                        {renderDefinition(item.definition, index)}
                      </div>
                      {item.threshold && (
                        <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-md mt-2">
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            <span className="font-bold">Threshold:</span>{" "}
                            {item.threshold}
                          </p>
                        </div>
                      )}
                      {item.leadTime && (
                        <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-md mt-2">
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            <span className="font-bold">
                              Warning Lead Time:
                            </span>{" "}
                            {item.leadTime}
                          </p>
                        </div>
                      )}
                    </div>{" "}
                    <hr className="bg-black h-0.4 w-full" />
                  </div>
                ))}
              <div className="w-full h-full mt-5">
                <img
                  src="/assets/references/wind-signal-pagasa.jpg"
                  alt="pagasa-wind-signal"
                />
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="uvIndex">
            <Card className="p-2">
              {weatherTerminologies
                .filter((item) => item.category === "uvIndex")
                .map((item, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                            {item.term}
                          </h2>
                          {item.subtitle && (
                            <h3 className="text-base font-semibold text-gray-600 dark:text-white">
                              {item.subtitle}
                            </h3>
                          )}
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(
                            item.category,
                            item.subcategory
                          )}`}
                        >
                          {getCategoryLabel(item.category)}
                        </span>
                      </div>
                      <div className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                        {renderDefinition(item.definition, index)}
                      </div>
                      {item.threshold && (
                        <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-md mt-2">
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            <span className="font-bold">Threshold:</span>{" "}
                            {item.threshold}
                          </p>
                        </div>
                      )}
                      {item.leadTime && (
                        <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-md mt-2">
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            <span className="font-bold">
                              Warning Lead Time:
                            </span>{" "}
                            {item.leadTime}
                          </p>
                        </div>
                      )}
                    </div>{" "}
                    <hr className="bg-black h-0.4 w-full" />
                  </div>
                ))}
            </Card>
          </TabsContent>
          <TabsContent value="precipitation">
            <Card className="p-2">
              {weatherTerminologies
                .filter((item) => item.category === "precipitation")
                .map((item, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                            {item.term}
                          </h2>
                          {item.subtitle && (
                            <h3 className="text-base font-semibold text-gray-600 dark:text-white">
                              {item.subtitle}
                            </h3>
                          )}
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(
                            item.category,
                            item.subcategory
                          )}`}
                        >
                          {getCategoryLabel(item.category)}
                        </span>
                      </div>
                      <div className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                        {renderDefinition(item.definition, index)}
                      </div>
                      {item.threshold && (
                        <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-md mt-2">
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            <span className="font-bold">Threshold:</span>{" "}
                            {item.threshold}
                          </p>
                        </div>
                      )}
                      {item.leadTime && (
                        <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-md mt-2">
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            <span className="font-bold">
                              Warning Lead Time:
                            </span>{" "}
                            {item.leadTime}
                          </p>
                        </div>
                      )}
                    </div>{" "}
                    <hr className="bg-black h-0.4 w-full" />
                  </div>
                ))}
              <div className="w-full h-full mt-5">
                <img
                  src="/assets/references/rainfall-advisory.webp"
                  alt="pagasa-rainfall"
                />
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-6 text-sm text-gray-600 dark:text-gray-400 flex flex-col">
          <p>Sources:</p>
          <a
            href="https://www.pagasa.dost.gov.h/weather/heat-index"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-700 hover:cursor-pointer hover:text-blue-700/80"
          >
            Pagasa's Heat Index
          </a>
          <a
            href="https://www.pagasa.dost.gov.h/information/weather-terminologies"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-700 hover:cursor-pointer hover:text-blue-700/80 w-fit"
          >
            Pagasa's Weather Terminologies
          </a>
          <a
            href="https://www.pagasa.dost.gov.h/learning-tools/tropical-cyclone-wind-signal"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-700 hover:cursor-pointer hover:text-blue-700/80 w-fit"
          >
            Tropical Cyclone Wind Signal
          </a>
          {/* <a
            href="https://www.gmanetwork.com/news/topstories/specialreports/914597/red-rainfall-warning-carina-habagat/story/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-700 hover:cursor-pointer hover:text-blue-700/80 w-fit"
          >
            GMA News Explainer: PAGASA's Rainfall Warnings
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default Reference;
