import { AlbumModel, ApiAlbumModel, SpotifyAlbumModel } from "../../models/AlbumModel";

export const SpotifyMockAlbums: SpotifyAlbumModel[] = [
  {
    name: 'Test Album',
    albumType: 'album',
    artists: [
      {
        name: 'Artist 1',
        externalUrls: {externalUrls: { spotify: 'https://spotify.com/artist1' }},
        href: 'https://api.spotify.com/v1/artists/1',
        id: '1',
        type: 'artist',
        uri: 'spotify:artist:1'
      },
      {
        name: 'Artist 2',
        externalUrls: {externalUrls: { spotify: 'https://spotify.com/artist2' }},
        href: 'https://api.spotify.com/v1/artists/2',
        id: '2',
        type: 'artist',
        uri: 'spotify:artist:2'
      }
    ],
    releaseDate: '2023-10-01',
    externalUrls: {externalUrls: { spotify: 'https://spotify.com/album' }},
    href: 'https://api.spotify.com/v1/albums/1',
    id: '1',
    images: [{ height: 640, url: 'https://image.url', width: 640 }],
    releaseDatePrecision: 'day',
    totalTracks: 10,
    value: 49.99,
    type: 'album',
    uri: 'spotify:album:1'
  },
  {
    name: 'Test Album 2',
    albumType: 'album 2',
    artists: [
      {
        name: 'Artist 3',
        externalUrls: {externalUrls: { spotify: 'https://spotify.com/artist3' }},
        href: 'https://api.spotify.com/v1/artists/1',
        id: '3',
        type: 'artist',
        uri: 'spotify:artist:1'
      },
      {
        name: 'Artist 4',
        externalUrls: {externalUrls: { spotify: 'https://spotify.com/artist4' }},
        href: 'https://api.spotify.com/v1/artists/2',
        id: '4',
        type: 'artist',
        uri: 'spotify:artist:2'
      }
    ],
    releaseDate: '2023-10-02',
    externalUrls: {externalUrls: { spotify: 'https://spotify.com/album' }},
    href: 'https://api.spotify.com/v1/albums/1',
    id: '2',
    images: [{ height: 640, url: 'https://image.url', width: 640 }],
    releaseDatePrecision: 'day',
    totalTracks: 10,
    value: 59.99,
    type: 'album',
    uri: 'spotify:album:2'
  },
];

export const FormatedUserMockAlbums: AlbumModel[] = [
  {
    id: '1',
    name: 'Album 1',
    value: 29.99,
    artistName: 'Artist 1',
    deletedAt: null,
    imageUrl: 'cover1.jpg',
    spotifyUrl: 'spotify-url-1',
  },
  {
    id: '2',
    name: 'Album 2',
    value: 39.99,
    artistName: 'Artist 2',
    deletedAt: null,
    imageUrl: 'cover2.jpg',
    spotifyUrl: 'spotify-url-2',
  },
]


export const UserMockAlbums: ApiAlbumModel[] = [
  {
    id: '1',
    name: 'Album 1',
    value: 10,
    spotify_url: 'https://spotify.com/album1',
    image_url: 'https://image.com/album1.jpg',
    artist_name: 'Artist 1',
    deleted_at: null,
  },
  {
    id: '2',
    name: 'Album 2',
    value: 20,
    spotify_url: 'https://spotify.com/album2',
    image_url: 'https://image.com/album2.jpg',
    artist_name: 'Artist 2',
    deleted_at: null,
  },
  {
    id: '3',
    name: 'Album 2',
    value: 20,
    spotify_url: 'https://spotify.com/album2',
    image_url: 'https://image.com/album2.jpg',
    artist_name: 'Artist 2',
    deleted_at: '2021-10-01',
  },
]

export const SpotifySearchMockAlbums: SpotifyAlbumModel[] = [
  {
    name: 'Test Album Jazz',
    albumType: 'album Jazz',
    artists: [
      {
        name: 'Artist 1',
        externalUrls: {externalUrls: { spotify: 'https://spotify.com/artist1' }},
        href: 'https://api.spotify.com/v1/artists/1',
        id: '1',
        type: 'artist',
        uri: 'spotify:artist:1'
      },
      {
        name: 'Artist 2',
        externalUrls: {externalUrls: { spotify: 'https://spotify.com/artist1' }},
        href: 'https://api.spotify.com/v1/artists/2',
        id: '2',
        type: 'artist',
        uri: 'spotify:artist:2'
      }
    ],
    releaseDate: '2023-10-01',
    externalUrls: {externalUrls: { spotify: 'https://spotify.com/artist1' }},
    href: 'https://api.spotify.com/v1/albums/1',
    id: '1',
    images: [{ height: 640, url: 'https://image.url', width: 640 }],
    releaseDatePrecision: 'day',
    totalTracks: 10,
    value: 20.22,
    type: 'album',
    uri: 'spotify:album:1'
  },
  {
    name: 'Test Album 2 Jazz',
    albumType: 'album 2 Jazz',
    artists: [
      {
        name: 'Artist 3',
        externalUrls: {externalUrls: { spotify: 'https://spotify.com/artist1' }},
        href: 'https://api.spotify.com/v1/artists/1',
        id: '3',
        type: 'artist',
        uri: 'spotify:artist:1'
      },
      {
        name: 'Artist 4',
        externalUrls: {externalUrls: { spotify: 'https://spotify.com/artist1' }},
        href: 'https://api.spotify.com/v1/artists/2',
        id: '4',
        type: 'artist',
        uri: 'spotify:artist:2'
      }
    ],
    releaseDate: '2023-10-02',
    externalUrls: {externalUrls: { spotify: 'https://spotify.com/artist1' }},
    href: 'https://api.spotify.com/v1/albums/1',
    id: '2',
    images: [{ height: 640, url: 'https://image.url', width: 640 }],
    releaseDatePrecision: 'day',
    totalTracks: 10,
    value: 30,
    type: 'album',
    uri: 'spotify:album:1'
  },
];