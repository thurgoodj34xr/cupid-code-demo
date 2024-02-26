
/*
  These functions will give you an easy way to access the
  backend server. There are 4 functions to use in this file

  ****************** GET REQUESTS ******************

  Get(route)
    ** Ex: Api.Get("/number");
 
  GetWithAuth(route, context)
    ** Ex: Api.GetWithAuth("/number", context);

  ******************* POST REQUESTS ***************
  
  Post(route, body)
  ** Ex: Api.Post("/number", {inc: 5});

  PostWithAuth(route, body, context)
    ** Ex: Api.PostWithAuth("/number", {inc: 5}, context);



  NOTE: If the server responds with access denied, then
        most likey the endpoint does not exist on the server.
*/  




// ------------- GET REQUESTS ------------------

export async function Get(route) {
  return await fetch(route)
  .then(resp => resp.json());
}

export async function GetWithAuth(route, context) {
  // Make the request
  const res = await GetWithToken(route, context.AccessToken())

  // If there is no error in the request return it.
  if (!res.error) {
    return res;
  }

  // Generate a new refresh token
  const tokens = await RefreshToken(context);

  // Try again
  return await GetWithToken(route, tokens.accessToken);
}

async function GetWithToken(route, accessToken) {
  return await fetch(route, {
    method: "get",
    headers: {
      "Content-type": "application/json",
      authorization: accessToken,
    },
  }).then((resp) => resp.json());
}




// ------------ POST REQUESTS ---------------



export async function Post(route, body) {
  return await fetch(route, {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((resp) => resp.json())
}

export async function PostWithAuth(route, body, context) {
  // Try to make the request
  const res = await PostWithToken(route, body, context.AccessToken())
  if (!res.error) return res;

  // Refresh the token
  const tokens = await RefreshToken(context)

  // Try the request again
  return PostWithToken(route, body, tokens.accessToken)
}

async function PostWithToken(route, body, accessToken) {
  return await fetch(route, {
    method: "post",
    headers: {
      "Content-type": "application/json",
      authorization: accessToken,
    },
    body: JSON.stringify(body)
  }).then((resp => resp.json()));
}


// Used to generate a new Refresh Token
async function RefreshToken(context) {
  return await fetch("/refreshToken", {
     method: "post",
     headers: {
       "Content-type": "application/json",
     },
     body: JSON.stringify({
       user: context.getUser(),
       refreshToken: context.getTokens().refreshToken,
     }),
   })
   .then((res) => res.json())
   .then(res => {
      const {tokens} = res;
      context.updateTokens(tokens)
      return tokens;
   });
 }
