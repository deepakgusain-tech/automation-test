export interface Cookie {
  name: string;
  value: string;
  domain: string;
  path: string;
  expires?: number;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: string;
}

export interface StorageItem {
  name: string;
  value: string;
}

export interface Origin {
  origin: string;
  localStorage?: StorageItem[];
  sessionStorage?: StorageItem[];
}

export interface SessionState {
  cookies: Cookie[];
  origins?: Origin[];
}