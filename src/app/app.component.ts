import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    const config = {
      apiKey: "AIzaSyDss-kXnRvDiYNOWNXVKWgG7UAcQV4ujSw",
      authDomain: "gothiquos-blog.firebaseapp.com",
      databaseURL: "https://gothiquos-blog.firebaseio.com",
      projectId: "gothiquos-blog",
      storageBucket: "gothiquos-blog.appspot.com",
      messagingSenderId: "928838595839"
    };
    firebase.initializeApp(config);
  }
}
