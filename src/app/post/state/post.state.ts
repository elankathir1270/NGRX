
export interface Post {
  id?: string,
  title: string,
  description: string
}
export interface PostsState {
  posts : Post[]
}

export const initialState : PostsState = {
  posts : [
    {id: '1', title: "Title1", description: "Description1"},
    {id: '2', title: "Title2", description: "Description2"},
    {id: '3', title: "Title3", description: "Description3"},
  ]
}
