import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../post/state/post.state';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  loadPost(): Observable<Post[]> {
    return this.http
      .get<Post[]>(
        `https://authdemo-e4db2-default-rtdb.firebaseio.com/posts.json`
      )
      .pipe(
        map((data) => {
          const posts: Post[] = [];
          for (let key in data) {
            const post = { ...data[key], id: key };
            posts.push(post);
          }
          return posts;
        })
      );
  }

  addPost(post: Post): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(
      `https://authdemo-e4db2-default-rtdb.firebaseio.com/posts.json`,
      post
    );
  }

  updatePost(post: Post): Observable<{ post: Post }> {
    const updatedPost = {
      [post.id]: { title: post.title, description: post.description },
    };
    return this.http.patch<{ post: Post }>(
      `https://authdemo-e4db2-default-rtdb.firebaseio.com/posts.json`,
      updatedPost
    );
  }

  deletePost(id: string) {
    return this.http.delete(
      `https://authdemo-e4db2-default-rtdb.firebaseio.com/posts/${id}.json`
    );
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(
      `https://authdemo-e4db2-default-rtdb.firebaseio.com/posts/${id}.json`
    );
  }
}
