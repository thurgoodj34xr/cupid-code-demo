import { beforeAll, describe, expect, it } from "vitest";
import StandardUser from "./standard_user";

let agent: any;
let user: any; // Adjust the type of user as per your application
let token: any;


describe("auth", () => {
    beforeAll(async () => {
        // Create the StandardUser once before all tests
        const standardUser = await StandardUser();
        agent = standardUser.agent;
        user = standardUser.user;
        token = standardUser.token;
    });
    it("should login a user", async () => {
        expect(user).toBeDefined();
    })

    it("should get the current user", async () => {
        const res = await agent.post("/token/verify").send({ token });
        const currentUser = await res.body;

        // Assert that currentUser exists and has the tokens field
        expect(currentUser).toBeDefined();
        expect(currentUser.tokens).toBeDefined();

        // Assert that specific fields have values
        expect(currentUser.user).toBeDefined();

        const { id, createdAt, email, firstName, lastName, password, photoUrl, role, updatedAt, profile, cupid, admin, refreshToken } = currentUser.user;

        expect(id).toBe(1);
        expect(createdAt).toBeDefined();
        expect(email).toBe('user@gmail.com');
        expect(firstName).toBe('John');
        expect(lastName).toBe('Doe');
        expect(password).toBeDefined();
        expect(photoUrl).toBe('https://images.pexels.com/photos/1317712/pexels-photo-1317712.jpeg');
        expect(role).toBe('STANDARD');
        expect(updatedAt).toBeDefined();
        expect(cupid).toBeNull();
        expect(admin).toBeNull();
        expect(refreshToken.id).toBeDefined();
        expect(refreshToken.createdAt).toBeDefined();
        expect(refreshToken.hashedToken).toBeDefined();
        expect(refreshToken.revoked).toBe(false);
        expect(refreshToken.updatedAt).toBeDefined();

        // Assert profile fields
        expect(profile.id).toBe(1);
        expect(profile.age).toBe(23);
        expect(profile.balance).toBe('25');
        expect(profile.createdAt).toBeDefined();
        expect(profile.dailyBudget).toBe('15');
        expect(profile.latitude).toBe('41.7468');
        expect(profile.longitude).toBe('-111.8268');
        expect(profile.relationshipGoals).toBe('Go on a lot of dates');
        expect(profile.updatedAt).toBeDefined();
        expect(profile.userId).toBe(1);
    })
})