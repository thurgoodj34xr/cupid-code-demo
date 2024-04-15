import server from "../../index"
import request from "supertest";

const CupidUser = async () => {
    const agent = request.agent(server.app);
    const res = await agent.post("/users/session").send({
        email: "cupid@gmail.com",
        password: "cupid"
    })

    const user = await res.body;

    const token = user.tokens.accessToken;

    agent.set("Authorization", token)

    return { agent, user, token }
}

export default CupidUser;