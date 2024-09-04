import Button from "/src/components/Button";

import { signInWithGoogle, signInWithGitHub } from "/src/apis/firebase";

interface OauthProps {
  authType: string;
}

const Oauth: React.FC<OauthProps> = ({ authType }) => {
  return (
    <div>
      <div>
        <Button
          onClick={() => signInWithGoogle().catch((err) => console.error(err))}
        >
          {authType === "signin" ? "Continue with" : "Sign up with"} Google
        </Button>
      </div>
      <div>
        <Button
          onClick={() => signInWithGitHub().catch((err) => console.error(err))}
        >
          {authType === "signin" ? "Continue with" : "Sign up with"} Github
        </Button>
      </div>
    </div>
  );
};

export default Oauth;
