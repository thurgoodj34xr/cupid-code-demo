export async function Get(route, context) {
  const user = context.getUser();

  // Make the request
  const res = await GetRequest(route, context.getTokens().accessToken)

  // If there is no error in the request return it.
  if (!res.error) {
    return res;
  }

  // Generate a new refresh token
  const token = await RefreshToken(context, user);
  context.updateAccessToken(token.accessToken)

  // Try again
  return await GetRequest(route, token.accessToken);
}

async function GetRequest(route, accessToken) {
  return await fetch(route, {
    method: "get",
    headers: {
      "Content-type": "application/json",
      authorization: accessToken,
    },
  }).then((resp) => resp.json());
}

async function RefreshToken(context, user) {
 return await fetch("/refreshToken", {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      user,
      refreshToken: context.getTokens().refreshToken,
    }),
  }).then((res) => res.json());
}

