import {Injectable} from "@angular/core";
import {Post} from "../models/post.model";
import {Subject} from "rxjs/Subject";
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable()
export class PostService {

  posts: Post[] = [];
  postsSubject = new Subject<Post[]>();

  emitPosts() {
    this.postsSubject.next(this.posts);
  }

  savePosts() {
    firebase.database().ref('/posts').set(this.posts);
  }

  getPosts() {
    firebase.database().ref('/posts')
      .on('value', (data: DataSnapshot) => {
        this.posts = data.val() ? data.val() : [];
        this.emitPosts();
      });
  }

  getSinglePost(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/posts/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewPost(newPost: Post) {
    this.posts.push(newPost);
    this.savePosts();
    this.emitPosts()
  }

  removePost(post: Post) {
    const postIndexToRemove = this.posts.findIndex(
      (postEl) => {
        if (postEl === post) {
          return true;
        }
      }
    );
    this.posts.splice(postIndexToRemove, 1);
    this.savePosts();
    this.emitPosts();
  }

  addLike(id: number) {
    this.posts[+ id].likes++;
    this.savePosts();
    this.emitPosts();
  }

  addDislike(id: number) {
    this.posts[+ id].likes--;
    this.savePosts();
    this.emitPosts();
  }

  resetAllLikes() {
    for (let i = 0; i < this.posts.length; i++) {
      this.posts[i].likes = 0;
    }
    this.savePosts();
    this.emitPosts();
  }

  resetPostLikes(id: number) {
    this.posts[+ id].likes = 0;
    this.savePosts();
    this.emitPosts();
  }
}
