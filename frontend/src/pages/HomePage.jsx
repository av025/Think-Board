import { useState } from "react";
import MainLayout from "../layout/Layout";
import RateLimitedComponent from "../components/RateLimitedComponent/RateLimitedComponent";

function HomePage() {
  const [isRateLimited, setIsRateLimited] = useState(true); 

    return <div className="min-h-screen"> 
       <MainLayout>
         {isRateLimited && <RateLimitedComponent/>}
       </MainLayout>
    </div>
}

export default HomePage; 