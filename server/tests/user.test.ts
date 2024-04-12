import { beforeAll, describe, expect, it } from "vitest";
import StandardUser from "./standard_user";

import { randomBytes } from 'crypto';

// Function to generate a random string of a given length
const generateRandomString = (length: number): string => {
    const buffer = randomBytes(Math.ceil(length / 2));
    return buffer.toString('hex').slice(0, length);
};

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

    it("Get user field", async () => {
        const res = await agent.post("/users/1").send({ id: 1 });
        const currentUser = await res.body;
        expect(currentUser).toBeDefined();
    })

    it('should create a new Standard user', async () => {

        const emailString = generateRandomString(10);
        const res = await agent.post("/users/create")
            .send({
                userType: 'Standard',
                firstName: 'John',
                lastName: 'Doe',
                email: emailString + '@example.com',
                password: 'strongPassword123!',
                age: 25,
                budget: 100,
                goals: 'Find a soulmate',
                bio: 'I love long walks on the beach',
            });
        expect(res.status).toBe(200);
        expect(res.body.userId).toBeDefined();
    }, 10000);

    it('should create a new Cupid', async () => {

        const emailString = generateRandomString(10);
        const res = await agent.post("/users/create")
            .send({
                userType: 'Cupid',
                firstName: 'John',
                lastName: 'Doe',
                email: emailString + '@example.com',
                password: 'strongPassword123!',
                age: 25,
                budget: 100,
                goals: 'Find a soulmate',
                bio: 'I love long walks on the beach',
            });
        expect(res.status).toBe(200);
        expect(res.body.userId).toBeDefined();
    }, 10000);

    it('should not allow duplicate emails', async () => {
        const emailString = generateRandomString(10);
        const res = await agent.post("/users/create")
            .send({
                userType: 'Standard',
                firstName: 'John',
                lastName: 'Doe',
                email: 'user@gmail.com',
                password: 'here',
                age: 25,
                budget: 100,
                goals: 'Find a soulmate',
                bio: 'I love long walks on the beach',
            });
        expect(res.status).toBe(200);
        expect(res.body.error).toBe("Email already in use")
    });

    it('should force password to have 10 characters', async () => {
        const emailString = generateRandomString(10);
        const res = await agent.post("/users/create")
            .send({
                userType: 'Standard',
                firstName: 'John',
                lastName: 'Doe',
                email: emailString + '@example.com',
                password: 'here',
                age: 25,
                budget: 100,
                goals: 'Find a soulmate',
                bio: 'I love long walks on the beach',
            });
        expect(res.status).toBe(200);
        expect(res.body.error).toBe("Password must be at least 10 characters long.")
    });

    it('should force password to have uppercase letters', async () => {
        const emailString = generateRandomString(10);
        const res = await agent.post("/users/create")
            .send({
                userType: 'Standard',
                firstName: 'John',
                lastName: 'Doe',
                email: emailString + '@example.com',
                password: 'strongpassword',
                age: 25,
                budget: 100,
                goals: 'Find a soulmate',
                bio: 'I love long walks on the beach',
            });
        expect(res.status).toBe(200);
        expect(res.body.error).toBe("Password must contain at least one uppercase letter.")
    });

    it('should force password to have lowercase letters', async () => {
        const emailString = generateRandomString(10);
        const res = await agent.post("/users/create")
            .send({
                userType: 'Standard',
                firstName: 'John',
                lastName: 'Doe',
                email: emailString + '@example.com',
                password: 'STRONGPASSWORD',
                age: 25,
                budget: 100,
                goals: 'Find a soulmate',
                bio: 'I love long walks on the beach',
            });
        expect(res.status).toBe(200);
        expect(res.body.error).toBe("Password must contain at least one lowercase letter.")
    });

    it('should force password to have numbers', async () => {
        const emailString = generateRandomString(10);
        const res = await agent.post("/users/create")
            .send({
                userType: 'Standard',
                firstName: 'John',
                lastName: 'Doe',
                email: emailString + '@example.com',
                password: 'strongPassword',
                age: 25,
                budget: 100,
                goals: 'Find a soulmate',
                bio: 'I love long walks on the beach',
            });
        expect(res.status).toBe(200);
        expect(res.body.error).toBe("Password must contain at least one number.")
    });

    it('should force password to have a symbol', async () => {
        const emailString = generateRandomString(10);
        const res = await agent.post("/users/create")
            .send({
                userType: 'Standard',
                firstName: 'John',
                lastName: 'Doe',
                email: emailString + '@example.com',
                password: 'strongPassword1',
                age: 25,
                budget: 100,
                goals: 'Find a soulmate',
                bio: 'I love long walks on the beach',
            });
        expect(res.status).toBe(200);
        expect(res.body.error).toBe("Password must contain at least one symbol.")
    });

    it('should force good password to update', async () => {
        const res = await agent.post("/users/password")
            .send({
                currentPassword: "Password1!", newPassword: "password"
            });
        expect(res.status).toBe(200);
        expect(res.body.error).toBe("Password must be at least 10 characters long.")
    });

    it('should force old password to be correct', async () => {
        const res = await agent.post("/users/password")
            .send({
                currentPassword: "userJ", newPassword: "Password1!"
            });
        expect(res.status).toBe(200);
        expect(res.body.error).toBe("Incorrect Current Password.")
    });

    it('should allow user to change password', async () => {
        const res = await agent.post("/users/password")
            .send({
                currentPassword: "Password1!", newPassword: "Password2!"
            });
        expect(res.body.message).toBe("Your account was successfully updated")
        const res2 = await agent.post("/users/password")
            .send({
                currentPassword: "Password2!", newPassword: "Password1!"
            });
    });

    it('should force user to use correct password to start session', async () => {
        const res = await agent.post("/users/session")
            .send({
                email: "user@gmail.com", password: "Password2!"
            });
        expect(res.status).toBe(200);
        expect(res.body.error).toBe("Invalid login credentials.")
    });

    it('should allow user to start session', async () => {
        const res = await agent.post("/users/session")
            .send({
                email: "user@gmail.com", password: "Password1!"
            });
        expect(res.status).toBe(200);
        expect(res.body.user).toBeDefined()
    });

    it('should allow cupid to start session', async () => {
        const res = await agent.post("/users/session")
            .send({
                email: "cupid@gmail.com", password: "cupid"
            });
        expect(res.status).toBe(200);
        expect(res.body.user).toBeDefined()
    });

    it('should force user to use a number for age ', async () => {
        const res = await agent.post("/users/update")
            .send({
                firstName: "Jim", lastName: "Craig", email: "user@gmail.com", age: "Bl", dailyBudget: 15, relationshipGoals: "Turn 76"
            });
        expect(res.status).toBe(200);
        expect(res.body.error).toBe("Age must be a number")
    });

    it('should force user to use a number for budget ', async () => {
        const res = await agent.post("/users/update")
            .send({
                firstName: "Jim", lastName: "Craig", email: "user@gmail.com", age: 10, dailyBudget: "BL", relationshipGoals: "Turn 76"
            });
        expect(res.status).toBe(200);
        expect(res.body.error).toBe("Budget must be a number")
    });

    it('should force user to use a valid email type for email ', async () => {
        const res = await agent.post("/users/update")
            .send({
                firstName: "Jim", lastName: "Craig", email: "usergmail.com", age: 10, dailyBudget: 10, relationshipGoals: "Turn 76"
            });
        expect(res.status).toBe(200);
        expect(res.body.error).toBe("Invalid Email Provided")
    });

    it('should force user to set budget to at least 10 ', async () => {
        const res = await agent.post("/users/update")
            .send({
                firstName: "Jim", lastName: "Craig", email: "user@gmail.com", age: 10, dailyBudget: 9, relationshipGoals: "Turn 76"
            });
        expect(res.status).toBe(200);
        expect(res.body.error).toBe("In order to service quality dates, Cupid Code requires a minimum of 10 cupid bucks per date")
    });

    it('should force user to set age to at least 18 ', async () => {
        const res = await agent.post("/users/update")
            .send({
                firstName: "Jim", lastName: "Craig", email: "user@gmail.com", age: 10, dailyBudget: 10, relationshipGoals: "Turn 76"
            });
        expect(res.status).toBe(200);
        expect(res.body.error).toBe("To use this service you must be at least 18")
    });

    it('should allow user to update profile number for age ', async () => {
        const res = await agent.post("/users/update")
            .send({
                firstName: "John", lastName: "Doe", email: "user@gmail.com", age: 0, dailyBudget: 0, relationshipGoals: "Go on a lot of dates"
            });
        expect(res.status).toBe(200);
        expect(res.body.updatedAccount).toBeDefined()
        expect(res.body.message).toBe("Your account was successfully updated")
    });


    // TODO: This should just work, but we can't create a cupid rn.
    // it('should create a new Cupid user', async () => {
    //     const emailString = generateRandomString(11);
    //     const res = await agent.post("/users/create")
    //         .send({
    //             userType: 'Cupid',
    //             firstName: 'John',
    //             lastName: 'Doe',
    //             email: emailString + '@example.com',
    //             password: 'strongPassword123!',
    //             age: 25,
    //             budget: 100,
    //             goals: 'Find a soulmate',
    //             bio: 'I love long walks on the beach',
    //         });
    //     expect(res.status).toBe(200);
    //     expect(res.body.userId).toBeDefined();
    // });
})