import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription, Observable, of } from 'rxjs';
import {PageEvent} from '@angular/material';
import { MatPaginator } from '@angular/material';
import * as $ from 'jquery';

import {POST} from '../post.model';
import { PostService } from '../post.service';
import { AuthService } from 'src/app/auth/auth.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
@ViewChild(MatPaginator) paginator: MatPaginator;
posts: any[] = [];
private postsSub: Subscription;
private profileSub: Subscription;
isLoading = false;
totalPosts = 0;
postsPerPage = 5;
currentPage = 1;
pageSizeOptions = [1, 2, 5, 10];
profile:any;

userAuthenticated = false;
private authListener: Subscription;

 // The public method create an instance of the postservice in this file and let it accessible in this component.
 constructor(public postsService: PostService, private authService: AuthService) {
 }

 // Recommend to do all the intialization in ngOnInit and create all service instnace in constructor due to how angular work
 ngOnInit() {
  //  this.initializeArrary();
   this.paginator._intl.itemsPerPageLabel = 'Posts per page:';
   this.isLoading = true;
   this.profileSub = this.authService.getProfileListener().subscribe( (result)=> {
     this.profile = result;
   });
   this.postsService.getPosts(this.postsPerPage, this.currentPage);

   this.postsSub = this.postsService.getPostsUpdateListener() // Acutally subscribe to postUpdated
   .subscribe((postData: {posts: any[], postCount: number}) => {
      this.isLoading = false;
      this.posts = postData.posts;
      this.totalPosts = postData.postCount;
    });
  this.authListener = this.authService.getAuthTokenListener()
  .subscribe(isAuthenticated => {
    this.userAuthenticated = isAuthenticated;
  });

  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    // this.initializeArrary(); Angular animation
  }

  // (@DeleteDom.done)= "deleteAnimationDone(i,post.id)" [@DeleteDom] = "currentstate[i]"
  // accountOnDelete(postId: string, index: number) {
  //   console.log(index);
  //   this.currentstate[index] = 'delete';

  // }
  // initializeArrary() {
  //   this.currentstate = [];
  //   for (let i = 0; i < this.postsPerPage; i++) {
  //     this.currentstate.push('initial');
  //   }
  // }

  // deleteAnimationDone(index: number, postId: string) {

  //   if (this.currentstate[index] === 'delete') {
  //     console.log(postId);
  //     this.postsService.deletePost(postId);
  //     this.currentstate[index] = 'initial';
  //   }
  // }

  onDelete(id: string) {
    $('#' + id).hide('slow', () => {this.postsService.deletePost(id).subscribe(() => {
      this.isLoading = true;
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    }); });
  }

  ngOnDestroy() {
    this.authListener.unsubscribe();
    this.postsSub.unsubscribe();
    this.profileSub.unsubscribe();
  }
}
