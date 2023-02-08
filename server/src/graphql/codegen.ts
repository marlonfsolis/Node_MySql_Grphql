
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/graphql/schema.graphql",

  generates: {
    "src/graphql/resolvers-types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        useIndexSignature: true,
        // contextType: "./Graphql.ctx#GraphqlContext"
      }
    }
  }
};

export default config;