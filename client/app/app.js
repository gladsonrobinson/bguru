'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';

import uiGrid from 'angular-ui-grid';
// import ngMessages from 'angular-messages';


import {
  routeConfig
} from './app.config';

import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import item from './item';
import constants from './app.constants';
import util from '../components/util/util.module';

import './app.scss';

angular.module('bguru2App', [ngCookies, ngResource, ngSanitize, uiRouter, uiBootstrap, navbar,
  footer, main, item, constants, util, uiGrid
])
  .config(routeConfig);

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['bguru2App'], {
      strictDi: true
    });
  });
