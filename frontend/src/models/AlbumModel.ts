export interface AlbumModel {
  id: string,
  name: string,
  value: number,
  artistName: string,
  spotifyUrl: string,
  imageUrl: string,
  deletedAt: string | null
}

export interface ApiAlbumModel {
  id: string
  name: string
  value: number
  artist_name: string
  spotify_url: string
  image_url: string
  deleted_at: string | null
}

export interface SpotifyAlbumModel {
  albumType: string
  artists: Artist[]
  externalUrls: ExternalUrls
  href: string
  id: string
  images: Image[]
  name: string
  releaseDate: string
  releaseDatePrecision: string
  totalTracks: number
  type: string
  uri: string
  value: number
}

export type Artist = {
  externalUrls: ExternalUrls
  href: string
  id: string
  name: string
  type: string
  uri: string
}

type ExternalUrls = {
  externalUrls: { spotify: string }
}

type Image = {
  height: number
  url: string
  width: number
}