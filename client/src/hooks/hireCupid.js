import Api from "./api"
async function HireCupid(cupid, context,) {
    var response = await Api.PostWithAuth(
        "/profile/hireCupid",
        { cupid: cupid },
        context
    );
    console.log(response)
    return response;
}
export default HireCupid