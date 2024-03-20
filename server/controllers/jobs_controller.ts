import { Router } from 'express';
import { PrismaClient, Role } from '@prisma/client';
import JobRepository from '../repositories/job_repository';
import AuthMiddleware from '../middleware/authentication';


const JobsController = (db: PrismaClient) => {
    const router = Router();
    const _repository = new JobRepository(db);

    // Jobs by Cupid
    router.get('/cupidJobs', AuthMiddleware(db, [Role.CUPID, Role.ADMIN]), async (req, res, next) => {
        const { cupidId } = req.body
        const jobs = await _repository.getAllByCupidId(cupidId);
        res.send(jobs);
    });

    // Jobs by ID
    router.get('/:id', AuthMiddleware(db), async (req, res, next) => {
        const jobId = req.params.id;
        var intJobId = parseInt(jobId)
        const job = await _repository.getJobById(intJobId);
        if (job) {
            res.send(job);
        } else {
            res.status(404).send('Job not found');
        }
    });

    // Create new Job
    router.post('/create', AuthMiddleware(db, [Role.ADMIN]), async (req, res, next) => {
        const { cupidId, userId, longitude, latitude, cupidPayout } = req.body;
        const createdJob = await _repository.createJob(cupidId, userId, longitude, latitude, cupidPayout);
        logInfo(`jobs_controller.ts`, `Created a new Job`, req.user!!)
        res.send(createdJob);
    });
    
    // Update job by ID
    router.post('/update/:id', AuthMiddleware(db, [Role.ADMIN]), async (req, res, next) => {
        const jobId = req.params.id;
        var intJobId = parseInt(jobId)
        const { cupidId, userId, longitude, latitude, cupidPayout, complete } = req.body;
        const result = await _repository.updateJob(intJobId, cupidId, userId, longitude, latitude, cupidPayout, complete);
        logInfo(`jobs_controller.ts`, `Updated Job ${intJobId}`, req.user!!)
        if (result) {
            res.send(result);
        } else {
            res.status(404).send('Job not found');
        }
    });

    // Delete Job
    router.post('/delete/:id', AuthMiddleware(db, [Role.ADMIN]), async (req, res, next) => {
        const jobId = req.params.id;
        var intJobId = parseInt(jobId)
        const result = await _repository.deleteJob(intJobId);
        logInfo(`jobs_controller.ts`, `Deleted Job ${intJobId}`, req.user!!)
        if (result) {
            res.send('Job deleted successfully');
        } else {
            res.status(404).send('Job not found');
        }
    });

    return router;
}
export default JobsController;