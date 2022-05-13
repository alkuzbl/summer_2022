export type StatusType = 'idle' | 'loading' | 'failed' | 'succeed';

export type UserType = {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  public_repos: number;
  followers: number;
  following: number;
};

export type RepositoryType = {
  id: number;
  name: string;
  private: boolean;
  html_url: string;
  description: string;
  fork: boolean;
};

export type InitStateUserType = {
  status: StatusType;
  user: UserType;
  error: string | null;
};

export type InitStateRepositoryType = {
  status: StatusType;
  repository: RepositoryType[];
  currentPage: number;
  defaultIndex: number;
  error: string | null;
};
