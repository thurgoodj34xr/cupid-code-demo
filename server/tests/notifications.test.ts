import { describe, expect, it } from "vitest";
import StandardUser from "./standard_user";

describe("Notifcations", async () => {
    it("Should get auth users notficaitons", async () => {
        const { agent, user, token } = await StandardUser();
        const res = await agent.post("/notifications/all")
        const body = res.body;
        expect(body[0]).toBeDefined();
    })

    it("Should delete a notification", async () => {
        const { agent, user, token } = await StandardUser();
        const res = await agent.post("/notifications/all")
        const body = res.body;
        const notificationId = body[0].id;
        const res2 = await agent.post("/notifications/delete").send({ notificationId })
        const body2 = res2.body;
        expect(body2).toBeDefined();
    })
})