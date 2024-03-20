import express, { Router } from 'express';

import { PrismaClient, Role } from '@prisma/client';
import JobRepository from '../repositories/job_repository';
import AuthMiddleware from '../middleware/authentication';


const JobsController = (db: PrismaClient) => {
    const router = Router();
    const _repository = new JobRepository(db);


    router.get('/jobs', AuthMiddleware(db, [Role.ADMIN]), async (req, res, next) => {
        const jobs = await _repository.getJobs();
        res.send(jobs);
    });

    router.get('/jobs/:id', AuthMiddleware(db, [Role.ADMIN]), async (req, res, next) => {
        const jobId = req.params.id;
        const job = await _repository.getJobById(jobId);
        if (job) {
            res.send(job);
        } else {
            res.status(404).send('Job not found');
        }
    });

    router.post('/jobs', AuthMiddleware(db, [Role.ADMIN]), async (req, res, next) => {
        const newJob = req.body;
        const createdJob = await _repository.createJob(newJob);
        res.send(createdJob);
    });

    router.put('/jobs/:id', AuthMiddleware(db, [Role.ADMIN]), async (req, res, next) => {
        const jobId = req.params.id;
        const updatedJob = req.body;
        const result = await _repository.updateJob(jobId, updatedJob);
        if (result) {
            res.send(updatedJob);
        } else {
            res.status(404).send('Job not found');
        }
    });

    router.delete('/jobs/:id', AuthMiddleware(db, [Role.ADMIN]), async (req, res, next) => {
        const jobId = req.params.id;
        const result = await _repository.deleteJob(jobId);
        if (result) {
            res.send('Job deleted successfully');
        } else {
            res.status(404).send('Job not found');
        }
    });

    return router;
}
export default JobsController;