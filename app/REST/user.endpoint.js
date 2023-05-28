import business from '../business/business.container';
import applicationException from '../service/applicationException';
import admin from '../middleware/admin';
import auth from '../middleware/auth';
import favorite from "../business/business.container";

const userEndpoint = (router) => {
    router.post('/api/user/auth', async (request, response, next) => {
        try {
            let result = await business.getUserManager(request).authenticate(request.body.login, request.body.password);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    router.post('/api/user/create', async (request, response, next) => {
        try {
            const result = await business.getUserManager(request).createNewOrUpdate(request.body);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    router.delete('/api/user/logout/:userId', auth, async (request, response, next) => {
        try {
            let result = await business.getUserManager(request).removeHashSession(request.params.userId );
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });
    router.delete('/api/user/:id', auth, async (request, response, next) => {
        try {
            let result = await business.getUserManager(request).removeById(request.params.id);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    router.put('/api/password', auth, async (request, response, next) => {
        try {
            let result = await business.getUserManager().putNewPassword(request.body);
            response.status(200).send(result);
        } catch (error) {
            console.log(error);
        }
    });
    router.put('/api/username', auth, async (request, response, next) => {
        try {
            let result = await business.getUserManager().putNewName(request.body)
            response.status(200).send(result);
        } catch (error) {
            console.log(error);
        }
    });
    router.put('/api/email', auth, async (request, response, next) => {
        try {
            let result = await business.getUserManager().putNewEmail(request.body)
            response.status(200).send(result);
        } catch (error) {
            console.log(error);
        }
    });
};

export default userEndpoint;
