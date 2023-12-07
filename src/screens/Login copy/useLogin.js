import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { authState } from "./utils/store";
import { signIn } from "./api";

function useLogin() {
  const [credentials, setCredentials] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const setAuth = useSetRecoilState(authState);

  function onSubmit(credentials) {
    setCredentials(credentials);
  }

  useEffect(() => {
    if (!credentials.username || !credentials.password) {
      return;
    }

    async function login() {
      setError(null);
      setLoading(true);
      const response = await signIn(credentials);
      if (response.error) {
        setError(response.error);
      }
      setLoading(false);
      setAuth(
        response.error
          ? null
          : { ...response, profile: response.user.profiles[0] }
      );
    }

    login();
  }, [credentials, setAuth]);

  return { loading, error, onSubmit };
}

export default useLogin;
