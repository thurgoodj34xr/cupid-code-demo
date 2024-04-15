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


    it('should pull all cupids', async () => {
        const res = await cupidAgent.get("/cupidJobs/1").send({});
        console.log(res.body)
        expect(res.status).toBe(200);

    });

})