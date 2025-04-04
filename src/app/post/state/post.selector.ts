import { getCurrentRoute } from 'src/app/store/router/route-selector';
import { postAdapter, PostsState } from './post.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterStateUrl } from 'src/app/store/router/custom-serilizer';

const getPostStates = createFeatureSelector<PostsState>('posts');

// export const getPosts = createSelector(getPostStates, (state) => {
//   return state.posts;
// });

// export const getPostById = createSelector(getPostStates, (state, props) => {
//   return state.posts.find((post) => post.id === props.id);
// });

// export const getPostByIdByRoute = createSelector(
//   getPosts,
//   getCurrentRoute,
//   (posts, route: RouterStateUrl) => {
//     return posts ? posts.find((post) => post.id === route.params['id']) : null;
//   }
// );

//After Entity Implementation
const postSelectors = postAdapter.getSelectors();

export const getPosts = createSelector(getPostStates, postSelectors.selectAll);

export const getPostEntities = createSelector(
  getPostStates,
  postSelectors.selectEntities
);

export const getPostByIdByRoute = createSelector(
  getPostEntities,
  getCurrentRoute,
  (posts, route: RouterStateUrl) => {
    return posts ? posts[route.params['id']] : null;
  }
);

export const getCount = createSelector(getPostStates, (state) => {
  return state.count;
});
