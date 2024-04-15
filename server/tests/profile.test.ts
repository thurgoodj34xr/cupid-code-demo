import { beforeAll, describe, expect, it } from "vitest";
import StandardUser from "./standard_user";

let agent: any;

describe("users", () => {
    beforeAll(async () => {
        // Create the StandardUser once before all tests
        const standardUser = await StandardUser();
        agent = standardUser.agent;
    });

    it('should allow user add cash to profile', async () => {
        const res = await agent.post("/profile/cash")
            .send({
                changeAmount: 100
            });
        console.log(res.body)
        expect(res.status).toBe(200);
        expect(res.body.newBalance).toBe(125)

    });

    it('should allow user to spend cash', async () => {
        const res = await agent.post("/profile/cash")
            .send({
                changeAmount: -100
            });
        console.log(res.body)
        expect(res.status).toBe(200);
        expect(res.body.newBalance).toBe(25)
    });

    it('should not allow user to spend more cash then they have', async () => {
        const res = await agent.post("/profile/cash")
            .send({
                changeAmount: -100
            });
        console.log(res.body)
        expect(res.status).toBe(200);
        expect(res.body.error).toBe("Cannot Spend more money then you have!")
    });
})