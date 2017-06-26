import { expect } from 'chai';
import { graphql } from 'graphql';
import { theStoreSchema } from '../src/theStoreSchema';

describe('Item Query Tests', function() {
    before(function() {
    // runs before all tests in this block
        var mongoose = require('mongoose');
        mongoose.connect('mongodb://localhost/dev_shop')
        var db = mongoose.connection
        db.on('error', console.error.bind(console, 'connection error: '))
    });

  describe('Basic Endpoint Queries', function() {

    it('tests if the getItems endpoint works', async () => {
          const query = `
           query getItemsQuery($from: Int!, $limit: Int!){
             getItems(from: $from, limit: $limit){
                 name
             }
           }
         `;

         const params = { "from": 0, "limit": 1 };
         const result = await graphql(theStoreSchema, query, null, null, params);
         expect(result).to.deep.equal({
             data: {
                 getItems : [
                     { name: 'Apple' }
                 ],
             }
         });

    });

    it('tests if the getItemsWithPrice endpoint works', async () => {
          const query = `
           query getItemsQuery($price: Float!, $limit: Int!){
             getItemsWithPrice(price: $price, limit: $limit){
                 name
             }
           }
         `;

         const params = { price: 0.5, limit: 1 };
         const result = await graphql(theStoreSchema, query, null, null, params);
         expect(result).to.deep.equal({
             data: {
                 getItemsWithPrice : [],
             }
         });

    });

    it('tests if the searchItems endpoint works', async () => {
          const query = `
           query getItemsQuery($search: String!, $limit: Int!){
             searchItems(search: $search, limit: $limit){
                 name
             }
           }
         `;

         const params = { "search": "App", "limit": 1 };
         const result = await graphql(theStoreSchema, query, null, null, params);
         expect(result).to.deep.equal({
             data: {
                 searchItems : [
                     { name: 'Apple' }
                 ],
             }
         });

    });

  });

  describe('Field testing for Endpoints', function() {
      it('tests if the getItems endpoint works with more fields', async () => {
            const query = `
             query getItemsQuery($from: Int!, $limit: Int!){
               getItems(from: $from, limit: $limit){
                   name
                   image
                   price
                   category
               }
             }
           `;

           const params = { "from": 0, "limit": 1 };
           const result = await graphql(theStoreSchema, query, null, null, params);
           expect(result).to.deep.equal({
               data: {
                   getItems : [
                       { name: 'Apple',
                         image: 'https://www.thesun.co.uk/wp-content/uploads/2017/01/gettyimages-185071735.jpg?strip=all&w=960',
                         price: 0.99,
                         category: ['food'],
                    }
                   ],
               }
           });

      });

      it('tests if the getItemsWithPrice endpoint works all fields', async () => {
            const query = `
             query getItemsQuery($price: Float!, $limit: Int!){
               getItemsWithPrice(price: $price, limit: $limit){
                   name
                   image
                   price
                   category
               }
             }
           `;

           const params = { price: 0.5, limit: 1 };
           const result = await graphql(theStoreSchema, query, null, null, params);
           expect(result).to.deep.equal({
               data: {
                   getItemsWithPrice : [],
               }
           });

      });

      it('tests if the searchItems endpoint works with all fields', async () => {
            const query = `
             query getItemsQuery($search: String!, $limit: Int!){
               searchItems(search: $search, limit: $limit){
                   name
                   image
                   price
                   category
               }
             }
           `;

           const params = { "search": "App", "limit": 1 };
           const result = await graphql(theStoreSchema, query, null, null, params);
           expect(result).to.deep.equal({
               data: {
                   searchItems : [
                       {
                           name: 'Apple',
                           image: 'https://www.thesun.co.uk/wp-content/uploads/'+
                           '2017/01/gettyimages-185071735.jpg?strip=all&w=960',
                           price: 0.99,
                           category: ['food'],
                        }
                   ],
               }
           });

      });

  });
});
