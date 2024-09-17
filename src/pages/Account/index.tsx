import React, { useCallback } from "react";
import { useParams } from "react-router";
import { useAuth } from "/src/hooks/useAuth";
import { getUserAccount, getProjectsByUserId } from "/src/apis/custom";
import { ProfileData, ProjectData } from "/src/types";
import withDataFetching from "/src/hoc/withDataFetching";
import Grid from "/src/components/Grid";

interface CombinedData {
  userData: ProfileData;
  projectsData: ProjectData[];
}

interface AccountProps {
  data: CombinedData[];
}
const Account: React.FC<AccountProps> = ({ data }) => {
  const { userData, projectsData } = data[0];
  return (
    <div>
      <div>
        <div>
          <img src="#" />
        </div>
        <div>
          <div>{userData?.username}</div>
          <div>{userData?.name}</div>
          <div>{userData?.bio}</div>
        </div>
      </div>
      <div>
        {projectsData && projectsData.length ? (
          <Grid data={projectsData} />
        ) : (
          <span>No Projects</span>
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
