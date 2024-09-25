import React, { useEffect, useState, useRef } from "react";
import { timer } from "../../lib/objects/himawariArrays";
import { Slider } from "@/components/ui/slider";

const Himawari = () => {
  const [isCycling, setIsCycling] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState<number[]>([0]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [lastValidImgUrl, setLastValidImgUrl] = useState<string | null>(null);
  const [imageElement, setImageElement] = useState<string>(
    "https://www.data.jma.go.jp/mscweb/data/himawari/img/se2/se2_snd_0000.jpg"
  );
  const [bandSelect, setBandSelect] = useState<string>("snd");

  const convertUTCtoLocal = (
    utcHour: number,
    utcMinute: number
  ): { hour: number; minute: number } => {
    const localDate = new Date(Date.UTC(1970, 0, 1, utcHour, utcMinute));
    localDate.setHours(localDate.getHours() + 8); // Adjust for GMT+8
    return { hour: localDate.getUTCHours(), minute: localDate.getUTCMinutes() };
  };

  const convertLocaltoUTC = (
    localHour: number,
    localMinute: number
  ): { hour: number; minute: number } => {
    const utcDate = new Date(Date.UTC(1970, 0, 1, localHour - 8, localMinute));
    return { hour: utcDate.getUTCHours(), minute: utcDate.getUTCMinutes() };
  };

  const getNearestTimeIndex = (hours: number, minutes: number): number => {
    const { hour: localHour, minute: localMinute } = convertLocaltoUTC(
      hours,
      minutes
    );
    const roundedMinutes = Math.floor(localMinute / 10) * 10;
    const formattedTime = `${localHour
      .toString()
      .padStart(2, "0")}${roundedMinutes.toString().padStart(2, "0")}`;
    return timer.indexOf(formattedTime);
  };

  const generateDynamicTimerArray = (): string[] => {
    const now = new Date();
    const currentHours = now.getUTCHours();
    const currentMinutes = now.getUTCMinutes();

    const nearestTimeIndex = getNearestTimeIndex(currentHours, currentMinutes);
    const startTimeIndex = nearestTimeIndex % timer.length;

    return [
      ...timer.slice(startTimeIndex),
      ...timer.slice(0, nearestTimeIndex + 1),
    ];
  };

  const [dynamicTimerArray, setDynamicTimerArray] = useState<string[]>([]);

  const delay = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const checkImageUrl = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  };

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

      console.log("image name is ", imgName);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  function getFormattedDate(passedTime: string): string {
    const now = new Date();

    const roundDownToNearest10Minutes = (date: Date): Date => {
      const minutes = date.getMinutes();
      const roundedMinutes = Math.floor(minutes / 10) * 10;
      const roundedDate = new Date(date);
      roundedDate.setMinutes(roundedMinutes);
      return roundedDate;
    };

    const roundedNow = roundDownToNearest10Minutes(now);

    const [passedHours, passedMinutes] = passedTime.split(":").map(Number);
    const passedDate = new Date(now);
    passedDate.setHours(passedHours);
    passedDate.setMinutes(passedMinutes);

    if (passedDate > roundedNow) {
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      passedDate.setDate(yesterday.getDate());
    }

    const formattedDate = passedDate.toLocaleString("en-PH", {
      timeZone: "Asia/Manila",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  }

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
              className="bg-blue-500 size-10 p-2 rounded-full"
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
              id="imgXd"
              src={imageElement}
              alt="Himawari Satellite View"
              className="rounded-2xl h-full aspect-[701/601] object-cover"
            />
          </div>
        </div>

        <div className="py-6 px-8 w-3/4 sm:w-full ">
          <div>
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
                  {" "}
                  Real Time Imagery Website
                </a>
                .
              </p>
            </span>
          </div>

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

          <div className="p-2 py-20 lg:text-l xs:text-xs text-gray-500 self-end">
            <span className="font-bold">About Himawari 8/9</span>
            <p className="lg:text-sm text-justify indent-8 sm:text-xs">
              The Himawari satellite series was developed and operated by the
              Japan Meteorological Agency (JMA). Named after the Japanese word
              for "sunflower," the Himawari satellites are geostationary
              meteorological satellites positioned at an altitude of
              approximately 35,786 kilometers above the equator.
            </p>
            <p className="lg:text-sm text-justify indent-8 sm:text-xs">
              The latest in the series, Himawari-8 and Himawari-9, launched in
              2014 and 2016 respectively. They provide data every 10 minutes,
              enabling real-time monitoring of weather phenomena such as
              typhoons, thunderstorms, and heavy rainfall. The satellites are
              equipped with a 16-band multispectral imager, which captures
              detailed images in visible, near-infrared, and infrared
              wavelengths, providing critical information for weather prediction
              models, disaster management, and climate research.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Himawari;
