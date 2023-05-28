import userEndpoint from './user.endpoint';
import bookEndpoint from './book.endpoint';
import favoriteEndpoint from './favorite.endpoint';
const routes = function (router) {
    userEndpoint(router);
    bookEndpoint(router);
    favoriteEndpoint(router);
};

export default routes;
