import React, { useCallback } from "react";
import { ProjectRespondData } from "/src/types";
import { Link, useParams } from "react-router-dom";
import { getProjectById, isProjectHypedByUser } from "/src/apis/custom";
import withDataFetching from "/src/hoc/withDataFetching";
import { useAuth } from "/src/hooks/useAuth";

import { FlowBiteCarousel } from "/src/components/Carousel";
import HypeButton from "/src/components/Button/HypeButton";

// Icons
import { RiExternalLinkLine } from "react-icons/ri";
import { AiOutlineTag } from "react-icons/ai";

import "./view.style.css";

type CombinedData = {
  projectData: ProjectRespondData;
  isHype: boolean;
};

interface ViewProps {
  data: CombinedData[];
}

const View: React.FC<ViewProps> = ({ data }) => {
  const { projectData, isHype } = data[0];
  const defaultProfileImage =
    "https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100226.jpg?t=st=1726816029~exp=1726819629~hmac=5a5fadd081fb64009141798aaefcc4731c8d136f37395ec48f08693814236d93&w=826";

  if (!projectData) {
    throw new Error("User not found or no user ID available");
  }

  return (
    <div className="p-1 sm:p-5 flex flex-col min-h-screen bg-[var(--color-dark-theme-background)]">
      <div className="p-2 sm:p-10 bg-[var(--color-dark-theme-sub-background-2)]">
        <div className="flex items-center my-5">
          <Link
            to={`/account/${projectData.authorUsername}`}
            className="flex items-center hover:text-[var(--color-devtiny-theme-light)] text-white"
          >
            <div className="w-10 h-10">
              <img
                className="rounded-sm w-full object-cover"
                src={
                  projectData.authorProfileImage
                    ? projectData.authorProfileImage
                    : defaultProfileImage
                }
                alt="author"
              />
            </div>
            <div className="font-normal text-responsive-sm mx-2">
              {projectData.authorUsername}
            </div>
          </Link>
        </div>
        <div>
          <FlowBiteCarousel
            images={projectData.imageUrls}
            className="2xl:w-1/2 xl:w-2/4 lg:w-2/3 md:w-3/4 sm:aspect-video w-full aspect-square my-4"
          />
        </div>
        <div className="mb-10 md:w-3/4 w-full">
          <h1 className="block text-responsive-medium w-full p-1.5 px-2">
            {projectData.title}
          </h1>
        </div>
        <div className="flex flex-col">
          <div className="mt-5">
            <HypeButton
              projectId={projectData._id}
              initialHasHyped={isHype}
              hypeCount={projectData.hypeCount}
            />
          </div>
          <div className="my-5">
            <ul className="mt-2 flex flex-wrap items-center">
              {projectData.links.map((link, index) => (
                <li
                  key={index}
                  className="mt-2 p-3 mr-2 flex items-center bg-[var(--color-dark-theme-sub-background-3)] rounded text-responsive-sm text-[var(--color-white-2)]"
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-blue-300 flex items-center"
                  >
                    <span className="mr-1">
                      <RiExternalLinkLine size={18} />
                    </span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-2 flex flex-wrap">
            {projectData.tags.map((item, index) => (
              <div
                key={index}
                className="mt-2 flex items-center bg-[var(--color-dark-theme-sub-background-3)] rounded p-1 mr-2 text-responsive-sm text-var(--color-white-2)"
              >
                <span className="mr-1">
                  <AiOutlineTag />
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-24">
          <div dangerouslySetInnerHTML={{ __html: projectData.description }} />
        </div>
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
      const projectData = await getProjectById(id);
      const isHype = await isProjectHypedByUser(id, user.uid);
      return [{ projectData, isHype }];
    }
    return [];
  }, [user, id]);

  return <NewComponent fetchData={fetchData} />;
};

export default ViewWithData;
