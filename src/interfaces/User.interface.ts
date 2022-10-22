// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace User {
  export interface info {
    avatar: any;
    name: string;
    email: string;
    password: string;
    favoriteMovies: any;
    ratingMovies: string;
    commentsSorted: any;
    comments: any;
  }

  export interface Comment {
    movieKinopoiskId: string;
    date: number;
    description: string;
    user: {
      avatar: {
        url: string;
      }
      name: string;
      userId: string;
    }
  }

  export enum descriptors {
    Avatar = 'avatar',
    Name = 'name',
    Email = 'email',
    Password = 'password',
    FavoriteMovies = 'favoriteMovies',
    RatingMovies = 'ratingMovies',
  }
}
