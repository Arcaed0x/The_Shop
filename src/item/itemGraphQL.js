import {
    GraphQLEnumType,
    GraphQLInterfaceType,
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLString,
    GraphQLFloat
}  from 'graphql/type';

export const itemType = new GraphQLObjectType({
    name: 'Item',
    description: 'An Item that is present in the store',
    fields: () => ({
        name: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'The name of the item.',
        },
        image: {
            type: new GraphQLNonNull(GraphQLString),
            description: "The image link of the item.",
        },
        price: {
            type: new GraphQLNonNull(GraphQLFloat),
            description: "The price of the item.",
        },
        category: {
            type: new GraphQLList(GraphQLString),
            description: "The categories of an item.",
        }
    }),
});
