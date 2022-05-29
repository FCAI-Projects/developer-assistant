import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Comment = {
  __typename?: 'Comment';
  /** Comment Content */
  content: Scalars['String'];
  /** Comment ID */
  id: Scalars['ID'];
  /** Relay to comment */
  replayTo: Scalars['String'];
  /** User ID */
  user: User;
};

export type CreateCommentInput = {
  /** Comment Content */
  content: Scalars['String'];
  /** Comment ID */
  replayTo?: InputMaybe<Scalars['String']>;
  /** User ID */
  user: Scalars['String'];
};

export type CreateGroupInput = {
  /** Group Members */
  members?: InputMaybe<Array<Scalars['String']>>;
  /** Group Name */
  name: Scalars['String'];
  /** Group Project */
  project: Scalars['String'];
};

export type CreateMemberInput = {
  badges: Scalars['String'];
  customId?: InputMaybe<Scalars['String']>;
  projectId: Scalars['String'];
  role: Scalars['String'];
  userId: Scalars['String'];
};

export type CreateNoteInput = {
  /** Task Note */
  note: Scalars['String'];
  /** Task Id */
  taskId: Scalars['String'];
  /** User Id */
  userId: Scalars['String'];
};

export type CreateProjectInput = {
  /** client email */
  clientEmail: Scalars['String'];
  /** description of project */
  describtion: Scalars['String'];
  /** project name */
  name: Scalars['String'];
};

export type CreateRoleInput = {
  assignTask: Scalars['Boolean'];
  createTask: Scalars['Boolean'];
  deleteMember: Scalars['Boolean'];
  deleteTask: Scalars['Boolean'];
  editProject: Scalars['Boolean'];
  editTask: Scalars['Boolean'];
  inviteToProject: Scalars['Boolean'];
  project: Scalars['String'];
  roleName: Scalars['String'];
};

