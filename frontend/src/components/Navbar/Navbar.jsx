import { PlusIcon } from "lucide-react";
import { Link } from "react-router";

function Navbar() {
    return <header className="bg-base-300 border-b border-base-content/10">
        <div className="mx-auto max-w-6xl p-4">
            <div className="flex items-center justify-between">
                 <h1 className="text-3xl font-bold text-success font-mono tracking-tight">
                    Think Board
                 </h1>
                 <div className="flex items-center gap-4 btn-circle">
                    <Link className="btn btn-success" to={"/create"}>
                         <PlusIcon className="size-5" />
                         <span>New Note</span>                   
                    </Link>
                 </div>
            </div>
        </div>
    </header>
}

export default Navbar; 