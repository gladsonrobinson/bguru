'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('item', {
    url: '/main/item',
    template: require('./item.html'),
    controller: 'ItemController',
    controllerAs: 'item'
  });
}
