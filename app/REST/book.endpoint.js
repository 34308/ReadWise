import business from '../business/business.container';
import auth from "../middleware/auth";
import applicationException from "../service/applicationException";

const bookEndpoint = (router) => {

    router.get('/api/books', async (request, response, next) => {
        try {
            let result = await business.getBookManager().query();
            response.status(200).send(result);
        } catch (error) {
            console.log(error);
        }
    });
    router.get('/api/books/:id', async (request, response, next) => {
        try {
            let id = request.params.id;
            let result = await business.getBookManager().get(request.params.id);
            response.status(200).send(result);
        } catch (error) {
            console.log(error);
        }
    });
    router.delete('/api/books/:id', auth, async (request, response, next) => {
        try {
            let result = await business.getBookManager(request).removeById(request.params.id);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });
    router.post('/api/books', async (request, response, next) => {
        try {
            let result = await business.getBookManager().createNewOrUpdate(request.body);
            response.status(200).send(result);
        } catch (error) {
            console.log(error);
        }
    });

};
export default bookEndpoint;
