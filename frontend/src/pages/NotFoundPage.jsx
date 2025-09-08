import { SquareX } from "lucide-react";
import { Link } from "react-router";

function NotFoundPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8  ">
        <div className="bg-success/10 border border-success/30 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row items-center p-6">
            <div className="flex-shrink-0 bg-success/20 p-4 rounded-full mb-4 md:mb-0 md:mr-6">
              <SquareX className="size-10 text-success" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold mb-2">Page Not Found</h3>
              <p className="text-base-content mb-1">
                Please Return to <Link className="text-primary" to={"/"}>Home Page</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
