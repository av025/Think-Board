import { useEffect, useState } from "react";
import MainLayout from "../layout/Layout";
import toast from "react-hot-toast";
import RateLimitedComponent from "../components/RateLimitedComponent/RateLimitedComponent";
import Loader from "../components/Loader/Loader";
import NotesComponent from "../components/NotesComponent/NotesComponent";
import API from "../helpers/axiosInstances";
import NotesNotFound from "../components/NotesNotFound/NotesNotFound";

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
      <MainLayout>
        { notes.length === 0 && !isRateLimited && <NotesNotFound/>}
        {isRateLimited && <RateLimitedComponent />}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-4 p-2">
            {notes.map((note) => {
              return (
                <NotesComponent
                  key={note._id}
                  id={note._id}
                  title={note.title}
                  content={note.content}
                  createdAt={note.createdAt}
                  setNotes={setNotes}
                />
              );
            })}
          </div>
        )}
      </MainLayout>
    </div>
  );
}

export default HomePage;
