import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "/src/hooks/useAuth";
import EditorComponent from "/src/components/Editor";
import { getProjectById } from "/src/apis/custom";
import ErrorComponent from "/src/components/Error";
import LoadingComponent from "/src/components/Loading";

export default function Editor() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState(null);
  const [isAuthor, setIsAuthor] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const data = await getProjectById(user, id);
        if (data.authorId !== user?.uid) {
          setIsAuthor(false);
          navigate("/");
        } else {
          console.log(data);
          setProjectData(data);
        }
      } catch (err) {
        console.error("Error fetching project:", err);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, user, navigate]);

  if (!isAuthor)
    return (
      <div>
        <ErrorComponent error="Editing permission denied" />
      </div>
    );
  if (loading)
    return (
      <div>
        <LoadingComponent />
      </div>
    );

  return <EditorComponent existingData={projectData} />;
}
