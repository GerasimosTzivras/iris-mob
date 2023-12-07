async function getUser({ token }) {
  try {
    const response = await fetch(`http://localhost:5000/auth/api/user/info`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) throw new Error(`${json.title}`);
    return json;
  } catch (err) {
    console.debug(err);
    return { error: err.message };
  }
}

export async function signIn({ username, password }) {
  try {
    const params = new URLSearchParams();
    params.set("client_id", "iris.client");
    params.set("client_secret", "21B5F798-BE55-42BC-8AA8-0025B903DC3B");
    params.set("grant_type", "password");
    params.set("username", username);
    params.set("password", password);
    params.set("scope", "iris_api ddr_api auth_api iris.identity");

    const response = await fetch(`http://localhost:5000/auth/connect/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const json = await response.json();
    if (!response.ok)
      throw new Error(`${response.status} ${response.statusText}`);

    const user = await getUser({ token: json.access_token });
    if (user.error) throw new Error(user.error);

    return {
      token: json.access_token,
      expires: new Date(Date.now() + json.expires_in * 1000),
      user: user,
    };
  } catch (err) {
    console.debug({ err });
    return { error: err.message };
  }
}
