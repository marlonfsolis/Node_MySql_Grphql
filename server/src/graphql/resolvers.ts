const resolvers = {
    Query: {
        permissions: () => [
            {name: `Permission`, description: `Permission 1`}
        ],
    },
};

export default resolvers;
