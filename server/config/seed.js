/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Order from '../api/order/order.model';


Order.find({}).remove()
  .then(() => {
    Order.create({
      company: { name: 'Apple', id: 1111},
      address: 'Test address 1',
      item: { name: 'Mac book', id: 2001}
    },{
      company: { name: 'test company', id: 1112},
      address: 'Test address 2',
      item: { name: 'Dell Laptop', id: 2002}
    },{
      company: { name: 'Apple', id: 1111},
      address: 'Test address 3',
      item: { name: 'Mac book', id: 2001}
    },{
      company: { name: 'Apple', id: 1111},
      address: 'Test address 4',
      item: { name: 'Iphone', id: 2004}
    },{
      company: { name: 'Qburst', id: 1115},
      address: 'Test address 2',
      item: { name: 'samsung', id: 2005}
    });
  });
