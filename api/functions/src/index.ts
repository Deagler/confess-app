import * as functions from 'firebase-functions';
import {ConstructGraphQLServer} from './graphql/server';

const USCentralRegion = functions.SUPPORTED_REGIONS[0];
exports.graph = functions.region(USCentralRegion).https.onRequest(ConstructGraphQLServer());
