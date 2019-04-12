import { Action } from "@ngrx/store/src/models";
import { IBlogPost } from "@interfaces";

export enum EBlogAction {
  LoadBlogPosts = '[Blog] Load Blog Posts',
  LoadBlogPostsSuccess = '[Blog] Load Blog Posts Success',
  LoadBlogPostsError = '[Blog] Load Blog Posts Error',
}

export class LoadBlogPosts implements Action {
  public readonly type = EBlogAction.LoadBlogPosts;
}

export class LoadBlogPostsSuccess implements Action {
  public readonly type = EBlogAction.LoadBlogPostsSuccess;
  constructor(public payload: IBlogPost[]) { }
}

export class LoadBlogPostsError implements Action {
  public readonly type = EBlogAction.LoadBlogPostsError;
}

export type BlogAction = LoadBlogPosts  | LoadBlogPostsSuccess | LoadBlogPostsError;