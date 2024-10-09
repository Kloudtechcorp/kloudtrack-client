import { useNavigate } from "react-router-dom";

export default function NoData() {
  return (
    <div className="absolute items-center justify-center text-center flex flex-col gap-5">
      <span className="bg-gradient-to-b from-[#fbd008] to-bg-transparent bg-clip-text text-[10rem] font-extrabold leading-none text-transparent">
        No Data Found
      </span>
      <h2 className="font-heading my-2 text-2xl font-bold">
        Data from this station is not available. We're sorry for inconvenience.
      </h2>
    </div>
  );
}
