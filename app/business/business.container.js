'use strict';
import userManager from './user.manager';
import bookManager from './book.manager';
import favoriteManager  from './favorite.manager';

function getter(manager, request) {
  return function () {
    return manager.create(request, this);
  };
}
export default {
    getUserManager: getter(userManager),
    getBookManager: getter(bookManager),
    getFavoriteManager:getter(favoriteManager)
};
