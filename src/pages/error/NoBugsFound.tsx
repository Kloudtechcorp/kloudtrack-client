export default function NoBugsOptions() {
    return (
      <div className="items-center justify-center text-center flex flex-col gap-2">
        <div className="flex flex-col notFoundTitle">
          <span className="notFoundDesc">No Bugs Found</span>
        </div>
        <span className="notFoundText">
          No bug reports found in the query.
        </span>
      </div>
    );
  }
  