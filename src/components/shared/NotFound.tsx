import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const router = useNavigate();

  return (
    <div className="items-center justify-center text-center ">
      <div className="flex flex-col notFoundTitle">
        <span>404</span>
        <span className="notFoundDesc">No Data Found</span>
      </div>
      <span className="notFoundText">
        Sorry, the page you are looking for doesn&apos;t exist or has been
        moved.
      </span>
      <div className="mt-8 flex justify-center gap-2">
        <Button
          onClick={() => router(-1)}
          variant="default"
          size="lg"
          className="dark:bg-white"
        >
          Go back
        </Button>
        <Button onClick={() => router("/dashboard")} variant="ghost" size="lg">
          Back to Home
        </Button>
      </div>
    </div>
  );
}
