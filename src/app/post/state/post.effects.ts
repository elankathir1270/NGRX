import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addPost,
  addPostSuccess,
  deletePost,
  deletePostSuccess,
  loadPost,
  loadPostSuccess,
  updatePost,
  updatePostSuccess,
} from './post.actions';
import { filter, map, mergeMap, switchMap } from 'rxjs';
import { PostService } from 'src/app/service/post.service';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';

@Injectable()
export class PostEffects {
  constructor(private actions: Actions, private postService: PostService) {}

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
            return updatePostSuccess({ post: action.post });
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
      switchMap((id) => {
        return this.postService.getPostById(id).pipe(
          map((post) => {
            const postData = [{ ...post, id }];
            return loadPostSuccess({ posts: postData });
          })
        );
      })
    );
  });
}
