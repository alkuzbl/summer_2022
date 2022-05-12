import axios from 'axios';

import { RepositoryType, UserType } from '../redux/types';

const instance = axios.create({
  baseURL: 'https://api.github.com',
});

export const gitHubApi = {
  fetchUserByLogin: (userName: string) => instance.get<UserType>(`/users/${userName}`),
  getRepositories: ({ perPage, page, userName }: RequestGitHubType) =>
    instance.get<RepositoryType[]>(`/users/${userName}/repos`, {
      params: {
        per_page: perPage,
        page,
      },
    }),
};

export type RequestGitHubType = {
  userName: string;
  perPage: number;
  page: number;
};
