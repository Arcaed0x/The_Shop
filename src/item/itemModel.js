import { Schema } from 'mongoose';
var mongoose = require('mongoose');

var itemSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    image: String,
    price: Number,
    category: [String]
}, {collection:'Items'})

itemSchema.statics.getItems = function(from_, limit_) {
  return new Promise((resolve, reject) => {
      this.find({}, null, {skip: from_, limit: limit_}, (err, item) => {
          // Handle error
          if (err){
              reject("Error occured retrieving item")
          }
          // Continue on
          resolve(item)
      });
  });
};


itemSchema.statics.getWithPrice = function(price_, limit_) {
  return new Promise((resolve, reject) => {
      this.find({ price: price_ }, null, {limit: limit_}, (err, item) => {
          // Handle error
          if (err){
              reject("Error occured retrieving item")
          }

          // Continue on
          resolve(item)
      });
  });
};

itemSchema.statics.searchItems = function(name_, limit_ = 5) {
  return new Promise((resolve, reject) => {
      const regExp = name_.length > 0 ? name_ + '*': "\ ";
      this.find({ name: new RegExp(regExp, 'i') }, null, {limit: limit_}, (err, item) => {
          // Handle error
          if (err){
              reject("Error occured while searching item")
          }

          // Continue on
          resolve(item)
      });
  });
};

var Item = mongoose.model('Item', itemSchema)

export { Item }
