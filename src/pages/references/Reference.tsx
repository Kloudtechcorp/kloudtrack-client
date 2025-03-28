import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WEATHER_TERMINOLOGIES } from "@/constants";
import React, { useEffect, useState } from "react";

const Reference: React.FC = () => {
  const [expandedItems, setExpandedItems] = useState<{
    [key: number]: boolean;
  }>({});
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredTerminologies, setFilteredTerminologies] = useState<
    WeatherTerminology[]
  >([]);

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

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredTerminologies(WEATHER_TERMINOLOGIES);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = WEATHER_TERMINOLOGIES.filter(
        (item) =>
          item.term.toLowerCase().includes(query) ||
          (item.subtitle && item.subtitle.toLowerCase().includes(query)) ||
          item.definition.toLowerCase().includes(query) ||
          (item.threshold && item.threshold.toLowerCase().includes(query))
      );
      setFilteredTerminologies(filtered);
    }
  }, [searchQuery, WEATHER_TERMINOLOGIES]);

  const renderSearchBar = () => (
    <div className="relative w-full mb-4">
      <input
        type="text"
        placeholder="Search weather terminology..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
      <svg
        className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-300"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      {searchQuery && (
        <button
          onClick={() => setSearchQuery("")}
          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
  console.log(searchQuery);
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
        {renderSearchBar()}
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
              {filteredTerminologies.map((item, index) => (
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
              {filteredTerminologies
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
              {filteredTerminologies
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
              {filteredTerminologies
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
              {filteredTerminologies
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