export type CreateTaskInput = {
  /** Task assigned to */
  assign?: InputMaybe<Scalars['String']>;
  /** Task attachments */
  attachments?: InputMaybe<Array<Scalars['String']>>;
  /** Task deadline */
  deadline?: InputMaybe<Scalars['DateTime']>;
  /** Task description */
  description: Scalars['String'];
  /** Task docs */
  docs?: InputMaybe<Scalars['String']>;
  /** Task finished at */
  finishedAt?: InputMaybe<Scalars['DateTime']>;
  /** Task name */
  name: Scalars['String'];
  /** Task periority */
  periority?: InputMaybe<Scalars['String']>;
  /** Task Project ID */
  project: Scalars['String'];
  /** Task started at */
  startedAt?: InputMaybe<Scalars['DateTime']>;
  /** Task status */
  status?: InputMaybe<Scalars['String']>;
  /** Task tags */
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export type CreateUserInput = {
  /** Email of the user */
  email: Scalars['String'];
  /** First Name of the user */
  fname: Scalars['String'];
  /** Last Name of the user */
  lname: Scalars['String'];
  /** Password of the user */
  password: Scalars['String'];
};

export type Group = {
  __typename?: 'Group';
  /** Group Admin */
  admin: Scalars['String'];
  /** Group ID */
  id: Scalars['ID'];
  /** Group Members */
  members: Scalars['String'];
  /** Group Name */
  name: Scalars['String'];
  /** Group Project */
  project: Scalars['String'];
};

export type Member = {
  __typename?: 'Member';
  /** User Badge */
  badges: Scalars['String'];
  /** Custom Role */
  customRole?: Maybe<Role>;
  /** Member ID */
  id: Scalars['ID'];
  /** Projact ID */
  project: Project;
  /** User role in project */
  role: Scalars['String'];
  /** User ID */
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  addMember: Member;
  createComment: Comment;
  createGroup: Group;
  createNote: Note;
  createProject: Project;
  createRole: Role;
  createTask: Task;
  createUser: UserResponse;
  deleteUser: User;
  inviteToGroup: Group;
  login: UserResponse;
  removeComment: Comment;
  removeGroup: Group;
  removeMember: Member;
  removeNote: Note;
  removeProject: Project;
  removeRole: Role;
  removeTask: Task;
  updateComment: Comment;
  updateGroup: Group;
  updateMember: Member;
  updateNote: Note;
  updateProject: Project;
  updateRole: Role;
  updateTask: Task;
  updateUser: User;
};


export type MutationAddMemberArgs = {
  createMemberInput: CreateMemberInput;
};


export type MutationCreateCommentArgs = {
  createCommentInput: CreateCommentInput;
};


export type MutationCreateGroupArgs = {
  createGroupInput: CreateGroupInput;
};


export type MutationCreateNoteArgs = {
  createNoteInput: CreateNoteInput;
};


export type MutationCreateProjectArgs = {
  createProjectInput: CreateProjectInput;
};


export type MutationCreateRoleArgs = {
  createRoleInput: CreateRoleInput;
};


export type MutationCreateTaskArgs = {
  createTaskInput: CreateTaskInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationInviteToGroupArgs = {
  groupId: Scalars['String'];
  memberId: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRemoveCommentArgs = {
  id: Scalars['String'];
};


export type MutationRemoveGroupArgs = {
  id: Scalars['String'];
};


export type MutationRemoveMemberArgs = {
  id: Scalars['String'];
};


export type MutationRemoveNoteArgs = {
  id: Scalars['String'];
};


export type MutationRemoveProjectArgs = {
  id: Scalars['String'];
};


export type MutationRemoveRoleArgs = {
  id: Scalars['String'];
};


export type MutationRemoveTaskArgs = {
  id: Scalars['String'];
};


export type MutationUpdateCommentArgs = {
  id: Scalars['String'];
  updateCommentInput: UpdateCommentInput;
};


export type MutationUpdateGroupArgs = {
  updateGroupInput: UpdateGroupInput;
};


export type MutationUpdateMemberArgs = {
  id: Scalars['String'];
  updateMemberInput: UpdateMemberInput;
};


export type MutationUpdateNoteArgs = {
  id: Scalars['String'];
  updateNoteInput: UpdateNoteInput;
};


export type MutationUpdateProjectArgs = {
  id: Scalars['String'];
  updateProjectInput: UpdateProjectInput;
};


export type MutationUpdateRoleArgs = {
  id: Scalars['String'];
  updateRoleInput: UpdateRoleInput;
};


export type MutationUpdateTaskArgs = {
  id: Scalars['String'];
  updateTaskInput: UpdateTaskInput;
};


export type MutationUpdateUserArgs = {
  user: UpdateUserInput;
};

export type Note = {
  __typename?: 'Note';
  /** Note ID */
  id: Scalars['ID'];
  /** Task Note */
  note: Scalars['String'];
  /** Task Id */
  task: Task;
  /** User Id */
  user: User;
};

export type Project = {
  __typename?: 'Project';
  /** Client email */
  clientEmail: Scalars['String'];
  /** Project describtion */
  describtion: Scalars['String'];
  /** Project ID */
  id: Scalars['ID'];
  /** Projact name */
  name: Scalars['String'];
  /** Project owner */
  owner: User;
};

export type Query = {
  __typename?: 'Query';
  comment: Comment;
  comments: Array<Comment>;
  filterMembers: Array<Member>;
  filterNotes: Note;
  group: Group;
  groups: Array<Group>;
  member: Member;
  note: Note;
  project: Project;
  projects: Array<Project>;
  role: Role;
  roles: Array<Role>;
  task: Task;
  tasks: Array<Task>;
  user: User;
  users: Array<User>;
};


export type QueryCommentArgs = {
  id: Scalars['String'];
};


export type QueryFilterMembersArgs = {
  filter: UpdateMemberInput;
};


export type QueryFilterNotesArgs = {
  filter: CreateNoteInput;
};


export type QueryGroupArgs = {
  id: Scalars['String'];
};


export type QueryMemberArgs = {
  id: Scalars['String'];
};


export type QueryNoteArgs = {
  id: Scalars['String'];
};


export type QueryProjectArgs = {
  id: Scalars['String'];
};


export type QueryRoleArgs = {
  id: Scalars['String'];
};


export type QueryRolesArgs = {
  project: Scalars['String'];
};


export type QueryTaskArgs = {
  id: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['String'];
};

export type Role = {
  __typename?: 'Role';
  assignTask: Scalars['Boolean'];
  createTask: Scalars['Boolean'];
  deleteMember: Scalars['Boolean'];
  deleteTask: Scalars['Boolean'];
  editProject: Scalars['Boolean'];
  editTask: Scalars['Boolean'];
  /** Role ID */
  id: Scalars['ID'];
  inviteToProject: Scalars['Boolean'];
  /** Project ID */
  project: Project;
  /** Role Name */
  roleName: Scalars['String'];
};

export type Task = {
  __typename?: 'Task';
  /** Task assigned to */
  assign: User;
  /** Task attachments */
  attachments: Array<Scalars['String']>;
  /** Task deadline */
  deadline: Scalars['DateTime'];
  /** Task description */
  description: Scalars['String'];
  /** Task docs */
  docs: Scalars['String'];
  /** Task finished at */
  finishedAt: Scalars['DateTime'];
  /** Task ID */
  id: Scalars['ID'];
  /** Task name */
  name: Scalars['String'];
  /** Task periority */
  periority: Scalars['String'];
  /** Task Project ID */
  project: Project;
  /** Task started at */
  startedAt: Scalars['DateTime'];
  /** Task status */
  status: Scalars['String'];
  /** Task tags */
  tags: Array<Scalars['String']>;
};

export type UpdateCommentInput = {
  /** Comment Content */
  content?: InputMaybe<Scalars['String']>;
  /** Comment ID */
  replayTo?: InputMaybe<Scalars['String']>;
  /** User ID */
  user?: InputMaybe<Scalars['String']>;
};

export type UpdateGroupInput = {
  id: Scalars['String'];
  /** Group Members */
  members?: InputMaybe<Array<Scalars['String']>>;
  /** Group Name */
  name?: InputMaybe<Scalars['String']>;
  /** Group Project */
  project?: InputMaybe<Scalars['String']>;
};

export type UpdateMemberInput = {
  badges?: InputMaybe<Scalars['String']>;
  customId?: InputMaybe<Scalars['String']>;
  projectId?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type UpdateNoteInput = {
  /** Task Note */
  note?: InputMaybe<Scalars['String']>;
  /** Task Id */
  taskId?: InputMaybe<Scalars['String']>;
  /** User Id */
  userId?: InputMaybe<Scalars['String']>;
};

export type UpdateProjectInput = {
  /** client email */
  clientEmail?: InputMaybe<Scalars['String']>;
  /** description of project */
  describtion?: InputMaybe<Scalars['String']>;
  /** project name */
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateRoleInput = {
  assignTask?: InputMaybe<Scalars['Boolean']>;
  createTask?: InputMaybe<Scalars['Boolean']>;
  deleteMember?: InputMaybe<Scalars['Boolean']>;
  deleteTask?: InputMaybe<Scalars['Boolean']>;
  editProject?: InputMaybe<Scalars['Boolean']>;
  editTask?: InputMaybe<Scalars['Boolean']>;
  inviteToProject?: InputMaybe<Scalars['Boolean']>;
  project?: InputMaybe<Scalars['String']>;
  roleName?: InputMaybe<Scalars['String']>;
};

export type UpdateTaskInput = {
  /** Task assigned to */
  assign?: InputMaybe<Scalars['String']>;
  /** Task attachments */
  attachments?: InputMaybe<Array<Scalars['String']>>;
  /** Task deadline */
  deadline?: InputMaybe<Scalars['DateTime']>;
  /** Task description */
  description?: InputMaybe<Scalars['String']>;
  /** Task docs */
  docs?: InputMaybe<Scalars['String']>;
  /** Task finished at */
  finishedAt?: InputMaybe<Scalars['DateTime']>;
  /** Task name */
  name?: InputMaybe<Scalars['String']>;
  /** Task periority */
  periority?: InputMaybe<Scalars['String']>;
  /** Task Project ID */
  project?: InputMaybe<Scalars['String']>;
  /** Task started at */
  startedAt?: InputMaybe<Scalars['DateTime']>;
  /** Task status */
  status?: InputMaybe<Scalars['String']>;
  /** Task tags */
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export type UpdateUserInput = {
  /** Email of the user */
  email?: InputMaybe<Scalars['String']>;
  /** First Name of the user */
  fname?: InputMaybe<Scalars['String']>;
  /** Last Name of the user */
  lname?: InputMaybe<Scalars['String']>;
  /** Password of the user */
  password?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  /** User email */
  email: Scalars['String'];
  /** User first name */
  fname: Scalars['String'];
  /** User ID */
  id: Scalars['ID'];
  /** User last name */
  lname: Scalars['String'];
  /** User password */
  password?: Maybe<Scalars['String']>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  /** Token of the user */
  token: Scalars['String'];
};

export type CreateProjectMutationVariables = Exact<{
  createProjectInput: CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: string } };

export type ProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'Project', id: string, name: string, describtion: string }> };


export type RolesQueryVariables = Exact<{
  project: Scalars['String'];
}>;


export type RolesQuery = { __typename?: 'Query', roles: Array<{ __typename?: 'Role', roleName: string, createTask: boolean, deleteTask: boolean, editTask: boolean, assignTask: boolean, editProject: boolean, inviteToProject: boolean, deleteMember: boolean, id: string }> };

export type CreateRoleMutationVariables = Exact<{
  createRoleInput: CreateRoleInput;
}>;


export type CreateRoleMutation = { __typename?: 'Mutation', createRole: { __typename?: 'Role', id: string } };

export type RemoveRoleMutationVariables = Exact<{
  removeRoleId: Scalars['String'];
}>;


export type RemoveRoleMutation = { __typename?: 'Mutation', removeRole: { __typename?: 'Role', id: string } };

export type UpdateRoleMutationVariables = Exact<{
  updateRoleId: Scalars['String'];
  updateRoleInput: UpdateRoleInput;
}>;


export type UpdateRoleMutation = { __typename?: 'Mutation', updateRole: { __typename?: 'Role', id: string } };

export type UpdateProjectMutationVariables = Exact<{
  updateProjectId: Scalars['String'];
  updateProjectInput: UpdateProjectInput;
}>;


export type UpdateProjectMutation = { __typename?: 'Mutation', updateProject: { __typename?: 'Project', name: string, clientEmail: string, describtion: string } };

export type ProjectQueryVariables = Exact<{
  projectId: Scalars['String'];
}>;


export type ProjectQuery = { __typename?: 'Query', project: { __typename?: 'Project', id: string } };


export type CreateTaskMutationVariables = Exact<{
  createTaskInput: CreateTaskInput;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: { __typename?: 'Task', id: string } };

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserResponse', token: string } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', token: string } };


export const CreateProjectDocument = gql`
    mutation CreateProject($createProjectInput: CreateProjectInput!) {
  createProject(createProjectInput: $createProjectInput) {
    id
  }
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      createProjectInput: // value for 'createProjectInput'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const ProjectsDocument = gql`
    query Projects {
  projects {
    id
    name
    describtion
  }
}
    `;

/**
 * __useProjectsQuery__
 *
 * To run a query within a React component, call `useProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProjectsQuery(baseOptions?: Apollo.QueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, options);
      }
