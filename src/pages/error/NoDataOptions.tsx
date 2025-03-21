export default function NoDataOptions() {
  return (
    <div className="items-center justify-center text-center flex flex-col gap-2">
      <div className="flex flex-col notFoundTitle">
        <span>404</span>
        <span className="notFoundDesc">No Data Found</span>
      </div>

      <span className="notFoundText">
        Data could not be found. We're sorry for the inconvenience.
      </span>
    </div>
  );
}
