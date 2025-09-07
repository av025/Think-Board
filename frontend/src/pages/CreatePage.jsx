import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import RateLimitedComponent from "../components/RateLimitedComponent/RateLimitedComponent";
import API from "../helpers/axiosInstances";

function CreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const navigate = useNavigate();

  const createNotes = async () => {
    try {
      setLoading(true);
      await API.post("/notes", { title, content });
      toast.success("Note Successfully Created");
      navigate("/");
    } catch (error) {
      console.error("Error While Posting Notes ", error.message);
      if (error?.response?.status === 429) {
        setIsRateLimited(true);
      } else {
        toast.error("Failed to Create Note");
      }
    } finally {
      setLoading(false);
    }
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("All Fields are Required");
      return;
    }
    createNotes();
  }

  return (
    <div className="min-h-screen bg-base-200">
      {isRateLimited && <RateLimitedComponent />}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="btn btn-ghost mb-6 rounded-lg">
            <ArrowLeftIcon /> Back To Notes
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleFormSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text text-lg">Title</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    placeholder="Note Text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text text-lg">Content</span>
                  </label>
                  <textarea
                    className="input input-bordered h-32"
                    placeholder="Write Your Note here ..."
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;
