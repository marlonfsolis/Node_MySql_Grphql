import path from "path";
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import {print} from "graphql";

const typesArray = loadFilesSync([
    path.join(__dirname, 'permission.graphql'),
    path.join(__dirname, 'role.graphql')
], { recursive: true, extensions: ['graphql'] });
const typeDefs = mergeTypeDefs(typesArray);
const printedTypeDefs = print(typeDefs);

export default printedTypeDefs;
