'use strict';
import mongo from 'mongodb';
import Order from './order.model';

// Gets all orders
export function index(req, res) {
  return Order.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function search(req, res) {
	var query = null;
	var bgGroup = null;
	var bgProject = null;
	if(req.query.searchCategoryId && req.query.searchValue) {
		//var regex = new RegExp('(?:^|[ ])'+req.query.searchValue+'([a-zA-Z]+)', 'i');
		var regex = new RegExp('^' +req.query.searchValue, 'i');

		if(req.query.searchCategoryId === 'CompanyName') {
			query = {'company.name': regex};
			bgGroup = {
        _id: "$company.name",
        id: { $first: "$_id" },
        item: {$first: "$item" },
        address: {$first: "$address" },
        company_order_count :{$sum:1},
        company:{$first: "$company"}
      };
      bgProject = {
        _id:"$id",
        company: 1,
        item: 1,
        address: 1,
        company_order_count: 1
      };
		} else if(req.query.searchCategoryId === 'address') {
			query = {
      	$text: { $search: "\"" + req.query.searchValue + "\"" }
    	};
    	bgGroup ={
        _id: "$address",
        id: { $first: "$_id" },
        item: {$first: "$item" },
        company: {$first: "$company" },
        address_order_count :{$sum:1}
      };
      bgProject = {
        _id:"$id",
        address: "$_id",
        item: 1,
        company: 1,
        address_order_count: 1
      };
		} else if(req.query.searchCategoryId === 'orderId') {
			try {
				query = {
					'_id':  new mongo.ObjectID(req.query.searchValue)
				};
			} catch (e){
				console.log(e)
			}
		} else if(req.query.searchCategoryId === 'showAllOrder') {
			query = {
				[req.query.field]: req.query.searchValue
			};
		}
	}

	var aggregateQuery = [{$match: query}];
	bgGroup ? aggregateQuery.push({$group: bgGroup}) : false;
	bgProject ? aggregateQuery.push({$project: bgProject}) : false;

	return Order.aggregate(aggregateQuery)
		.exec()
		.then(respondWithResult(res))
		.catch(handleError(res));
}

export function removeOrder(req, res) {
  return Order.findById(req.params.id).exec()
    .then(removeField(res))
    .catch(handleError(res));
}

export function getItems(req, res) {

	var aggregateQuery = [
		{ 
			$group: {
				_id: '$item',
				number_of_orders: { $sum:1 }
			}
		},
		{
			$project: {
				item: '$_id',
				_id: 0,
	      number_of_orders: 1
			}
		},
		{
			$sort: {
				number_of_orders: -1
			}
		}
	];

	return Order.aggregate(aggregateQuery)
		.exec()
		.then(respondWithResult(res))
		.catch(handleError(res));
}


function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function removeField(res) {
	return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          return res.status(200).json({message: 'success'});
        });
    }
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}