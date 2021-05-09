import { useRouter } from "next/router";
import { AppState } from "@redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "@services/firebase";

function getAuthUser() {
  const authUser = useSelector((state: AppState) => state.authReducer.authUser);
  return authUser;
}

const withAuth = (WrappedComponent) => {
  const authUser = getAuthUser();
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const Router = useRouter();
      const current = auth.getCurrentuser();
      console.log(current);
      // If there is no access token we redirect to "/" page.
      if (!authUser) {
        Router.replace("/");
        return null;
      }

      // If this is an accessToken we just render the component that was passed with all its props

      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default withAuth;
