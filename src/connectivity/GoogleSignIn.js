// GoogleSignIn.js

import React, { useState, useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import { makeRedirectUri } from "expo-auth-session";

export default function GoogleSignIn() {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "718706451340-c548miano4iak3eo17hbd60252jldncn.apps.googleusercontent.com",
    androidClientId:
      "718706451340-45c16kgb2874v5df0lkcfj4und07815d.apps.googleusercontent.com",
    key: "AIzaSyDHWMYbsGFKotQTGjVZFaVeUNHaoDOZQHw",
    redirectUri:makeRedirectUri()
  });
  const signInWithGoogle = async () => {
    await promptAsync();
  };
  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      setToken(authentication?.accessToken);
    }
  }, [response]);

  const getUserInfo = async () => {
    const res = await fetch(
      "https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + token
    );
    const response = await res.json();
    setUserData(response);
    return response;
  };

  return {
    userData,
    token,
    signInWithGoogle,
    getUserInfo,
  };
}
