import Api from "./api";

const TerminateCupid = async (profileId, context) => {
    // Fire the cupid by sending a POST request to the server
    return await Api.PostWithAuth(
        "/cupids/terminate",
        { cupidId: profileId, terminate: true },
        context
    );

}

export default TerminateCupid;