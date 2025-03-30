import { useEffect, useState, useRef } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  roundUpToNearest10Minutes,
  checkImageUrl,
  getFormattedDate,
  convertUTCtoLocal,
  getNearestTimeIndex,
  delay,
} from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Fullscreen } from "lucide-react";
import { SATELLITE_BANDS, SATELLITE_TIMER } from "@/constants";

const Himawari = () => {
  const [isCycling, setIsCycling] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState<number[]>([0]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [lastValidImgUrl, setLastValidImgUrl] = useState<string | null>(null);
  const [bandSelect, setBandSelect] = useState<string>("snd");
  const [imageElement, setImageElement] = useState<string>(
    `https://www.data.jma.go.jp/mscweb/data/himawari/img/se2/se2_snd_${roundUpToNearest10Minutes(
      new Date()
    )}.jpg`
  );
  const [dynamicTimerArray, setDynamicTimerArray] = useState<string[]>([]);

  const generateDynamicTimerArray = (): string[] => {
    const now = new Date();
    const currentHours = now.getUTCHours();
    const currentMinutes = now.getUTCMinutes();
    const nearestTimeIndex = getNearestTimeIndex(currentHours, currentMinutes);
    const startTimeIndex = nearestTimeIndex % SATELLITE_TIMER.length;
    return [
      ...SATELLITE_TIMER.slice(startTimeIndex - 1),
      ...SATELLITE_TIMER.slice(0, nearestTimeIndex - 1),
    ];
  };

  const updateImage = async () => {
    const element = bandSelect;
    if (element) {
      const { hour: imgHour, minute: imgMinute } = convertUTCtoLocal(
        parseInt(dynamicTimerArray[currentIndex].slice(0, 2)),
        parseInt(dynamicTimerArray[currentIndex].slice(2, 4))
      );
      const imgName =
        "https://www.data.jma.go.jp/mscweb/data/himawari/img/se2/se2_" +
        element +
        "_" +
        `${imgHour.toString().padStart(2, "0")}${imgMinute
          .toString()
          .padStart(2, "0")}` +
        ".jpg";
      const isValidImage = await checkImageUrl(imgName);
      if (isValidImage) {
        setImageElement(imgName);
        setLastValidImgUrl(imgName);
      } else if (lastValidImgUrl) {
        setImageElement(lastValidImgUrl);
      }
    }
  };

  const processImagesWithDelay = async () => {
    if (!isCycling) return;
    await delay(500);
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < dynamicTimerArray.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handleSliderChange = async (value: number[]) => {
    setSliderValue(value);
    setCurrentIndex(value[0]);
    await updateImage();
  };

  const handleBandChange = (band: string) => {
    setBandSelect(band);
  };

  const formatDisplayTime = (index: number): string => {
    if (dynamicTimerArray.length === 0) return "00:00";
    const time = dynamicTimerArray[index];

    const hours = parseInt(time.slice(0, 2), 10);
    const minutes = parseInt(time.slice(2, 4), 10);

    const date = new Date(Date.UTC(1970, 0, 1, hours, minutes));
    date.setUTCHours(date.getUTCHours() + 8);

    const rawHours = date.getUTCHours() + 8;
    const formattedMinutes = date.getUTCMinutes().toString().padStart(2, "0");

    const formattedHours =
      rawHours >= 24
        ? (rawHours - 24).toString().padStart(2, "0")
        : rawHours.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}`;
  };

  updateImage();

  useEffect(() => {
    const newDynamicTimerArray = generateDynamicTimerArray();
    setDynamicTimerArray(newDynamicTimerArray);
  }, []);

  useEffect(() => {
    if (isCycling) {
      intervalRef.current = setInterval(processImagesWithDelay, 500);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isCycling]);

  useEffect(() => {
    setSliderValue([currentIndex]);
    updateImage();
  }, [bandSelect, currentIndex]);
  const imageRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (imageRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        imageRef.current.requestFullscreen();
      }
    }
  };
  return (
    <div className="flex w-full rounded-2xl dark:bg-secondary bg-white  ">
      <div className="w-full flex flex-col lg:flex-row bg-[#F6F8FC] dark:bg-[#181819] rounded-2xl ">
        <div className="h-full lg:w-2/3 flex flex-col relative">
          {/* Slider */}
          <div className="rounded-full p-3 pr-6 bg-[#F6F8FC] dark:bg-black flex flex-row items-center gap-3 absolute top-5 left-5 md:w-2/3 text-nowrap z-50">
            <Button
              className="bg-yellow-400 size-8 p-2 rounded-full hover:bg-black/25 dark:hover:bg-white/25"
              onClick={() => setIsCycling(!isCycling)}
            >
              {isCycling ? (
                <img src="/assets/icons/pause.svg" />
              ) : (
                <img src="/assets/icons/play.svg" />
              )}
            </Button>
            <div className="flex flex-col md:flex-row gap-2 grow">
              <Slider
                className="grow"
                defaultValue={[0]}
                max={SATELLITE_TIMER.length - 1}
                step={1}
                value={sliderValue}
                onValueChange={handleSliderChange}
              />
              <div className="text-base xs:text-xs">
                {formatDisplayTime(sliderValue[0])}{" "}
                {getFormattedDate(formatDisplayTime(sliderValue[0]))} PHT
              </div>
            </div>
          </div>

          <div className="relative h-full w-full">
            <div ref={imageRef} className="h-full w-full">
              <img
                src={imageElement}
                alt="Himawari Satellite View"
                className="rounded-2xl h-full p-0 m-0 w-full"
              />
            </div>
            <button
              onClick={toggleFullscreen}
              className="absolute top-4 right-4  text-white p-2 rounded-lg shadow-lg"
            >
              <Fullscreen />
            </button>
          </div>
        </div>

        <div className="lg:w-1/3 bg-secondary">
          <div className="p-5 ">
            <h2 className="py-2 lg:text-3xl text-base font-bold">
              Real-time Satellite View
            </h2>
            <span className=" lg:text-sm text-xs">
              <p>
                Source: The True Color Reproduction (TCR) imagery from Himawari
                Satellite is provided by Meteorological Satellite Center, Japan
                Meteorological Agency through their general-use{" "}
                <a
                  className="text-blue-500"
                  href="https://www.data.jma.go.jp/mscweb/data/himawari/sat_img.php?area=se2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Real Time Imagery Website
                </a>
                .
              </p>
            </span>

            <div className="py-4">
              <Select
                onValueChange={(value) => {
                  handleBandChange(value);
                }}
                defaultValue={bandSelect}
                value={bandSelect}
              >
                <SelectTrigger className="w-full p-2 rounded-lg bg-white dark:bg-black">
                  <SelectValue placeholder="Band" />
                </SelectTrigger>
                <SelectContent>
                  {SATELLITE_BANDS.map((item, index) => (
                    <SelectItem value={item.value} key={index}>
                      {item.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="lg:text-lg  text-xs text-gray-500  gap-2 ">
              <span className="font-bold">About Himawari 8/9</span>
              <p className="lg:text-sm text-justify indent-8 sm:text-xs">
                The Himawari satellite series was developed and operated by the
                Japan Meteorological Agency (JMA). Named after the Japanese word
                for "sunflower," the Himawari satellites are geostationary
                meteorological satellites positioned at an altitude of
                approximately 35,786 kilometers above the equator.
              </p>
              <p className="lg:text-sm text-justify indent-8 text-xs">
                The latest in the series, Himawari-8 and Himawari-9, launched in
                2014 and 2016 respectively. They provide data every 10 minutes,
                enabling real-time monitoring of weather phenomena such as
                typhoons, thunderstorms, and heavy rainfall. The satellites are
                equipped with a 16-band multispectral imager, which captures
                detailed images in visible, near-infrared, and infrared
                wavelengths, providing critical information for weather
                prediction models, disaster management, and climate research.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Himawari;