export function useProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, options);
        }
export type ProjectsQueryHookResult = ReturnType<typeof useProjectsQuery>;
export type ProjectsLazyQueryHookResult = ReturnType<typeof useProjectsLazyQuery>;
export type ProjectsQueryResult = Apollo.QueryResult<ProjectsQuery, ProjectsQueryVariables>;

export const RolesDocument = gql`
    query Roles($project: String!) {
  roles(project: $project) {
    roleName
    createTask
    deleteTask
    editTask
    assignTask
    editProject
    inviteToProject
    deleteMember
    id
  }
}
    `;

/**
 * __useRolesQuery__
 *
 * To run a query within a React component, call `useRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRolesQuery({
 *   variables: {
 *      project: // value for 'project'
 *   },
 * });
 */
export function useRolesQuery(baseOptions: Apollo.QueryHookOptions<RolesQuery, RolesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RolesQuery, RolesQueryVariables>(RolesDocument, options);
      }
export function useRolesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RolesQuery, RolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RolesQuery, RolesQueryVariables>(RolesDocument, options);
        }
export type RolesQueryHookResult = ReturnType<typeof useRolesQuery>;
export type RolesLazyQueryHookResult = ReturnType<typeof useRolesLazyQuery>;
export type RolesQueryResult = Apollo.QueryResult<RolesQuery, RolesQueryVariables>;
export const CreateRoleDocument = gql`
    mutation CreateRole($createRoleInput: CreateRoleInput!) {
  createRole(createRoleInput: $createRoleInput) {
    id
  }
}
    `;
