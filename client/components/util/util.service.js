'use strict';

import angular from 'angular';

/**
 * The Util service is for thin, globally reusable, utility functions
 */
export function UtilService($window, $http) {
  'ngInject';

  var Util = {
    /**
     * Return a callback or noop function
     *
     * @param  {Function|*} cb - a 'potential' function
     * @return {Function}
     */
    safeCb(cb) {
      return angular.isFunction(cb) ? cb : angular.noop;
    },

    /**
     * Parse a given url with the use of an anchor element
     *
     * @param  {String} url - the url to parse
     * @return {Object}     - the parsed url, anchor element
     */
    urlParse(url) {
      var a = document.createElement('a');
      a.href = url;

      // Special treatment for IE, see http://stackoverflow.com/a/13405933 for details
      if(a.host === '') {
        a.href = a.href;
      }

      return a;
    },

    /**
     * Test whether or not a given url is same origin
     *
     * @param  {String}           url       - url to test
     * @param  {String|String[]}  [origins] - additional origins to test against
     * @return {Boolean}                    - true if url is same origin
     */
    isSameOrigin(url, origins) {
      url = Util.urlParse(url);
      origins = origins && [].concat(origins) || [];
      origins = origins.map(Util.urlParse);
      origins.push($window.location);
      origins = origins.filter(function(o) {
        let hostnameCheck = url.hostname === o.hostname;
        let protocolCheck = url.protocol === o.protocol;
        // 2nd part of the special treatment for IE fix (see above):
        // This part is when using well-known ports 80 or 443 with IE,
        // when $window.location.port==='' instead of the real port number.
        // Probably the same cause as this IE bug: https://goo.gl/J9hRta
        let portCheck = url.port === o.port || o.port === '' && (url.port === '80' || url.port
          === '443');
        return hostnameCheck && protocolCheck && portCheck;
      });
      return origins.length >= 1;
    },


    getColoumObject(type) {
      var coloumObj;
      switch(type) {
        case 'CompanyName':
          coloumObj = [
            {field: 'company.name', displayName: 'Company'},
            {field: 'company_order_count', displayName: 'Company Order Count'},
            {name: 'Action1', displayName: 'Action', cellTemplate: '<a class="ui-grid-cell-contents" ng-click="grid.appScope.viewCompanyOrders(row)">View orders</a>'}
          ];
        break;
        case 'address':
          coloumObj = [
            {field: 'address', displayName: 'Address'},
            {field: 'address_order_count', displayName: 'Address Order Count'},
            {name: 'Action2', displayName: 'Action', cellTemplate: '<a class="ui-grid-cell-contents" ng-click="grid.appScope.viewAddressOrders(row)">View orders</a>'}
          ];
        break;
        default:
          coloumObj = [
            {field: '_id', displayName: 'Order Id'},
            {field: 'company.name', displayName: 'Company'},
            {field: 'address', displayName: 'Address'},
            {field: 'item.name', displayName: 'Item'},
            {name: 'Action3', displayName: 'Action', cellTemplate: '<a class="ui-grid-cell-contents" ng-click="grid.appScope.deleteOrder(row)">Delete</a>'}
          ];         
      }
      return coloumObj; 
    },

    getOrderSearch(query) {
      return $http.get('/api/orders/search', query);
    }
  };

  return Util;
}
