'use strict';

import angular from 'angular';
import routes from './item.routes';
import ItemController from './item.controller';

export default angular.module('bg.item', ['ui.router'])
  .config(routes)
  .controller('ItemController', ItemController)
  .name;
