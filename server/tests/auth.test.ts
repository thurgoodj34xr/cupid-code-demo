import { describe, expect, it } from "vitest";
import StandardUser from "./standard_user";

describe("auth", () => {
    it("Should login to the server", async () => {
        const { agent, user, token } = await StandardUser();
        expect(user).toBeDefined();
        expect(token).toBeDefined();
    })

    it("should get the current user", async () => {
        const { agent, user, token } = await StandardUser();
        const res = await agent.post("/token/").send({ token });
        const currentUser = await res.body;
        expect(currentUser).toBeDefined();
    })
})