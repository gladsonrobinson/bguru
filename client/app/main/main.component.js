import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {

  /*@ngInject*/
  constructor($http, Util, uiGridConstants, $scope) {
    this.$http = $http;
    this.Util = Util;
    this.uiGridConstants = uiGridConstants;
    this.$scope = $scope;
  }

  $onInit() {
    
    this.suggestions = [];
    this.loading = false;
    this.searchCategory = 'Order Id';
    this.searchCategoryId = 'orderId';
    this.coloumDefObject = this.Util.getColoumObject();
    this.gridOptions = {
      enableColumnMenus: false,
      columnDefs: this.Util.getColoumObject(),
      onRegisterApi: gridApi => {
        this.gridApi = gridApi
      }
    };
    this.gridOptions.columnDefs = this.Util.getColoumObject();

    this.$http.get('/api/orders')
      .then(response => {
        this.gridOptions.data = response.data;
      });

    this.$scope.deleteOrder = row => {
      this.$http.delete('/api/orders/'+row.entity._id)
        .then(response => {
          if(response.data.message === 'success') {
             var index = this.gridOptions.data.indexOf(row.entity);
             this.gridOptions.data.splice(index, 1);
          }
        });
    }

    this.$scope.viewAddressOrders = row => {
      var query = {
        params: {
          searchCategoryId: 'showAllOrder',
          field: 'address',
          searchValue: row.entity.address
        }
      };
      this.Util.getOrderSearch(query).then(response => {
        console.log(response)
        //this.coloumDefObject = new Array({});
        this.gridOptions.columnDefs = this.Util.getColoumObject();
        this.gridOptions.data = response.data;
      });
    }

    this.$scope.viewCompanyOrders = row => {
      var query = {
        params: {
          searchCategoryId: 'showAllOrder',
          field: 'company.id',
          searchValue: row.entity.company.id
        }
      };
      this.Util.getOrderSearch(query).then(response => {
        console.log(response)
        this.gridOptions.columnDefs = this.Util.getColoumObject();
        this.gridOptions.data = response.data;
      });
    }
  }

  search() {
    if(this.searchKey) {
      var query = {
        params: {
          searchCategoryId: this.searchCategoryId,
          searchValue: this.searchKey
        }
      };
      this.Util.getOrderSearch(query).then(response => {
          this.coloumDefObject = new Array({});
          this.gridOptions.columnDefs = this.Util.getColoumObject(this.searchCategoryId);
          this.gridOptions.data = response.data;
        });
    }
  }
  
}

export default angular.module('bguru2App.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
