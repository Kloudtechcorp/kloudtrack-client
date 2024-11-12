export default function NoData() {
  return (
    <div className="items-center justify-center text-center flex flex-col gap-2">
      <div className="flex flex-col bg-[#fbd008] bg-clip-text text-9xl font-semibold leading-none text-transparent">
        <span>404</span>
        <span className="uppercase font-bold text-3xl">No Data Found</span>
      </div>

      <h2 className="font-heading text-xl">
        Data from this station is not available. We're sorry for the
        inconvenience.
      </h2>
    </div>
  );
}
