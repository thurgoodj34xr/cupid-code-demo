import { beforeAll, describe, expect, it } from "vitest";
import StandardUser from "./standard_user";
import CupidUser from "./cupid_user";


let cupidAgent: any;

describe("users", () => {
    beforeAll(async () => {
        // Create the StandardUser once before all tests
        const cupidUser = await CupidUser();
        cupidAgent = cupidUser.agent;
    });


    it('should pull all jobs done by cupid', async () => {
        const res = await cupidAgent.get("/jobs/cupidJobs/1").send({});
        expect(res.status).toBe(200);
        expect(res.body[2]).toBeDefined()
    });

    it('should pull all available jobs by cupid', async () => {
        const res = await cupidAgent.get("/jobs/cupidJobs/1").send({});
        expect(res.status).toBe(200);
        expect(res.body[2]).toBeDefined()
    });

    // TODO this throws an error
    // it('should be able to create a job', async () => {
    //     const res = await cupidAgent.get("/jobs/create").send({
    //         cupidId: 2, userId: 1, name: "Cliff Jumping", details: "Near death experience", cupidPayout: 40, total: 180
    //     });
    //     console.log(res)
    //     expect(res.status).toBe(200);
    //     expect(res.body).toBeDefined()
    // });

    // it("should be able to delete a job", async () => {
    //     const res = await cupidAgent.get("/jobs/delete/4").send({})
    //     console.log(res.body)
    //     expect(res.status).toBe(200);
    // });



})