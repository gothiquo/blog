import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from "../models/post.model";
import {Subscription} from "rxjs/Subscription";
import {PostService} from "../services/post.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit,OnDestroy {

  posts: Post[];
  postsSubscription: Subscription;

  constructor(private postService: PostService,
              private router: Router) { }

  ngOnInit() {
    this.postsSubscription = this.postService.postsSubject.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
    this.postService.emitPosts();
  }

  onNewPost() {
    this.router.navigate(['/posts', 'new']);
  }

  onDeletePost(post: Post) {
    if (confirm('Are you sure to delete this Post?')) {
      this.postService.removePost(post);
    } else {
      return null;
    }
  }

  onViewPost(id: number) {
    this.router.navigate(['posts', 'view', id]);
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }

}
