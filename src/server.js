'use strict'

import { theStoreSchema } from './theStoreSchema';
import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress } from 'graphql-server-express';
import { graphiqlExpress } from 'graphql-server-express';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/dev_shop')

var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error: '))

const PORT = 4000;

var app = express();
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: theStoreSchema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
app.listen(PORT);
