
export interface Post {
  id?: string,
  title: string,
  description: string
}
export interface PostsState {
  posts : Post[]
}

export const initialState : PostsState = {
  posts : null
}
