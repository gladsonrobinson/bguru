'use strict';

import mongoose from 'mongoose';

var OrderSchema = new mongoose.Schema({
  company: {
  	name: { type: String, index: true },
  	id: { type: String}
  },
  address: { type: String, index: true },
  item: {
  	name: { type: String, index: true },
  	id: { type: String }
  }
});

OrderSchema.index({'address': 'text'});

export default mongoose.model('Order', OrderSchema);
