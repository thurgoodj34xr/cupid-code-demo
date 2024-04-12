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
        console.log("Status of error is" + res.status)
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
        console.log("Status of error is" + res.status)
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
        console.log("Status of error is" + res.status)
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
        console.log("Status of error is" + res.status)
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
        console.log("Status of error is" + res.status)
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
        console.log("Status of error is" + res.status)
        expect(res.status).toBe(200);
        expect(res.body.error).toBe("Password must contain at least one symbol.")
    });

    it('should force good password to update', async () => {
        const res = await agent.post("/users/password")
            .send({
                currentPassword: "Password1!", newPassword: "password"
            });
        console.log("Status of error is" + res.status)
        expect(res.status).toBe(200);
        expect(res.body.error).toBe("Password must be at least 10 characters long.")
    });

    it('should force old password to be correct', async () => {
        const res = await agent.post("/users/password")
            .send({
                currentPassword: "userJ", newPassword: "Password1!"
            });
        console.log("Status of error is" + res.status)
        expect(res.status).toBe(200);
        expect(res.body.error).toBe("Incorrect Current Password.")
    });

    it('should force user to change password', async () => {
        const res = await agent.post("/users/password")
            .send({
                currentPassword: "Password1!", newPassword: "Password2!"
            });
        console.log(res)
        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Your account was successfully updated")
        const res2 = await agent.post("/users/password")
            .send({
                currentPassword: "Password2!", newPassword: "Password1!"
            });
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