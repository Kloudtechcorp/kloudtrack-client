import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  text: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors"
      aria-label="Copy code"
    >
      {copied ? (
        <Check size={16} className="text-green-500" />
      ) : (
        <Copy size={16} className="text-gray-500" />
      )}
    </button>
  );
};

interface CodeBlockProps {
  language: string;
  code: string;
}

interface ResponseExampleProps {
  status: string;
  description?: string;
  code?: string;
}

interface CodeExample {
  language: string;
  code: string;
}

interface EndpointSectionProps {
  title: string;
  endpoint: string;
  description?: string;
  pathParams?: React.ReactNode[];
  headers?: React.ReactNode[];
  codeExamples: CodeExample[];
  responses: ResponseExampleProps[];
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, code }) => (
  <div className="mb-4">
    <div className="flex items-center justify-between px-4 py-2 text-xs font-sans rounded-t-md border dark:border-[#545454] bg-gray-50 dark:bg-gray-800">
      <span>{language}</span>
      <CopyButton text={code} />
    </div>
    <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-b-md text-sm overflow-auto whitespace-pre-wrap">
      {code}
    </pre>
  </div>
);

const ResponseExample: React.FC<ResponseExampleProps> = ({
  status,
  description,
  code,
}) => (
  <div className="mt-4">
    <p className="font-semibold">{status}:</p>
    {description && (
      <p className="mt-1 text-gray-600 dark:text-gray-300">{description}</p>
    )}
    {code && (
      <div className="mt-2 relative">
        <div className="absolute right-2 top-2">
          <CopyButton text={code} />
        </div>
        <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded text-sm overflow-auto whitespace-pre-wrap">
          {code}
        </pre>
      </div>
    )}
  </div>
);

const EndpointSection: React.FC<EndpointSectionProps> = ({
  title,
  endpoint,
  description,
  pathParams,
  headers,
  codeExamples,
  responses,
}) => (
  <section className="mb-12">
    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
      {title}
    </h2>
    {description && (
      <p className="mb-4 text-gray-600 dark:text-gray-300">{description}</p>
    )}

    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
      <p className="mb-4">
        <strong>Endpoint:</strong>{" "}
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
          {endpoint}
        </code>
      </p>

      {pathParams && (
        <>
          <h3 className="font-semibold mb-2">Path Parameters:</h3>
          <ul className="list-disc ml-6 mb-4 space-y-2">
            {pathParams.map((param, index) => (
              <li key={index}>{param}</li>
            ))}
          </ul>
        </>
      )}

      {headers && (
        <>
          <h3 className="font-semibold mb-2">Headers:</h3>
          <ul className="list-disc ml-6 mb-4 space-y-2">
            {headers.map((header, index) => (
              <li key={index}>{header}</li>
            ))}
          </ul>
        </>
      )}

      <h3 className="font-semibold mb-2">Example Usage:</h3>
      {codeExamples.map((example, index) => (
        <CodeBlock
          key={index}
          language={example.language}
          code={example.code}
        />
      ))}

      <h3 className="font-semibold mb-2">Responses:</h3>
      <div className="space-y-4">
        {responses.map((response, index) => (
          <ResponseExample key={index} {...response} />
        ))}
      </div>
    </div>
  </section>
);

