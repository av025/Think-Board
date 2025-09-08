import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { dateFormat } from "../../helpers/utils";
import API from "../../helpers/axiosInstances";
import RateLimitedComponent from "../RateLimitedComponent/RateLimitedComponent";
import toast from "react-hot-toast";

function NotesComponent({ title, content, id, createdAt, setNotes }) {
  const deleteNotes = async (event, id) => {
    event.preventDefault();
    if (!window.confirm("Are you sure you want to delete this note ?")) return;

    try {
      await API.delete(`/notes/${id}`);
      toast.success("Note Deleted Successfully");
      setNotes((prev) => prev.filter(note => note._id !== id) )

    } catch (error) {
      console.error("Error while Deleting the Notes", error.message);
      if (error?.response?.status === 429) {
        <RateLimitedComponent />;
      } else {
        toast.error("Getting Error while Deleting Notes");
      }
    }
  };

  return (
    <Link
      to={`./note/${id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D] "
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{title}</h3>
        <p className="text-base-content/70 line-clamp-3">{content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {dateFormat(new Date(createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => deleteNotes(e, id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default NotesComponent;
