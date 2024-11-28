import { Song } from "./song";

export type SongDetails = Song & {
  albums: [
    {
      album: {
        id: string;
        type: string;
        title: string;
        thumbnailurl: string;
      }
    }
  ],
  artists: [
    {
      id: string;
      name: string;
      avatarurl: string;
    }
  ]
}