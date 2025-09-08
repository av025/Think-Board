import { useEffect, useState } from "react";
import MainLayout from "../layout/Layout";
import toast from "react-hot-toast";
import RateLimitedComponent from "../components/RateLimitedComponent/RateLimitedComponent";
import NotesComponent from "../components/NotesComponent/NotesComponent";
import API from "../helpers/axiosInstances";
import NotesNotFound from "../components/NotesNotFound/NotesNotFound";
import Loader from "../components/Loader/Loader";

function HomePage() {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllNotes = async () => {
    try {
      setLoading(true);
      const response = await API.get("/notes");
      setNotes(response?.data);
      setIsRateLimited(false);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      if (error?.response?.status === 429) {
        setIsRateLimited(true);
      } else {
        toast.error("Failed To Fetch Notes");
      }
    } finally {
      setLoading(false);
    }
  };

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
       isRateLimited(true)
      } else {
        toast.error("Getting Error while Deleting Notes");
      }
    }
  };

  useEffect(() => {
    fetchAllNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <MainLayout>
        {isRateLimited ? (
          <RateLimitedComponent />
        ) : loading ? (
          <Loader />
        ) : notes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-4 p-2">
            {notes.map((note) => (
              <NotesComponent
                key={note._id}
                id={note._id}
                title={note.title}
                content={note.content}
                createdAt={note.createdAt}
                deleteNotes={deleteNotes}
              />
            ))}
          </div>
        ) : (
          <NotesNotFound />
        )}
      </MainLayout>
    </div>
  );
}

export default HomePage;
