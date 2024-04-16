import { Router } from 'express';
import { PrismaClient, Role } from '@prisma/client';
import JobRepository from '../repositories/job_repository';
import AuthMiddleware from '../middleware/authentication';
import UserRepository from '../repositories/user_repository';


const JobsController = (db: PrismaClient) => {
    const router = Router();
    const _repository = new JobRepository(db);
    const _userRepository = new UserRepository(db);

    // Jobs by Cupid
    router.get('/cupidJobs/:id', AuthMiddleware(db, [Role.CUPID, Role.ADMIN]), async (req, res, next) => {
        const cupidId = req.params.id;
        const jobs = await _repository.getAllByCupidId(parseInt(cupidId));
        res.send(jobs);
    });

    // Jobs by Cupid
    router.get('/avaliable/:id', AuthMiddleware(db, [Role.CUPID, Role.ADMIN]), async (req, res, next) => {
        const cupidId = req.params.id;
        const jobs = await _repository.getAvaliableByCupidId(parseInt(cupidId));
        res.send(jobs);
    });

    // Jobs by Cupid
    router.get('/current/:id', AuthMiddleware(db, [Role.CUPID, Role.ADMIN]), async (req, res, next) => {
        const cupidId = req.params.id;
        const jobs = await _repository.getCurrentByCupidId(parseInt(cupidId));
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
    router.post('/create', AuthMiddleware(db), async (req, res, next) => {
        const { cupidId, userId, name, details, cupidPayout, total } = req.body;
        const user = await _userRepository.findById(userId);
        if (!user || !user.profile || user.profile.latitude || user.profile.longitude) {
            res.status(400).send('User Id not recognized by system');
            return;
        }
        const userLat = parseFloat(user.profile.latitude);
        const userLong = parseFloat(user.profile.longitude);
        const createdJob = await _repository.createJob({ cupidId: parseInt(cupidId), userId: parseInt(userId), name, details, latitude: userLat, longitude: userLong, total, cupidPayout });
        logInfo(`jobs_controller.ts`, `Created a new Job`, req.user!!)
        jobStatus();
        res.send(createdJob);
    });

    // Update job by ID
    router.post('/update/:id', AuthMiddleware(db, [Role.ADMIN]), async (req, res, next) => {
        const jobId = req.params.id;
        var intJobId = parseInt(jobId)
        const data = req.body;
        const result = await _repository.updateJob(intJobId, data);
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

    // Jobs by Cupid
    router.post('/start', AuthMiddleware(db, [Role.CUPID, Role.ADMIN]), async (req, res, next) => {
        const { id } = req.body
        const job = await _repository.startJob(id);
        logInfo(`jobs_controller.ts`, `Started Job ${job.name}`, req.user!!)
        res.status(200).send({ sucess: true });
    });

    router.post('/finish', AuthMiddleware(db, [Role.CUPID, Role.ADMIN]), async (req, res, next) => {
        const { id } = req.body
        console.log(id)
        const job = await _repository.finishJob(id);
        logInfo(`jobs_controller.ts`, `Finished Job ${job.name}`, req.user!!)
        res.status(200).send({ status: true });
    });

    return router;
}
export default JobsController;