export default function NoData() {
  return (
    <div className="items-center justify-center text-center flex flex-col gap-2">
      <div className="flex flex-col notFoundTitle">
        <span>404</span>
        <span className="notFoundDesc">No Data Found</span>
      </div>

      <span className="notFoundText">
        Data from this station is not available. We're sorry for the
        inconvenience.
      </span>
    </div>
  );
}
