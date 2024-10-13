import { TransactionModel } from "../../models/UserModel";

export const MockTransactions: TransactionModel[] = [
  {
   id: '1',
   album_name: 'Album 1',
   artist_name: 'Artist 1',
   created_at: '2023-01-01T12:00:00Z',
   deleted_at: '',
   image_url: 'https://image-url.com',
   points_earned: 10,
   spotify_url: 'https://spotify-url.com',
   value: 200,
  },
  {
   id: '2',
   album_name: 'Album 2',
   artist_name: 'Artist 2',
   created_at: '2023-01-02T12:00:00Z',
   deleted_at: '',
   image_url: 'https://image-url.com',
   points_earned: 20,
   spotify_url: 'https://spotify-url.com',
   value: 300,
  },
  {
   id: '3',
   album_name: 'Album 3',
   artist_name: 'Artist 3',
   created_at: '2023-01-03T12:00:00Z',
   deleted_at: '',
   image_url: 'https://image-url.com',
   points_earned: 30,
   spotify_url: 'https://spotify-url.com',
   value: 400,
  }
]
