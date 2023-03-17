import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {ReactFacebookLoginInfo} from "react-facebook-login";
import {useAppDispatch} from "../../app/hooks";
import {facebookLogin} from "../../feauters/users/usersThunks";
import {Button} from "@mui/material";

const FacebookLoginButton = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const handleFacebookResponse = (response: ReactFacebookLoginInfo) => {
    setLoading(false);

    if (response.accessToken) {
      const { accessToken, userID } = response;
      dispatch(facebookLogin({accessToken, userID}));
    } else {
      console.log("Login failed");
    }
  };

  const handleButtonClick = () => {
    setLoading(true);
  };

  return (
    <FacebookLogin
      appId="181375241315657"
      fields="name,email,picture"
      scope="public_profile,email"
      callback={handleFacebookResponse}
      render={({ onClick }) => (
        <Button
          sx={{background: "#1771ed"}}
          onClick={() => { handleButtonClick(); onClick(); }}
          disabled={loading}>
          {loading ? 'Loading...' : 'Login with Facebook'}
        </Button>
      )}
    />
  );
};

export default FacebookLoginButton;
