export default function NoData() {
  return (
    <div className="items-center justify-center text-center flex flex-col gap-5">
      <div className="flex flex-col bg-gradient-to-b from-[#fbd008] to-bg-transparent bg-clip-text text-[7rem] font-extrabold leading-none text-transparent">
        <span>404</span>
        <span className="">No Data Found</span>
      </div>

      <h2 className="font-heading my-2 text-2xl font-bold">
        Data from this station is not available. We're sorry for the
        inconvenience.
      </h2>
    </div>
  );
}
