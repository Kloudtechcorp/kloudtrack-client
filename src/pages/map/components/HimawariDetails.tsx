import React from "react";

const HimawariDetails = () => {
  return (
    <div className="lg:text-lg  text-xs text-gray-500  gap-2 ">
      <span className="font-bold">About Himawari 8/9</span>
      <p className="lg:text-sm text-justify indent-8 sm:text-xs">
        The Himawari satellite series was developed and operated by the Japan
        Meteorological Agency (JMA). Named after the Japanese word for
        "sunflower," the Himawari satellites are geostationary meteorological
        satellites positioned at an altitude of approximately 35,786 kilometers
        above the equator.
      </p>
      <p className="lg:text-sm text-justify indent-8 text-xs">
        The latest in the series, Himawari-8 and Himawari-9, launched in 2014
        and 2016 respectively. They provide data every 10 minutes, enabling
        real-time monitoring of weather phenomena such as typhoons,
        thunderstorms, and heavy rainfall. The satellites are equipped with a
        16-band multispectral imager, which captures detailed images in visible,
        near-infrared, and infrared wavelengths, providing critical information
        for weather prediction models, disaster management, and climate
        research.
      </p>
    </div>
  );
};

export default HimawariDetails;
