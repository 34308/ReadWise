import favorite from '../business/business.container';
import auth from "../middleware/auth";
import business from "../business/business.container";
import applicationException from "../service/applicationException";

const favoriteEndpoint = (router) => {

    router.get('/api/favorite', async (request, response, next) => {
        try {
            let result = await favorite.getFavoriteManager().query();
            response.status(200).send(result);
        } catch (error) {
            console.log(error);
        }
    });


    router.get('/api/favorite/:id', async (request, response, next) => {
        try {
            let id = request.params.id;
            let result = await favorite.getFavoriteManager().get(request.params.id);
            response.status(200).send(result);
        } catch (error) {
            console.log(error);
        }
    });
    router.delete('/api/favorite/:id/:userId', async (request, response, next) => {
        try {
            let result = await favorite.getFavoriteManager().removeById(request.params.userId,request.params.id);
            response.status(200).send(result);
        } catch (error) {
            console.log(error);
        }
    });
    router.post('/api/favorite', async (request, response, next) => {
        try {
            let result = await favorite.getFavoriteManager().createNewOrUpdate(request.body);
            response.status(200).send(result);
        } catch (error) {
            console.log(error);
        }
    });


};
export default favoriteEndpoint;
