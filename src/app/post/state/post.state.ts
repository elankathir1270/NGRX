import { createEntityAdapter, EntityState } from '@ngrx/entity';

export interface Post {
  id?: string;
  title: string;
  description: string;
}
// export interface PostsState {
//   posts : Post[]
// }

// export const initialState : PostsState = {
//   posts : null
// }

//After Entity Implementation

export interface PostsState extends EntityState<Post> {
  count: number; //In entity if you want add property other than defined 'Post' can add like this.
}

export const postAdapter = createEntityAdapter<Post>({
  selectId: (post: Post) => post.id, //jst for example, if we dont give by default it will take id.
  //Entity will always need a unique key, mostly it will take 'id' if we need custom unique we give as like our wish

  sortComparer: sortByName, //we can sort the list like this
});

export const initialState: PostsState = postAdapter.getInitialState({
  count: 0,
});

export function sortByName(a: Post, b: Post): number {
  return a.title.localeCompare(b.title);
}
