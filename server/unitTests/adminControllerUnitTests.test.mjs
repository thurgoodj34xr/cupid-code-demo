import { expect } from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import { describe, beforeEach, afterEach, it } from 'mocha';
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

import AdminRepository from '../repositories/admin_repository.ts';
import AuthMiddleware from '../middleware/authentication.ts';
import AdminController from '../controllers/admin_controller.ts';

chai.use(chaiHttp);

describe("AdminController", () => {
    let sandbox;
    let router;
    let dbMock;
    let repositoryStub;
    let middlewareStub;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        router = Router();
        dbMock = new PrismaClient();
        repositoryStub = sandbox.stub(AdminRepository.prototype, "getUsers").resolves([]);
        middlewareStub = sandbox.stub(AuthMiddleware);
    });

    afterEach(() => {
        sandbox.restore();
    });

    it("should return users when GET /admin/users is called", async () => {
        router.use("/admin", AdminController(dbMock));

        const res = await chai.request(router).get("/admin/users");
        expect(res).to.have.status(200);
        expect(repositoryStub.calledOnce).to.be.true;
        expect(middlewareStub.calledOnce).to.be.true;
    });
});
