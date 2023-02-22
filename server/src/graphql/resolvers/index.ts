import path from "path";
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers } from '@graphql-tools/merge';

const resolversArray = loadFilesSync([
    path.join(__dirname, '**/*'),
    // path.join(__dirname, 'permission.ts'),
    // path.join(__dirname, 'role.ts')
], { recursive: true, extensions: ['ts', 'js'] });

const mergedResolvers = mergeResolvers(resolversArray);

export default mergedResolvers;
