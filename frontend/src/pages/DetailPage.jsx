import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import API from "../helpers/axiosInstances";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

function DetailPage() {
  const [note, setNote] = useState(null);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchNoteById = async () => {
    setLoading(true);
    try {
      const response = await API.get(`/notes/${id}`);
      setNote(response?.data?.data);
      setIsRateLimited(false);
      setLoading(false);
      toast.success("Note Successfully Fetched !!!");
    } catch (error) {
      console.error("Error While Fetch Note", error.message);
      if (error.response.status === 429) {
        setIsRateLimited(true);
      } else {
        toast.error("Error While Fetching Note");
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteNotes = async ( id) => {
    if (!window.confirm("Are you sure you want to delete this note ?")) return;

    try {
      await API.delete(`/notes/${id}`);
      toast.success("Note Deleted Successfully");
      navigate("/");
    } catch (error) {
      console.error("Error while Deleting the Notes", error.message);
      if (error?.response?.status === 429) {
        isRateLimited(true);
      } else {
        toast.error("Getting Error while Deleting Notes");
      }
    }
  }; 

  const updateNotes = async () => {
    if(!note.title.trim() && !note.content.trim()) {
        toast.error("All Fields are Required");
        return
    }
       setSaving(true)
    try { 
       await API.put(`/notes/${id}`,note);
       toast.success("Note Updated Successfully");
       setSaving(false)
        
    } catch (error) { 
        console.error("Error While Updating Note", error.message); 
        setSaving(false)
        if(error.response.status === 429) {

        }else {
            toast.error("Error While Updating Note")
        }
    }
  }

  useEffect(() => {
    fetchNoteById();
  }, [id]);

  if (loading) {
    return (
      <div className=" min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-top justify-center">
      <div className="container mx-auto mt-20">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to={"/"} className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button onClick={() => deleteNotes(id)} className="btn btn-error btn-outline">
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>
          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note Title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(event) =>
                    setNote({ ...note, title: event.target.value })
                  }
                />
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text text-lg">Content</span>
                  </label>
                  <textarea
                    className="input input-bordered h-32"
                    value={note.content}
                    onChange={(event) =>
                      setNote({ ...note, content: event.target.value })
                    }
                  />
                  </div>
                  <div className="card-actions justify-end">
                    <button className="btn btn-success" disabled={saving} onClick={updateNotes}>
                       {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
