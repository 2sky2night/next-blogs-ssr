import { CLIENT_ID } from "@/config";
import {
  GithubFilled as GithubIcon,
  GoogleCircleFilled as GoogleIcon,
  LinkedinOutlined as LinkdinIcon,
} from "@ant-design/icons";
import LoginBtn from "./LoginBtn";
import { memo } from "react";

const ThirdPartyLogin = memo(() => {
  return (
    <>
      <div className="text-xl">You can sign in by</div>
      <div className="space-y-3 mt-3">
        <LoginBtn
          href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=http://localhost:3000/oauth/redirect`}>
          <GithubIcon className="text-3xl mr-1"></GithubIcon>
          Sign in with Github
        </LoginBtn>
        <LoginBtn
          href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=http://localhost:3000/oauth/redirect`}>
          <GoogleIcon className="text-3xl mr-1"></GoogleIcon>
          Sign in with Google
        </LoginBtn>
        <LoginBtn
          href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=http://localhost:3000/oauth/redirect`}>
          <LinkdinIcon className="text-3xl mr-1"></LinkdinIcon>
          Sign in with Linkdin
        </LoginBtn>
      </div>
    </>
  );
});

export default ThirdPartyLogin;
