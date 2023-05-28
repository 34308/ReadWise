import favoriteDAO from "../DAO/FavoriteListDAO";

function create(context) {
    async function query() {
        let result = favoriteDAO.query();
        if (result) {
            return result;
        }
    }

    async function get(id) {
        let result = await favoriteDAO.get(id);
        if (result) {
            return result;
        }
    }

    async function createNewOrUpdate(data) {
        let result = await favoriteDAO.createNewOrUpdate(data);
        if (result) {
            return result;
        }
    }
    async function removeById(userId,reviewId) {
        let result = await favoriteDAO.removeById(userId,reviewId);
        if (result) {
            return result;
        }
    }

    return {
        query: query,
        get: get,
        createNewOrUpdate: createNewOrUpdate,
        removeById:removeById,
    };
}

export default {
    create: create
};
