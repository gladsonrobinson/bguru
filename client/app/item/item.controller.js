'use strict';

export default class ItemController {
 
  constructor($http) {
  	'ngInject';
    this.$http = $http;
  }

  $onInit() {
  	this.gridOptions = {
      enableColumnMenus: false
    };
    this.gridOptions.columnDefs = [
    	{field: 'item.name', displayName: 'Item Name'},
        {field: 'number_of_orders', displayName: 'Number of Orders'}
    ];
  	this.$http.get('/api/orders/getItems')
      .then(response => {
        this.gridOptions.data = response.data;
      });
  }
}
