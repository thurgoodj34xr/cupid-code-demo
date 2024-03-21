import Api from "./api";

async function FireCupid(profileId, context) {
    // Fire the cupid by sending a POST request to the server
    return await Api.PostWithAuth(
        "/hireCupid/fire",
        { profileId },
        context
    );

}

export default FireCupid;