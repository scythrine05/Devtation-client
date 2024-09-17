import React, { useCallback } from "react";
import { ProjectData } from "/src/types"; // Assuming you have the types defined
import { useParams } from "react-router-dom";
import { getProjectById, isProjectHypedByUser } from "/src/apis/custom";
import withDataFetching from "/src/hoc/withDataFetching";
import { useAuth } from "/src/hooks/useAuth";

import HypeButton from "/src/components/Button/HypeButton";

import "./view.style.css";

type CombinedData = {
  projectData: ProjectData;
  isHype: boolean;
};

interface ViewProps {
  data: CombinedData[];
}

const View: React.FC<ViewProps> = ({ data }) => {
  const { projectData, isHype } = data[0];

  if (!projectData) {
    throw new Error("User not found or no user ID available");
  }

  return (
    <div className="view-wrapper">
      <div className="view-container">
        {/* <div className="view-display">
          {projectData.images && projectData.images.length > 0 ? (
            <img src={URL.createObjectURL(projectData.images[0])} alt={projectData.title} />
          ) : (
            "No Image"
          )}
        </div> */}
        <div className="view-title">{projectData.title}</div>
        <div className="view-options">
          <HypeButton
            projectId={projectData._id}
            initialHasHyped={isHype}
            hypeCount={projectData.hypeCount}
          />
          <div className="view-update">Last update</div>
          <div className="view-tags">
            {projectData.tags?.map((tag, index) => (
              <span key={index} className="view-tag">
                {tag}
              </span>
            ))}
          </div>
          <div className="view-author">{projectData.authorUsername}</div>
        </div>
        <div
          className="view-desc"
          dangerouslySetInnerHTML={{ __html: projectData.description }}
        />
      </div>
    </div>
  );
};

const NewComponent = withDataFetching<CombinedData>(View);

const ViewWithData = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const fetchData = useCallback(async () => {
    if (user && id) {
      const projectData = await getProjectById(user, id);
      const isHype = await isProjectHypedByUser(id, user.uid);
      return [{ projectData, isHype }];
    }
    return [];
  }, [user, id]);

  return <NewComponent fetchData={fetchData} />;
};

export default ViewWithData;
