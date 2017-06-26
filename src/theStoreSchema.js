import  {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLFloat,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLSchema,
} from 'graphql/type';

import { itemType } from './item/itemGraphQL';
import { Item } from './item/itemModel';

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        getItems : {
            type: new GraphQLList(itemType),
            args: {
                from: {
                    description: 'Starting index to return from',
                    type: new GraphQLNonNull(GraphQLInt)
                },
                limit: {
                    description: 'The number of results to return',
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve: (root, { from, limit }) => Item.getItems(from, limit)
        },

        getItemsWithPrice : {
            type: new GraphQLList(itemType),
            args : {
                price: {
                    description: 'The price to be searched',
                    type: GraphQLFloat,
                },
                limit: {
                    description: 'The number of Items to return (> 0)',
                    type: GraphQLInt,
                }
            },
            resolve: (root, { price, limit }) => Item.getWithPrice(price, limit)
        },

        searchItems: {
            type: new GraphQLList(itemType),
            args: {
                search: {
                    description: 'The name of the item to search for',
                    type: GraphQLString,
                },
                limit: {
                    description: 'The number of Items to return (> 0)',
                    type: GraphQLInt,
                }
            },
            resolve: (root, { search, limit }) => Item.searchItems(search, limit)
        }
    })
});

export const theStoreSchema = new GraphQLSchema({
  query: queryType,
  types: [ itemType ]
});
