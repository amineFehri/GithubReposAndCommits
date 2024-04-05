export interface Repo {
    creationDate: string;
    name: string;
    language?: string;
    stars: number;
    owner: {
        avatarUrl: string;
        login: string;
      };
  }

export interface MappedRepo {
    reposTotalCount : number;
    repos : Repo[];
}
