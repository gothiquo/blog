export class Post {
  title: string;
  content: string;
  likes: number;
  created_at: Date;

  constructor(title: string, content: string) {
    this.title = title;
    this.content = content;
    this.likes = 0;
    this.created_at = new Date();
  }
}
