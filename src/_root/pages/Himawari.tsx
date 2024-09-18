import React, { useEffect, useState, useRef } from "react";
import { timer } from "../../lib/objects/himawariArrays";
import { Slider } from "@/components/ui/slider";

const Himawari = () => {
  const [isCycling, setIsCycling] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState<number[]>([0]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [lastValidImgUrl, setLastValidImgUrl] = useState<string | null>(null);

  const getFormattedDate = () => {
    const today = new Date();
    today.setDate(today.getDate() - 1); // Subtract one day
    return today.toLocaleDateString("en-PH", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

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
    const imgElement = document.getElementById("imgXd") as HTMLImageElement;
    const bandSelect = document.getElementById("band") as HTMLSelectElement;
    const element = bandSelect.value;

    if (imgElement) {
      const imgName =
        "https://www.data.jma.go.jp/mscweb/data/himawari/img/se2/se2_" +
        element +
        "_" +
        timer[index] +
        ".jpg";

      const isValidImage = await checkImageUrl(imgName);

      if (isValidImage) {
        imgElement.src = imgName;
        setLastValidImgUrl(imgName);
      } else if (lastValidImgUrl) {
        imgElement.src = lastValidImgUrl;
      }
    }
  };

  const processImagesWithDelay = async () => {
    if (!isCycling) return;

    await updateImage(currentIndex);

    await delay(500);

    setCurrentIndex((prevIndex) =>
      prevIndex + 1 < timer.length ? prevIndex + 1 : 0
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

  const handleSliderChange = (value: number[]) => {
    if (isCycling) {
      setIsCycling(false);
    }
    setSliderValue(value);
    setCurrentIndex(value[0]);
    updateImage(value[0]);
  };

  const handleBandChange = () => {
    updateImage(currentIndex);
  };

  return (
    <div className="flex mr-12 w-full rounded-2xl dark:bg-secondary bg-white  ">
      <div className="w-full flex flex-row-reverse xs:flex-col-reverse bg-[#F6F8FC] dark:bg-slate-950 rounded-2xl ">
        <div className="py-6 px-8 w-[80%]">
          <div>
            <h2 className="lg:text-3xl xs:text-base font-bold">
              Real-time Satellite View
            </h2>
            <span className="p-1 lg:text-sm xs:text-xs">
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
            <p className="lg:text-sm text-justify indent-8">
              The Himawari satellite series was developed and operated by the
              Japan Meteorological Agency (JMA). Named after the Japanese word
              for "sunflower," the Himawari satellites are geostationary
              meteorological satellites positioned at an altitude of
              approximately 35,786 kilometers above the equator.
            </p>
            <p className="lg:text-sm text-justify indent-8">
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

        <div className="h-full w-full flex flex-col relative">
          <div className="rounded-full p-3 pr-6 bg-white dark:bg-black flex flex-row items-center gap-3 absolute top-5 left-5 w-[70%] text-nowrap">
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
              <div>
                {timer[sliderValue[0]].slice(0, 2) +
                  ":" +
                  timer[sliderValue[0]].slice(2)}{" "}
                {getFormattedDate()} PHT
              </div>
            </div>
          </div>

          <div className="h-full w-full overflow-hidden">
            <img
              id="imgXd"
              alt="Himawari Satellite View"
              className="rounded-2xl h-full aspect-[701/601] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Himawari;
