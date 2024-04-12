import { beforeAll, describe, expect, it } from "vitest";
import StandardUser from "./standard_user";


let agent: any;


describe("users", () => {
    beforeAll(async () => {
        // Create the StandardUser once before all tests
        const standardUser = await StandardUser();
        agent = standardUser.agent;
    });


    it('should pull all cupids', async () => {
        const res = await agent.get("/cupids/all").send({});
        expect(res.status).toBe(200);
        expect(res.body[0].email).toBe("cupid@gmail.com")
    });

    it('should pull all available cupids', async () => {
        const res = await agent.get("/cupids/available").send({});
        expect(res.status).toBe(200);
        expect(res.body[0].user.email).toBe("cupid@gmail.com")
    });
    // TODO we need a cupid object to set working not working
    // it('should pull all working cupids', async () => {
    //     const res = await agent.post("/cupids/working").send({});
    //     console.log(res.body)
    //     expect(res.status).toBe(200);
    //     expect(res.body[1].user.id).toBe(3)
    // });

    it('should be able to pull if a specific cupids is working', async () => {
        const res = await agent.post("/cupids/status").send({ cupidId: 1 });
        expect(res.status).toBe(200);
        expect(res.body.status).toBe(true)
    });

    it('should be throw error if working status is not a valid cupid id', async () => {
        const res = await agent.post("/cupids/status").send({ cupidId: 0 });
        expect(res.status).toBe(200);
        expect(res.body.error).toBe("Error getting working status")
    });

    it('should be able to pull specific cupids', async () => {
        const res = await agent.post("/cupids/get").send({ cupidId: 1 });
        expect(res.status).toBe(200);
        expect(res.body.user.email).toBe("cupid@gmail.com")
    });

    it('should throw error if cupidId is invalid', async () => {
        const res = await agent.post("/cupids/get").send({ cupidId: 0 });
        expect(res.status).toBe(200);
        expect(res.body.user).toBeUndefined()
    });

    it('should throw error when no current cupid', async () => {
        const res = await agent.post("/hireCupid/cupid").send({ profileId: 1 });
        expect(res.status).toBe(200);
        expect(res.body.cupid).toBe(null)
    });

    it('should throw error when no current cupid', async () => {
        const res = await agent.get("/cupids/me/1").send({});
        expect(res.status).toBe(200);
        expect(res.body.id).toBeUndefined()
    });

    it('should be able to hire a cupid', async () => {
        const res = await agent.post("/hireCupid/hire").send({ profileId: 1, cupidId: 2 });
        expect(res.body.cupid.cupid).exist
        expect(res.status).toBe(200);
    });

    it('should not allow user to hire multiple cupids', async () => {
        const res = await agent.post("/cupids/hire").send({ profileId: 1, cupidId: 3 });
        expect(res.status).toBe(200);
        expect(res.error).toBe(false)
    });

    it('should not allow user to hire multiple cupids', async () => {
        const res = await agent.post("/hireCupid/hire").send({ profileId: 1, cupidId: 3 });
        expect(res.status).toBe(200);
        expect(res.error).toBe(false)
    });

    it('should pull current cupid', async () => {
        const res = await agent.post("/hireCupid/cupid").send({ profileId: 1 });
        expect(res.status).toBe(200);
        expect(res.body.cupid.cupid).toBeDefined()
    });

    it('should pull current cupid', async () => {
        const res = await agent.get("/cupids/me/1").send({});
        console.log(res.body)
        expect(res.status).toBe(200);
        expect(res.body.fired).toBe(false)
    });

    it('should be able to fire a cupid', async () => {
        const res = await agent.post("/cupids/fire").send({ cupidId: 2 });
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true)
    });
})