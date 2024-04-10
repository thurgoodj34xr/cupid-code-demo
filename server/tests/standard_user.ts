import server from "../../index"
import request from "supertest";

const StandardUser = async () => {
    const agent = request.agent(server.app);
    const res = await agent.post("/users/session").send({
        email: "user@gmail.com",
        password: "user"
    })

    const user = await res.body;

    const token = user.tokens.accessToken;

    agent.set("Authorization", token)

    return { agent, user, token }
}

export default StandardUser;