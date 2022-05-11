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
  /** Comment ID */
  id: Scalars['ID'];
  /** Comment Content */
  note: Scalars['String'];
  /** User ID */
  user: User;
};

export type CreateCommentInput = {
  /** Comment Content */
  commentContent: Scalars['String'];
  /** Comment ID */
  commentId: Scalars['String'];
  /** User ID */
  userID: Scalars['String'];
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
  createTask: Scalars['String'];
  deleteMember: Scalars['Boolean'];
  deleteTask: Scalars['Boolean'];
  editProject: Scalars['Boolean'];
  editTask: Scalars['Boolean'];
  inviteToProject: Scalars['Boolean'];
  projectId: Scalars['String'];
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
  projectId: Scalars['String'];
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
  createNote: Note;
  createProject: Project;
  createRole: Role;
  createTask: Task;
  createUser: UserResponse;
  deleteUser: User;
  login: UserResponse;
  removeComment: Comment;
  removeMember: Member;
  removeNote: Note;
  removeProject: Project;
  removeRole: Role;
  removeTask: Task;
  updateComment: Comment;
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


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRemoveCommentArgs = {
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


export type QueryTaskArgs = {
  id: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['String'];
};

export type Role = {
  __typename?: 'Role';
  assignTask: Scalars['Boolean'];
  /** User ID */
  createTask: Scalars['Boolean'];
  deleteMember: Scalars['Boolean'];
  deleteTask: Scalars['Boolean'];
  editProject: Scalars['Boolean'];
  editTask: Scalars['Boolean'];
  /** Role ID */
  id: Scalars['ID'];
  inviteToProject: Scalars['Boolean'];
  /** Projact ID */
  project: Project;
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
  commentContent?: InputMaybe<Scalars['String']>;
  /** Comment ID */
  commentId?: InputMaybe<Scalars['String']>;
  /** User ID */
  userID?: InputMaybe<Scalars['String']>;
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
  createTask?: InputMaybe<Scalars['String']>;
  deleteMember?: InputMaybe<Scalars['Boolean']>;
  deleteTask?: InputMaybe<Scalars['Boolean']>;
  editProject?: InputMaybe<Scalars['Boolean']>;
  editTask?: InputMaybe<Scalars['Boolean']>;
  inviteToProject?: InputMaybe<Scalars['Boolean']>;
  projectId?: InputMaybe<Scalars['String']>;
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
  projectId?: InputMaybe<Scalars['String']>;
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

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserResponse', token: string } };


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