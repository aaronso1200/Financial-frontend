import {POST} from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment} from '../../environments/environment';


const BACKEND_URL = environment.backendURL + '/posts';

// Option 1 to provide service for entire app @Injectable
@Injectable({providedIn: 'root'})
export class PostService {
  private posts: POST[] = [];
  private postsUpdated = new Subject<{posts: POST[], postCount: number}>();

  constructor(private http: HttpClient, private router: Router ) {

  }

  getPosts(postsPerPage: number, currentPage: number ) {
    const queryParams = `?pageSize=${postsPerPage}&page=${currentPage}`;
    this.http.get<{message: string, posts: any, maxPosts: number }>(BACKEND_URL + queryParams)
    .pipe(map((postData) => {
      return {
        posts: postData.posts.map(post => {
        return {
          title: post.title,
          content: post.content,
          id: post._id,
          imagePath: post.imagePath,
          creator: post.creator,
          creator_id: post.creator_id
          };
        }),
        maxPosts: postData.maxPosts
      };
    }))
    .subscribe((transformedPosts) => {                  // Subscribe to http get
        this.posts = transformedPosts.posts;
        console.log(this.posts);
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPosts.maxPosts
        });
    });

  }

  getPost(id: string) {
      return this.http.get<{_id: string; title: string; content: string, imagePath: string}>(BACKEND_URL + '/' + id);
  }

  // The only function is to export the private postsUpdated field to other components
  // More about Observable https://blog.angulartraining.com/rxjs-subjects-a-tutorial-4dcce0e9637f
  getPostsUpdateListener() {
    return this.postsUpdated.asObservable();  // asObservable is used so subscribers will not be able to "mess" with this Subject.
  }

  autoRandomPost() {
    this.http.post<{message: string, post: POST}>(BACKEND_URL + '/random', null)
    .subscribe(
    );
  }

  addPost(title: string, content: string, image: File ) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);
    this.http.post<{message: string, post: POST}>(BACKEND_URL, postData)
    .subscribe((responseData) => {
      // const post: POST = {id: responseData.post.id, title: responseData.post.title,
      //   content: responseData.post.content, imagePath: responseData.post.imagePath};
      // this.posts.push(post);
      // this.postsUpdated.next([...this.posts]);
      this.router.navigate(['/']);
    });

  }
  updatePost(id: string, title: string, content: string, image: File | string) {
    let postData: FormData|POST;
    if (typeof(image) === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append ('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    } else {
      postData = {id: id, title: title, content: content, imagePath: image};
    }
    this.http.put(BACKEND_URL + '/' + id, postData)
    .subscribe(response => {
      // const updatedPosts = [...this.posts];
      // const post: POST = {id: id, title: title, content: content, imagePath: ''};
      // const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
      // updatedPosts[oldPostIndex] = post;
      // this.posts = updatedPosts;
      // this.postsUpdated.next([...this.posts]);
      this.router.navigate(['/']);
    });
  }
  deletePost(postId: string) {
    return this.http.delete(BACKEND_URL + '/' + postId);
    // .subscribe(() => {
    //   const updatedPosts = this.posts.filter(post => post.id !== postId);
    //   this.posts = updatedPosts;
    //   this.postsUpdated.next([...this.posts]);
    // });
  }
}
