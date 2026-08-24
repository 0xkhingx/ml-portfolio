export interface NavLink {
  label: string;
  href: string;
}

export interface Track {
  name: string;
  artist: string;
  album: string;
  url?: string;
  imageUrl?: string;
}

export interface NowPlayingData {
  configured: boolean;
  isPlaying?: boolean;
  track?: Track | null;
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  minutes: number;
}

export interface Project {
  name: string;
  description: string;
  href: string;
}

export interface Experience {
  role: string;
  org: string;
  period: string;
  summary: string;
}

export interface ExternalPost {
  title: string;
  url: string;
  date: string;
  description: string;
  minutes: number;
}