const ApiDocument: React.FC = () => {
  return (
    <Card className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        API Documentation
      </h1>

      <p className="mb-8 text-gray-600 dark:text-gray-300">
        <strong>Base URL:</strong>{" "}
        <code className="bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded text-sm">
          https://app.kloudtechsea.com/api/v1
        </code>
      </p>

      <EndpointSection
        title="1. Get All Stations"
        endpoint="GET /get/stations"
        headers={[
          <>
            <strong>x-kloudtrack-key:</strong> Required
          </>,
        ]}
        codeExamples={[
          {
            language: "JavaScript",
            code: `async function fetchStations() {
  try {
    const response = await fetch("https://app.kloudtechsea.com/api/v1/get/stations", {
      method: "GET",
      headers: {
        "x-kloudtrack-key": "your-api-key-here",
      },
    });
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

fetchStations();`,
          },
          {
            language: "curl",
            code: `curl -X GET "https://app.kloudtechsea.com/api/v1/get/stations" \\
     -H "x-kloudtrack-key: your-api-key-here"`,
          },
        ]}
        responses={[
          {
            status: "200 OK",
            code: `{
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
  ]
}`,
          },
          {
            status: "400 Bad Request",
            description: "The station type is invalid or unrecognized.",
          },
          {
            status: "401 Unauthorized",
            description: "Invalid or missing API key.",
          },
          {
            status: "404 Not Found",
            description: "No stations available for the user.",
          },
        ]}
      />

      <EndpointSection
        title="2. Get Specific Station"
        endpoint="GET /get/station/:id"
        pathParams={[
          <>
            <strong>id:</strong> (String) The id of the station. You can find it
            in the profile section.
          </>,
        ]}
        headers={[
          <>
            <strong>x-kloudtrack-key:</strong> Required
          </>,
        ]}
        codeExamples={[
          {
            language: "JavaScript",
            code: `async function fetchStation(id: string) {
  try {
    const response = await fetch(
      \`https://app.kloudtechsea.com/api/v1/get/station/\${id}\`,
      {
        method: "GET",
        headers: {
          "x-kloudtrack-key": "your-api-key-here",
        },
      }
    );

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

fetchStation("station-id");`,
          },
          {
            language: "curl",
            code: `curl -X GET "https://app.kloudtechsea.com/api/v1/get/station/:id" \\
     -H "x-kloudtrack-key: your-api-key-here"`,
          },
        ]}
        responses={[
          {
            status: "200 OK",
            code: `{
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
}`,
          },
          {
            status: "401 Unauthorized",
            description: "Invalid or missing API key.",
          },
          {
            status: "403 Forbidden",
            description:
              "The user does not have permission to access the station.",
          },
          {
            status: "404 Not Found",
            description: "Station not found.",
          },
        ]}
      />

      <EndpointSection
        title="3. Get Stations by Type"
        endpoint="GET /get/stations/:type"
        description="Fetch a list of stations filtered by their type (e.g., AWS, ARG, CLMS, RLMS). Use this endpoint to get only the stations that match a specific type."
        pathParams={[
          <>
            <strong>type:</strong> (String) The station type. Accepted values
            include:{" "}
            <code className="bg-gray-100 dark:bg-gray-900 px-1 rounded">
              aws
            </code>
            ,{" "}
            <code className="bg-gray-100 dark:bg-gray-900 px-1 rounded">
              arg
            </code>
            ,{" "}
            <code className="bg-gray-100 dark:bg-gray-900 px-1 rounded">
              clms
            </code>
            , and{" "}
            <code className="bg-gray-100 dark:bg-gray-900 px-1 rounded">
              rlms
            </code>
            .
          </>,
        ]}
        headers={[
          <>
            <strong>x-kloudtrack-key:</strong> Required
          </>,
        ]}
        codeExamples={[
          {
            language: "JavaScript",
            code: `type StationType = 'aws' | 'arg' | 'clms' | 'rlms';

async function fetchStationsByType(type: StationType) {
  try {
    const response = await fetch(
      \`https://app.kloudtechsea.com/api/v1/get/stations/\${type}\`,
      {
        method: "GET",
        headers: {
          "x-kloudtrack-key": "your-api-key-here",
        },
      }
    );

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

fetchStationsByType("aws");`,
          },
          {
            language: "curl",
            code: `curl -X GET "https://app.kloudtechsea.com/api/v1/get/stations/aws" \\
     -H "x-kloudtrack-key: your-api-key-here"`,
          },
        ]}
        responses={[
          {
            status: "200 OK",
            description:
              "A JSON array containing station objects matching the requested type.",
            code: `[
  {
    "id": "bKBoGzL0Yl0pwdm3",
    "name": "Demo Station ( Maria )",
    "type": "AWS",
    "barangay": "San Jose",
    "municipality": "Balanga",
    "province": "Bataan",
    "region": "Region III",
    "image": "https://client.kloudtechsea.com/assets/img/demo.jpg",
    "latitude": 14.67238327039792,
    "longitude": 120.5297135541752,
    "data": {
      "recordedAt": "2025-02-21T08:34:26.000Z",
      "temperature": 0,
      "humidity": 0
    }
  }
]`,
          },
          {
            status: "401 Unauthorized",
            description: "Invalid or missing API key.",
          },
          {
            status: "404 Not Found",
            description: "No stations found for the user.",
          },
        ]}
      />
    </Card>
  );
};

export default ApiDocument;
