import Api from "./api"
async function HireCupid(profileId, cupidId, context) {
    var response = await Api.PostWithAuth(
        "/hireCupid/hire",
        { profileId, cupidId },
        context
    );
    return response;
}
export default HireCupid