export type CreateRoleMutationFn = Apollo.MutationFunction<CreateRoleMutation, CreateRoleMutationVariables>;

/**
 * __useCreateRoleMutation__
 *
 * To run a mutation, you first call `useCreateRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoleMutation` returns a tuple that includes:

export const UpdateProjectDocument = gql`
    mutation updateProject($updateProjectId: String!, $updateProjectInput: UpdateProjectInput!) {
  updateProject(id: $updateProjectId, updateProjectInput: $updateProjectInput) {
    name
    clientEmail
    describtion
  }
}
    `;
export type UpdateProjectMutationFn = Apollo.MutationFunction<UpdateProjectMutation, UpdateProjectMutationVariables>;

/**
 * __useUpdateProjectMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutation` returns a tuple that includes:

 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example

 * const [createRoleMutation, { data, loading, error }] = useCreateRoleMutation({
 *   variables: {
 *      createRoleInput: // value for 'createRoleInput'
 *   },
 * });
 */
export function useCreateRoleMutation(baseOptions?: Apollo.MutationHookOptions<CreateRoleMutation, CreateRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRoleMutation, CreateRoleMutationVariables>(CreateRoleDocument, options);
      }
export type CreateRoleMutationHookResult = ReturnType<typeof useCreateRoleMutation>;
export type CreateRoleMutationResult = Apollo.MutationResult<CreateRoleMutation>;
export type CreateRoleMutationOptions = Apollo.BaseMutationOptions<CreateRoleMutation, CreateRoleMutationVariables>;
export const RemoveRoleDocument = gql`
    mutation RemoveRole($removeRoleId: String!) {
  removeRole(id: $removeRoleId) {

 * const [updateProjectMutation, { data, loading, error }] = useUpdateProjectMutation({
 *   variables: {
 *      updateProjectId: // value for 'updateProjectId'
 *      updateProjectInput: // value for 'updateProjectInput'
 *   },
 * });
 */
export function useUpdateProjectMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectMutation, UpdateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectMutation, UpdateProjectMutationVariables>(UpdateProjectDocument, options);
      }
export type UpdateProjectMutationHookResult = ReturnType<typeof useUpdateProjectMutation>;
export type UpdateProjectMutationResult = Apollo.MutationResult<UpdateProjectMutation>;
export type UpdateProjectMutationOptions = Apollo.BaseMutationOptions<UpdateProjectMutation, UpdateProjectMutationVariables>;
export const ProjectDocument = gql`
    query Project($projectId: String!) {
  project(id: $projectId) {

    id
  }
}
    `;

export type RemoveRoleMutationFn = Apollo.MutationFunction<RemoveRoleMutation, RemoveRoleMutationVariables>;

/**
 * __useRemoveRoleMutation__
 *
 * To run a mutation, you first call `useRemoveRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeRoleMutation, { data, loading, error }] = useRemoveRoleMutation({
 *   variables: {
 *      removeRoleId: // value for 'removeRoleId'
 *   },
 * });
 */
