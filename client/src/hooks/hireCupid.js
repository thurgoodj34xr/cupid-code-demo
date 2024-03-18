import Api from "./api"
async function HireCupid(cupid, context,) {
    var response = await Api.PostWithAuth(
        "/profile/hireCupid",
        { cupid: cupid },
        context
    );
    return response;
}
export default HireCupid