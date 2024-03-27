export async function retrieveGeo() {
    const resp = await fetch('https://ipgeolocation.abstractapi.com/v1/?api_key=e9ae5693beb149989cff47c302691109')
    const body = await resp.json()
    return body;
};
