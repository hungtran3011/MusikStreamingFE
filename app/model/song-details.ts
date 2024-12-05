export type SongDetails = {
  id: string;
  title: string;
  thumbnailurl?: string;
  duration: number;
  releasedate: string;
  genre: string;
  views: number;
  albums: ({
    album: {
      id?: string;
      type?: string;
      title?: string;
      thumbnailurl?: string;
    };
  } | undefined)[] | null;
  artists: {
    id: string;
    name: string;
    avatarurl: string;
  }[];
}