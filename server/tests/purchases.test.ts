import { beforeAll, describe, expect, it } from "vitest";
import StandardUser from "./standard_user";

let agent: any;


describe("purchases", () => {
    beforeAll(async () => {
        // Create the StandardUser once before all tests
        const standardUser = await StandardUser();
        agent = standardUser.agent;
    });

    it('should create a new purchase', async () => {

        const res = await agent.post("/purchases/record")
            .send({
                cupidId: 4, total: 0, jobCost: 0, details: "Money Man"
            });
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Purchase successfully completed");
        expect(res.body.newBalance).toBeDefined()
        const newPurchase = res.body
        const { id, cupidId, cupidPayout, details, profit, timestamp, total, userId } = newPurchase.purchase
        expect(id).toBeDefined()
        expect(cupidId).toBe(4)
        expect(cupidPayout).toBe("0")
        expect(details).toBe("Money Man")
        expect(profit).toBe("0")
        expect(timestamp).toBeDefined()
        expect(total).toBe("0")
        expect(userId).toBe(1)
    }, 10000);

    it('should not allow you to spend more money then you have', async () => {

        const res = await agent.post("/purchases/record")
            .send({
                cupidId: 4, total: 2000000, jobCost: 0, details: "Money Man"
            });
        expect(res.status).toBe(200);
        expect(res.body.error).toBe("Cannot Spend more money then you have!");

    }, 10000);

    it('should allow you to see history', async () => {

        const res = await agent.post("/purchases/history")
            .send({});
        expect(res.status).toBe(200);
        expect(res.body[0].id).toBeDefined()

    }, 10000);

})