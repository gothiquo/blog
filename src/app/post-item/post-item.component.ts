import { Component, OnInit } from '@angular/core';
import {Post} from "../models/post.model";
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../services/post.service";

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.css']
})
export class PostItemComponent implements OnInit {

  post: Post;

  constructor(private route: ActivatedRoute,
              private postService: PostService,
              private router: Router) { }

  ngOnInit() {
    this.post = new Post('', '');
    const id = this.route.snapshot.params['id'];
    this.postService.getSinglePost(+id).then(
      (post: Post) => {
        this.post = post;
      }
    );
  }

  onBack() {
    this.router.navigate(['posts']);
  }

}
