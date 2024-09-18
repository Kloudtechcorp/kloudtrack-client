import { Input } from "@/components/ui/input";
import { dataProps } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const Test = () => {
  const [data, setData] = useState();
  const server = "http://localhost:8000";
  const socket = io(`${server}`);
  useEffect(() => {
    socket.emit("stations", "hehehe");

    socket.on("hello", (world) => {
      console.log(world);
    });
    socket.on("jeysistation", (initialNotifications) => {
      console.log(initialNotifications);
    });
    // socket.on("test5", (initialNotifications) => {
    //   console.log(initialNotifications);
    // });
    socket.emit("test", { message: "hahaha" });
  }, [data]);
  return <div className="w-full h-full">{data && <h1>{data}</h1>}</div>;
};

export default Test;
