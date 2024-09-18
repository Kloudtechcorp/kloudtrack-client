import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SampleDashboard = () => {
  const cardsData = [
    {
      title: "Temperature",
      value: "37.8°C",
    },
    {
      title: "Heat Index",
      value: "40°C",
    },
    {
      title: "Humidity",
      value: "40.2%",
    },
    {
      title: "Air Pressure",
      value: "971.54 mb",
    },
    {
      title: "Precipitation",
      value: "2 mm/hr",
    },
    {
      title: "Battery Level",
      value: `80%`,
    },
    {
      title: "UV Index",
      value: "1",
    },
    {
      title: "Irradiance",
      value: "123 W/m²",
    },
    {
      title: "Light Intensity",
      value: "54000 lux",
    },
    {
      title: "Gust",
      value: "42.5 kph",
    },
    {
      title: "10 min Wind Averages",
      value: "90deg",
    },
  ];

  return (
    <div className="flex p-4 flex-wrap w-full flex-row gap-4 overflow-y-scroll">
      {[...Array(12)].map((_, index) => (
        <div key={index} className="w-[46%]  bg-pink-200 container ">
          <Card className="">
            <CardHeader className="flex flex-row justify-items-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/0630jfParish_River_Welcome_Tortugas_Rivas_Balanga_City_Bataanfvf_17.JPG/1600px-0630jfParish_River_Welcome_Tortugas_Rivas_Balanga_City_Bataanfvf_17.JPG?20151022180607"
                className="w-1/3 object-contain h-1/4"
              />
              <div className="w-full ml-4">
                <div className="flex flex-row">
                  <CardTitle>Pto. Rivas Ibaba</CardTitle>
                  <img src={"/assets/icons/close.svg"} />
                </div>
                <CardDescription>Automatic Weather Stations</CardDescription>

                <div className="flex flex-row">
                  <h1 className="w-[66.67%] pt-12 pr-4">Balanga City </h1>
                  <div className=" w-[33.33%]  ">
                    <div className="  flex flex-row justify-end pt-12 pr-4 ">
                      <img src={"/assets/icons/close.svg"} />
                      <p>80%</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <div className="">
              <Table className="border-none">
                {/* <TableCaption className="text-left">
                  Note: Click the station to go to a corresponding page.
                </TableCaption> */}
                <TableHeader className="w-full border p-0 dark:text-white">
                  <TableRow className="w-full">
                    <TableHead className="text-center w-1/12 dark:text-white">
                      Icons
                    </TableHead>
                    <TableHead className="text-center w-5/12 dark:text-white">
                      Description
                    </TableHead>
                    <TableHead className="text-center w-6/12 dark:text-white">
                      Values
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cardsData.map((data, index) => (
                    <TableRow
                      className={`text-center ${
                        index % 2 ? "bg-gray-100" : "bg-gray-200"
                      }`}
                    >
                      <TableCell>
                        <img
                          src={"/assets/icons/close.svg"}
                          className="inline-flex"
                        />
                      </TableCell>

                      <TableCell>{data.title}</TableCell>
                      <TableCell>{data.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default SampleDashboard;
