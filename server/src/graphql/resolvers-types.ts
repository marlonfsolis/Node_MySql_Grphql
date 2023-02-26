import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  /**  Create a new permission.  */
  permissionCreate?: Maybe<Permission>;
  /**  Delete a permission by it's name.  */
  permissionDelete?: Maybe<Permission>;
  /**  Create a role.  */
  roleCreate?: Maybe<Role>;
  /**  Delete a role.  */
  roleDelete?: Maybe<Role>;
};


export type MutationPermissionCreateArgs = {
  input: PermissionCreateUpdate;
};


export type MutationPermissionDeleteArgs = {
  input: PermissionDelete;
};


export type MutationRoleCreateArgs = {
  input: RoleCreateUpdate;
};


export type MutationRoleDeleteArgs = {
  input: RoleDelete;
};

/**  Permission type  */
export type Permission = {
  __typename?: 'Permission';
  /**  Description for the permission. Describe what the permission can do.  */
  description?: Maybe<Scalars['String']>;
  /**  The permission's name. It is unique.   */
  name: Scalars['String'];
};

/**  Information for create or update a permission.  */
export type PermissionCreateUpdate = {
  /**  The permission's description.  */
  description?: InputMaybe<Scalars['String']>;
  /**  A unique name for the permission.  */
  name: Scalars['String'];
};

/**  Information for delete a permission.  */
export type PermissionDelete = {
  /**  A unique name of the permission that need to be deleted.  */
  name: Scalars['String'];
};

/**  Information to search for permissions.  */
export type PermissionsRead = {
  /**  Filter by description.  */
  description?: InputMaybe<Scalars['String']>;
  /**  Search by description.   */
  description_s?: InputMaybe<Scalars['String']>;
  /**  What is the page size.  */
  fetchRows?: InputMaybe<Scalars['String']>;
  /**  Filter by name.  */
  name?: InputMaybe<Scalars['String']>;
  /**  Search by name.  */
  name_s?: InputMaybe<Scalars['String']>;
  /**  What is the current page.  */
  offsetRows?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  /**  Get a list of permissions.  */
  permissions?: Maybe<Array<Permission>>;
  /**  List of roles.  */
  roles?: Maybe<Array<Role>>;
};


export type QueryPermissionsArgs = {
  input: PermissionsRead;
};


export type QueryRolesArgs = {
  input: RolesRead;
};

/**  Role type. A role can group one or more permissions.  */
export type Role = {
  __typename?: 'Role';
  /**  Role's description. Describe what the role can do.  */
  description?: Maybe<Scalars['String']>;
  /**  The role's name. It is unique.  */
  name: Scalars['String'];
};

/**  Information to create or update a role.  */
export type RoleCreateUpdate = {
  /**  The role's description.  */
  description?: InputMaybe<Scalars['String']>;
  /**  A unique name for the role.  */
  name: Scalars['String'];
};

/**  Information to delete a role.  */
export type RoleDelete = {
  /**  A unique name of the role that need to be deleted.  */
  name: Scalars['String'];
};

/**  Information to search roles.  */
export type RolesRead = {
  /**  Filter by description.  */
  description?: InputMaybe<Scalars['String']>;
  /**  Search by description.   */
  description_s?: InputMaybe<Scalars['String']>;
  /**  What is the page size.  */
  fetchRows?: InputMaybe<Scalars['String']>;
  /**  Filter by name.  */
  name?: InputMaybe<Scalars['String']>;
  /**  Search by name.  */
  name_s?: InputMaybe<Scalars['String']>;
  /**  What is the current page.  */
  offsetRows?: InputMaybe<Scalars['String']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Mutation: ResolverTypeWrapper<{}>;
  Permission: ResolverTypeWrapper<Permission>;
  PermissionCreateUpdate: PermissionCreateUpdate;
  PermissionDelete: PermissionDelete;
  PermissionsRead: PermissionsRead;
  Query: ResolverTypeWrapper<{}>;
  Role: ResolverTypeWrapper<Role>;
  RoleCreateUpdate: RoleCreateUpdate;
  RoleDelete: RoleDelete;
  RolesRead: RolesRead;
  String: ResolverTypeWrapper<Scalars['String']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  Mutation: {};
  Permission: Permission;
  PermissionCreateUpdate: PermissionCreateUpdate;
  PermissionDelete: PermissionDelete;
  PermissionsRead: PermissionsRead;
  Query: {};
  Role: Role;
  RoleCreateUpdate: RoleCreateUpdate;
  RoleDelete: RoleDelete;
  RolesRead: RolesRead;
  String: Scalars['String'];
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  permissionCreate?: Resolver<Maybe<ResolversTypes['Permission']>, ParentType, ContextType, RequireFields<MutationPermissionCreateArgs, 'input'>>;
  permissionDelete?: Resolver<Maybe<ResolversTypes['Permission']>, ParentType, ContextType, RequireFields<MutationPermissionDeleteArgs, 'input'>>;
  roleCreate?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType, RequireFields<MutationRoleCreateArgs, 'input'>>;
  roleDelete?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType, RequireFields<MutationRoleDeleteArgs, 'input'>>;
}>;

export type PermissionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Permission'] = ResolversParentTypes['Permission']> = ResolversObject<{
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  permissions?: Resolver<Maybe<Array<ResolversTypes['Permission']>>, ParentType, ContextType, RequireFields<QueryPermissionsArgs, 'input'>>;
  roles?: Resolver<Maybe<Array<ResolversTypes['Role']>>, ParentType, ContextType, RequireFields<QueryRolesArgs, 'input'>>;
}>;

export type RoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Role'] = ResolversParentTypes['Role']> = ResolversObject<{
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Mutation?: MutationResolvers<ContextType>;
  Permission?: PermissionResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Role?: RoleResolvers<ContextType>;
}>;

