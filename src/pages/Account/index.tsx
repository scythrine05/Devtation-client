import React, { useCallback } from "react";
import { useParams } from "react-router";
import { useAuth } from "/src/hooks/useAuth";
import { getUserAccount, getProjectsByUserId } from "/src/apis/custom";
import { ProfileData, ProjectRespondData } from "/src/types";
import withDataFetching from "/src/hoc/withDataFetching";
import Grid from "/src/components/Grid";
import { ThemeButton } from "/src/components/Button";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface CombinedData {
  userData: ProfileData;
  projectsData: ProjectRespondData[];
}

interface AccountProps {
  data: CombinedData[];
}
const Account: React.FC<AccountProps> = ({ data }) => {
  const { userData, projectsData } = data[0];
  return (
    <div>
      <div className="flex items-center flex-col md:flex-row md:mx-5 p-10">
        <div>
          <div className="w-32 h-w-32 md:h-40 md:w-40">
            <img
              className="rounded-sm object-cover"
              src="https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100226.jpg?t=st=1726816029~exp=1726819629~hmac=5a5fadd081fb64009141798aaefcc4731c8d136f37395ec48f08693814236d93&w=826"
              alt="author"
            />
          </div>
        </div>
        <div className="font-display md:ml-10 md:mt-0 my-5 text-responsive-regular-lg text-center md:text-left">
          <div className="font-semibold">{userData?.name}</div>
          <div>
            <span className="text-responsive-oauth text-gray-400">
              {userData?.username}
            </span>
          </div>
          <div>
            <span className="text-responsive-oauth text-[var(--color-dark-theme-font)]">
              {userData?.bio}
            </span>
          </div>
        </div>
      </div>
      <hr className="w-11/12 h-px mx-auto my-4 border-0 rounded md:my-10 bg-[var(--color-dark-theme-sub-background-3)]" />
      <div>
        {projectsData && projectsData.length ? (
          <Grid data={projectsData} />
        ) : (
          <div className="w-ful text-responsive-regular-lg font-display flex justify-center items-center flex-col pt-20">
            <div className="mb-5">You have no current projects</div>
            <Link to="/new">
              <ThemeButton>
                <div className="flex justify-between items-center">
                  <FaPlus />
                  <span className="ml-1 hidden lg:inline text-sm">
                    Add project
                  </span>
                </div>
              </ThemeButton>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const NewComponent = withDataFetching<CombinedData>(Account);

const AccountWithData = () => {
  const { identifier } = useParams<{ identifier: string }>();
  const { user } = useAuth();

  const fetchData = useCallback(async () => {
    const userData = await getUserAccount(
      identifier === "youraccount" ? user : null,
      identifier !== "youraccount" ? identifier || null : null
    );

    if (!userData || !userData._id) {
      throw new Error("User not found or no user ID available");
    }

    const userId = userData._id;
    const projectsData = await getProjectsByUserId(user, userId);

    return [{ userData, projectsData }];
  }, [user, identifier]);

  return <NewComponent fetchData={fetchData} />;
};

export default AccountWithData;