export function useRemoveRoleMutation(baseOptions?: Apollo.MutationHookOptions<RemoveRoleMutation, RemoveRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveRoleMutation, RemoveRoleMutationVariables>(RemoveRoleDocument, options);
      }
export type RemoveRoleMutationHookResult = ReturnType<typeof useRemoveRoleMutation>;
export type RemoveRoleMutationResult = Apollo.MutationResult<RemoveRoleMutation>;
export type RemoveRoleMutationOptions = Apollo.BaseMutationOptions<RemoveRoleMutation, RemoveRoleMutationVariables>;
export const UpdateRoleDocument = gql`
    mutation UpdateRole($updateRoleId: String!, $updateRoleInput: UpdateRoleInput!) {
  updateRole(id: $updateRoleId, updateRoleInput: $updateRoleInput) {
    id
  }
}
    `;
export type UpdateRoleMutationFn = Apollo.MutationFunction<UpdateRoleMutation, UpdateRoleMutationVariables>;

/**
 * __useUpdateRoleMutation__
 *
 * To run a mutation, you first call `useUpdateRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRoleMutation, { data, loading, error }] = useUpdateRoleMutation({
 *   variables: {
 *      updateRoleId: // value for 'updateRoleId'
 *      updateRoleInput: // value for 'updateRoleInput'
 *   },
 * });
 */
export function useUpdateRoleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRoleMutation, UpdateRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRoleMutation, UpdateRoleMutationVariables>(UpdateRoleDocument, options);
      }
export type UpdateRoleMutationHookResult = ReturnType<typeof useUpdateRoleMutation>;
export type UpdateRoleMutationResult = Apollo.MutationResult<UpdateRoleMutation>;
export type UpdateRoleMutationOptions = Apollo.BaseMutationOptions<UpdateRoleMutation, UpdateRoleMutationVariables>;


/**
 * __useProjectQuery__
 *
 * To run a query within a React component, call `useProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useProjectQuery(baseOptions: Apollo.QueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, options);
      }
export function useProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, options);
        }
export type ProjectQueryHookResult = ReturnType<typeof useProjectQuery>;
export type ProjectLazyQueryHookResult = ReturnType<typeof useProjectLazyQuery>;
export type ProjectQueryResult = Apollo.QueryResult<ProjectQuery, ProjectQueryVariables>;

export const CreateTaskDocument = gql`
    mutation CreateTask($createTaskInput: CreateTaskInput!) {
  createTask(createTaskInput: $createTaskInput) {
    id
  }
}
    `;
export type CreateTaskMutationFn = Apollo.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      createTaskInput: // value for 'createTaskInput'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, options);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($createUserInput: CreateUserInput!) {
  createUser(createUserInput: $createUserInput) {
    token
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      createUserInput: // value for 'createUserInput'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;