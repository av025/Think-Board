import { useEffect, useState } from "react";
import MainLayout from "../layout/Layout";
import toast from "react-hot-toast";
import RateLimitedComponent from "../components/RateLimitedComponent/RateLimitedComponent";
import axiosInstance from "../helpers/axiosInstances";
import Loader from "../components/Loader/Loader";
import NotesComponent from "../components/NotesComponent/NotesComponent";

function HomePage() {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllNotes = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/notes");
      setNotes(response?.data);
      setIsRateLimited(false);
      setLoading(false);
    } catch (error) {
      setLoading(true);
      console.error(error.message);
      if (error?.response?.status === 429) {
        setIsRateLimited(true);
      } else {
        toast.error("Failed To Fetch Notes");
      }
    }
  };

  useEffect(() => {
    fetchAllNotes();
  }, []);

  return (
    <div className="min-h-screen">
        {isRateLimited && <RateLimitedComponent />}
        {loading && <Loader />}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-4 p-2">
            {notes.map((note) => {
              return (
                <NotesComponent
                  key={note._id}
                  id={note._id}
                  title={note.title}
                  content={note.content}
                  createdAt = {note.createdAt}
                />
              );
            })}
          </div>
        )}
    </div>
  );
}

export default HomePage;
