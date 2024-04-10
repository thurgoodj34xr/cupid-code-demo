import { describe, it, expect } from "vitest";

import app from "../../index"

const server = app.app;

describe("auth", () => {
    it("should return a 200 status", async () => {
        const res = await server.get("/auth");
        expect(res.status).toBe(200);
    })
})