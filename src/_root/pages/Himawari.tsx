import React, { useEffect, useState, useRef } from "react";
import { timer } from "../../lib/objects/himawariArrays";
import { Slider } from "@/components/ui/slider";
import {
  roundUpToNearest10Minutes,
  convertLocaltoUTC,
  checkImageUrl,
  getFormattedDate,
  convertUTCtoLocal,
  getNearestTimeIndex,
  delay,
} from "@/lib/utils";
import HimawariDetails from "@/components/dynamic/HimawariDetails";

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

  const generateDynamicTimerArray = (): string[] => {
    const now = new Date();
    const currentHours = now.getUTCHours();
    const currentMinutes = now.getUTCMinutes();

    const nearestTimeIndex = getNearestTimeIndex(currentHours, currentMinutes);
    const startTimeIndex = nearestTimeIndex % timer.length;

    return [
      ...timer.slice(startTimeIndex + 1),
      ...timer.slice(0, nearestTimeIndex + 1),
    ];
  };

  const [dynamicTimerArray, setDynamicTimerArray] = useState<string[]>([]);

  const updateImage = async (index: number) => {
    const element = bandSelect;
    if (element) {
      const { hour: imgHour, minute: imgMinute } = convertUTCtoLocal(
        parseInt(dynamicTimerArray[index].slice(0, 2)),
        parseInt(dynamicTimerArray[index].slice(2, 4))
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
    await updateImage(currentIndex);
    await delay(500);
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < dynamicTimerArray.length - 1 ? prevIndex + 1 : 0
    );
  };

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
  }, [isCycling, currentIndex]);

  useEffect(() => {
    setSliderValue([currentIndex]);
  }, [currentIndex]);

  useEffect(() => {
    const newDynamicTimerArray = generateDynamicTimerArray();
    setDynamicTimerArray(newDynamicTimerArray);
  }, []);

  const handleSliderChange = (value: number[]) => {
    if (isCycling) {
      setIsCycling(false);
    }
    setSliderValue(value);
    setCurrentIndex(value[0]);
    updateImage(value[0]);
  };

  const handleBandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBandSelect(event.target.value);
    updateImage(currentIndex);
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

  return (
    <div className="flex w-full rounded-2xl dark:bg-secondary bg-white  ">
      <div className="w-full flex sm:flex-col lg:flex-row bg-[#F6F8FC] dark:bg-slate-950 rounded-2xl ">
        <div className="h-full w-full flex flex-col relative">
          <div className="rounded-full p-3 pr-6 bg-white dark:bg-black flex flex-row items-center gap-3 absolute top-5 left-5 w-2/3 text-nowrap ">
            <button
              className="bg-yellow-400 dark:bg-blue-500 size-10 p-2 rounded-full"
              onClick={() => setIsCycling(!isCycling)}
            >
              {isCycling ? (
                <img src="/assets/icons/pause.svg" />
              ) : (
                <img src="/assets/icons/play.svg" />
              )}
            </button>
            <div className="flex flex-row gap-2 grow">
              <Slider
                className="grow"
                defaultValue={[0]}
                max={timer.length - 1}
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

          <div className="h-full w-full">
            <img
              src={imageElement}
              alt="Himawari Satellite View"
              className="rounded-2xl h-full p-0 m-0 w-full"
            />
          </div>
        </div>

        <div className="w-full">
          <div className="p-5">
            <h2 className="lg:text-3xl sm:text-base font-bold">
              Real-time Satellite View
            </h2>
            <span className="p-1 lg:text-sm sm:text-xs">
              <p>
                Source: The True Color Reproduction (TCR) imagery from Himawari
                Satellite is provided by Meteorological Satellite Center, Japan
                Meteorological Agency through their general-use
                <a
                  className="text-gray-500 hover:text-black"
                  href="https://www.data.jma.go.jp/mscweb/data/himawari/sat_img.php?area=se2"
                >
                  Real Time Imagery Website
                </a>
                .
              </p>
            </span>
            <div className="flex items-left flex-col gap-2 self-center">
              <div>Band</div>
              <select
                id="band"
                className="p-2 w-1/1 rounded-lg w-full bg-white  dark:bg-black"
                onChange={handleBandChange} // Call handleBandChange when the band is changed
              >
                <option value="snd">Sandwich</option>
                <option value="hrp">Heavy rainfall potential areas</option>
                <option value="trm">True Color Reproduction Image</option>
                <option value="b13">B13 (Infrared)</option>
                <option value="b03">B03 (Visible)</option>
                <option value="b08">B08 (Water Vapor)</option>
                <option value="b07">B07 (Short Wave Infrared)</option>
                <option value="dms">Day Microphysics RGB</option>
                <option value="ngt">Night Microphysics RGB</option>
                <option value="dst">Dust RGB</option>
                <option value="arm">Airmass RGB</option>
                <option value="dsl">Day Snow-Fog RGB</option>
                <option value="dnc">Natural Color RGB</option>
                <option value="tre">True Color RGB (Enhanced)</option>
                <option value="cve">Day Convective Storm RGB</option>
                <option value="vir">B03 combined with B13</option>
                <option value="irv">B03 and B13 at night</option>
              </select>
            </div>

            <HimawariDetails />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Himawari;
