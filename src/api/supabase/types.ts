export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface MusicColums {
  id: string;
  title?: string;
  duration?: number;
  music_file_path: string;
  wave_from_file_path: string;
  music_created_date?: string;
  bpm?: number;
  key_id?: number;
  key_name?: string;
  key_active: boolean;
  created_date?: string;
  updated_date?: string;
}

export interface MusicTable {
  public: {
    Tables: {
      Music_001: {
        Row: MusicColums;
        Insert: MusicColums;
        Update: MusicColums;
      };
    };
  };
}
