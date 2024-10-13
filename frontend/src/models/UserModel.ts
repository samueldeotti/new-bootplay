export interface UserModel {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  walletId?: string;
}

export interface WalletModel {
  id: string;
  balance: number;
  points: number;
  lastUpdate: string;
}

export interface TransactionModel {
  id: string;
  value: number;
  created_at: string;
  points_earned: number;
  artist_name: string;
  album_name: string;
  spotify_url: string;
  image_url: string;
  deleted_at: string;
}

export interface ErrorModel {
  date: string,
  message: string,
  code: number
}
