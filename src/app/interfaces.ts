export interface User {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface LoginUser {
  username: string;
  password: string;
}

export interface Token {
  token: string;
}

export interface BlogPost {
  id?: number;
  title: string;
  body: string;
  created?: Date;
}

export interface BlogPage {
  results: BlogPost[];
  page_size: number;
  count: number;
  page_count: number;
  page_number: number;
}

export interface TokenDto {
  username: string;
  user_id: number;
  email: string;
  orig_iat: number;
  exp: number;
}
