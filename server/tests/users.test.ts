import { describe, expect, it } from "vitest";
import StandardUser from "./standard_user";

describe("users", () => {
    it("Should get the current user by id", async () => {
        const { agent, user, token } = await StandardUser();
        const res = await agent.get(`/users/${user.user.id}`);
        const body = await res.body;
        expect(body.user).toBeDefined();
    })
})