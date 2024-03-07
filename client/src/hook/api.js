
/*
  Theses will give you an easy way to access the
  backend server. There are 4s to use in this file

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

export default class Api {

  static async Get(route) {
    return await fetch(route)
      .then(resp => resp.json());
  }

  static async GetWithAuth(route, context) {
    // Make the request
    const res = await this.#GetWithToken(route, context.AccessToken())

    // If there is no error in the request return it.
    if (!res.error) {
      return res;
    }

    // Generate a new refresh token
    const tokens = await this.#RefreshToken(context);

    // Try again
    return await this.#GetWithToken(route, tokens.accessToken);
  }

  static async #GetWithToken(route, accessToken) {
    return await fetch(route, {
      method: "get",
      headers: {
        "Content-type": "application/json",
        authorization: accessToken,
      },
    }).then((resp) => resp.json());
  }




  // ------------ POST REQUESTS ---------------

  static async Post(route, body) {
    return await fetch(route, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json())
  }

  static async PostWithAuth(route, body, context) {
    // Try to make the request
    const res = await this.#PostWithToken(route, body, context.AccessToken())
    if (!res.error) return res;
    // Refresh the token
    const tokens = await this.#RefreshToken(context)

    // Try the request again
    return this.#PostWithToken(route, body, tokens.accessToken)
  }

  static async #PostWithToken(route, body, accessToken) {
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
  static async #RefreshToken(context) {
    return await fetch("/token/verify", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        token: context.getTokens().refreshToken,
      }),
    })
      .then((res) => res.json())
      .then(res => {
        const { tokens } = res;
        context.updateTokens(tokens)
        return tokens;
      });
  }
}
