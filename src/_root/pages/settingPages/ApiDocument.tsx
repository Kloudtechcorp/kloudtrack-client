import { Card } from "@/components/ui/card";

const ApiDocument = () => {
  return (
    <Card className="px-7 py-4 gap-2 pb-10">
      <h1 className="text-4xl font-bold text-start text-gray-800 dark:text-white mb-4">
        How to use the API key
      </h1>
      <p className="mb-4">
        <strong>Base Url:</strong>{" "}
        <code className="bg-gray-100 dark:bg-[#545454] p-1 rounded">
          https://app.kloudtechsea.com/api/v1
        </code>
      </p>
      <div className="px-6 h-full">
        <span></span>
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-white mb-4">
            1. Get All Stations
          </h2>
          <div className="bg-secondary p-4 rounded-lg">
            <p>
              <strong>Endpoint:</strong>{" "}
              <code className="bg-gray-100 dark:bg-gray-900 p-1 rounded">
                GET /get/stations
              </code>
            </p>
            <h3 className="mt-4 font-semibold text-gray-600 dark:text-white">
              Headers:
            </h3>
            <ul className="list-disc ml-6">
              <li>
                <strong>kloudtrack-api-key:</strong> <span>Required</span>
              </li>
            </ul>
            <h3 className="mt-4 font-semibold text-gray-600 dark:text-white">
              Example Usage
            </h3>
            <div className="bg-secondary p-4 rounded">
              <div className="flex items-center text-token-text-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md border dark:border-[#545454] bg-token-sidebar-surface-primary dark:bg-token-main-surface-secondary select-none">
                Javascript
              </div>
              <pre className="bg-gray-200 dark:bg-[#545454] p-2 rounded text-sm">
                {`function fetchStations() {
  fetch("https://app.kloudtechsea.com/api/v1/get/stations", {
    method: "GET",
    headers: {
      "kloudtrack-api-key": your-api-key-here, // Include the API key in the headers
    },
  })
    .then((response) => response.json())
    .then((data) => {
        {/* Use the data fetched according to your needs */}
    })
    .catch((error) => {
      console.error("Error:", error); 
    });
}

fetchStations();
`}
              </pre>
            </div>

            <div className="bg-secondary p-4 rounded">
              <div className="flex items-center text-token-text-secondary border dark:border-[#545454] px-4 py-2 text-xs font-sans justify-between rounded-t-md h-9 bg-token-sidebar-surface-primary dark:bg-token-main-surface-secondary select-none">
                curl
              </div>
              <pre className="bg-gray-200 dark:bg-[#545454] p-2 rounded text-sm">
                {`curl -X GET "https://app.kloudtechsea.com/api/v1/get/stations" 
     -H "kloudtrack-api-key: your-api-key-here" // Include the API key in the headers
`}
              </pre>
            </div>
            <h3 className="mt-4 font-semibold text-gray-600 dark:text-white">
              Responses:
            </h3>
            <div className="bg-secondary p-4 rounded">
              <p>
                <strong>200 OK:</strong>
              </p>
              <pre className="bg-gray-200 dark:bg-[#545454] p-2 rounded text-sm">
                {`{
  "Automated Weather Stations": [
    {
      "name": "Station A",
      "type": "AWS",
      "latitude": 14.5995,
      "longitude": 120.9842,
      "barangay": "Barangay A",
      "municipality": "Municipality A",
      "province": "Province A",
      "region": "Region A",
      "image": "https://example.com/image.jpg",
      "data": {
        "recordedAt": "2024-11-24T15:30:00Z",
        "temperature": 30,
        "humidity": 80,
        "pressure": 1010,
        "heatIndex": 35,
        "precipitation": 0,
        "light": 1200,
        "wind": {
          "speed": 10,
          "direction": "N"
        },
        "uvIndex": 7
      }
    }
  ],
    "Automated Rain Gauge": [
    {
      "name": "Station B",
      "type": "ARG",
      "latitude": 14.5995,
      "longitude": 120.9842,
      "barangay": "Barangay A",
      "municipality": "Municipality A",
      "province": "Province A",
      "region": "Region A",
      "image": "https://example.com/image.jpg",
      "data": {
        "recordedAt": "2024-11-24T15:30:00Z",
        "precipitation": 30,
      }
    }
  ],
   "River Level Monitoring Systen": [
    {
      "name": "Station C",
      "type": "ARG",
        ...
  ]
}`}
              </pre>
              <p className="mt-2">
                <strong>400 Bad Request:</strong> The station type is invalid or
                unrecognized.
              </p>
              <p className="mt-2">
                <strong>401 Unauthorized:</strong> Invalid or missing API key.
              </p>
              <p className="mt-2">
                <strong>404 Not Found:</strong> No stations available for the
                user.
              </p>
              <p className="mt-2">
                <strong>500 Internal Server Error:</strong> Error while fetching
                station data.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-white mb-4">
            2. Get Specific Station
          </h2>
          <div className="bg-secondary p-4 rounded-lg">
            <p>
              <strong>Endpoint:</strong>{" "}
              <code className="bg-gray-100 dark:bg-[#545454] p-1 rounded">
                GET /get/station/:name
              </code>
            </p>
            <h3 className="mt-4 font-semibold text-gray-600 dark:text-white">
              Path Parameters:
            </h3>
            <ul className="list-disc ml-6">
              <li>
                <strong>name:</strong> (String) The name of the station.
              </li>
            </ul>
            <h3 className="mt-4 font-semibold text-gray-600 dark:text-white">
              Headers:
            </h3>
            <ul className="list-disc ml-6">
              <li>
                <strong>kloudtrack-api-key:</strong> <span>Required</span>
              </li>
            </ul>
            <div className="bg-secondary p-4 rounded">
              <div className="flex items-center text-token-text-secondary px-4 py-2 border dark:border-[#545454] text-xs font-sans justify-between rounded-t-md h-9 bg-token-sidebar-surface-primary dark:bg-token-main-surface-secondary select-none">
                Javascript
              </div>
              <pre className="bg-gray-200 dark:bg-[#545454] p-2 rounded text-sm">
                {`function fetchStations() {
  fetch("https://app.kloudtechsea.com/api/v1/get/station/:name", {
    method: "GET",
    headers: {
      "kloudtrack-api-key": your-api-key-here, // Include the API key in the headers
    },
  })
    .then((response) => response.json())
    .then((data) => {
        {/* Use the data fetched according to your needs */}
    })
    .catch((error) => {
      console.error("Error:", error); 
    });
}

fetchStations();
`}
              </pre>
            </div>

            <div className="bg-secondary p-4 rounded">
              <div className="flex items-center border dark:border-[#545454] text-token-text-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md h-9 bg-token-sidebar-surface-primary dark:bg-token-main-surface-secondary select-none">
                curl
              </div>
              <pre className="bg-gray-200 dark:bg-[#545454] p-2 rounded text-sm">
                {`curl -X GET "https://app.kloudtechsea.com/api/v1/get/station/:name" 
     -H "kloudtrack-api-key: your-api-key-here" // Include the API key in the headers
`}
              </pre>
            </div>
            <h3 className="mt-4 font-semibold text-gray-600 dark:text-white">
              Responses:
            </h3>
            <div className="bg-secondary p-4 rounded">
              <p>
                <strong>200 OK:</strong>
              </p>
              <pre className="bg-gray-200 dark:bg-[#545454] p-2 rounded text-sm">
                {`{
  "name": "Station A",
  "type": "AWS",
  "latitude": 14.5995,
  "longitude": 120.9842,
  "region": "Region A",
  "barangay": "Barangay A",
  "municipality": "Municipality A",
  "province": "Province A",
  "image": "https://example.com/image.jpg",
  "currentData": {
    "recordedAt": "2024-11-24T15:30:00Z",
    "temperature": 30,
    "humidity": 80,
    "pressure": 1010,
    "heatIndex": 35,
    "precipitation": 0,
    "light": 1200,
    "windSpeed": 10,
    "windDirection": "N",
    "uvIndex": 7
  }
}`}
              </pre>
              <p className="mt-2">
                <strong>400 Bad Request:</strong> The station type is invalid or
                unrecognized.
              </p>
              <p className="mt-2">
                <strong>401 Unauthorized:</strong> Invalid or missing API key.
              </p>
              <p className="mt-2">
                <strong>403 Forbidden:</strong> The user does not have
                permission to access the station.
              </p>
              <p className="mt-2">
                <strong>404 Not Found:</strong> Station not found.
              </p>
              <p className="mt-2">
                <strong>500 Internal Server Error:</strong> Error while fetching
                station data.
              </p>
            </div>
          </div>
        </section>
      </div>
    </Card>
  );
};

export default ApiDocument;
