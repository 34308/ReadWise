import bookDAO from '../DAO/BookDAO';

function create(context) {
    async function query() {
        let result = bookDAO.query();
        if (result) {
            return result;
        }
    }

    async function get(id) {
        let result = await bookDAO.get(id);
        if (result) {
            return result;
        }
    }
    async function getMany([id]) {
        let result = await bookDAO.get(id);
        if (result) {
            return result;
        }
    }
    async function createNewOrUpdate(data) {
        let result = await bookDAO.createNewOrUpdate(data);
        if (result) {
            return result;
        }
    }

    return {
        query: query,
        get: get,
        getMany:getMany,
        createNewOrUpdate: createNewOrUpdate,
    };
}

export default {
    create: create
};
