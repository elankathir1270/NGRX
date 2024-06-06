import { authReducer } from "../auth/state/auth.reducer";
import { AuthState } from "../auth/state/auth.state";
import { counterReducer } from "../counter/state/counter.reducer";
import { CounterState } from "../counter/state/counter.state";
import { postsReducer } from "../post/state/post.reducer";
import { PostsState } from "../post/state/post.state";

export interface AppState {
  counter : CounterState,
  posts : PostsState,
  auth : AuthState
}

export const appReducer = {
  counter : counterReducer,
  posts : postsReducer,
  auth: authReducer
}
