import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addPost,
  addPostSuccess,
  deletePost,
  deletePostSuccess,
  dummyAction,
  loadPost,
  loadPostSuccess,
  updatePost,
  updatePostSuccess,
} from './post.actions';
import { filter, map, mergeMap, of, switchMap, withLatestFrom } from 'rxjs';
import { PostService } from 'src/app/service/post.service';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { Update } from '@ngrx/entity';
import { Post, PostsState } from './post.state';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { getPosts } from './post.selector';

@Injectable()
export class PostEffects {
  constructor(
    private actions: Actions,
    private postService: PostService,
    private store: Store<PostsState>
  ) {}

  loadPost = createEffect(() => {
    return this.actions.pipe(
      ofType(loadPost),
      mergeMap((action) => {
        return this.postService.loadPost().pipe(
          map((data) => {
            console.log(data);
            return loadPostSuccess({ posts: data });
          })
        );
      })
    );
  });

  addPost = createEffect(() => {
    return this.actions.pipe(
      ofType(addPost),
      mergeMap((action) => {
        return this.postService.addPost(action.post).pipe(
          map((data) => {
            //console.log(data);
            const post = { ...action.post, id: data.name };
            return addPostSuccess({ post });
          })
        );
      })
    );
  });

  updatePost = createEffect(() => {
    return this.actions.pipe(
      ofType(updatePost),
      mergeMap((action) => {
        return this.postService.updatePost(action.post).pipe(
          map((data) => {
            const updatedPost: Update<Post> = {
              id: action.post.id,
              changes: { ...action.post },
            };

            //After Entity Implementation
            return updatePostSuccess({ post: updatedPost });
            //return updatePostSuccess({ post: action.post });
          })
        );
      })
    );
  });

  deletePost = createEffect(() => {
    return this.actions.pipe(
      ofType(deletePost),
      mergeMap((action) => {
        return this.postService.deletePost(action.id).pipe(
          map((data) => {
            return deletePostSuccess({ id: action.id });
          })
        );
      })
    );
  });

  getSinglePost$ = createEffect(() => {
    return this.actions.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigationAction) => {
        return r.payload.routerState.url.startsWith('/postlist/details');
      }),
      map((r: RouterNavigationAction) => {
        return r.payload.routerState['params']['id'];
      }),
      withLatestFrom(this.store.select(getPosts)), // this is to avoid redundant api call
      switchMap(([id, posts]) => {
        if (!posts.length) {
          return this.postService.getPostById(id).pipe(
            map((post) => {
              const postData = [{ ...post, id }];
              return loadPostSuccess({ posts: postData });
            })
          );
        }
        return of(dummyAction());
      })
    );
  });
}
