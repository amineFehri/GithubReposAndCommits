import { Injectable } from '@angular/core';
import { MappedRepo } from '../models/repo.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchRepoResponse } from '../models/search-repo-response';
import { Observable, map } from 'rxjs';
import { Commit } from '../models/commit.model';
const BASE_URL = 'https://api.github.com/';

@Injectable({
  providedIn: 'root'
})
export class RepoService {

  constructor(private http: HttpClient) {}

  search(query: string, page: number) {
    let params = new HttpParams();
    params = params.append('q',query);
    params = params.append('page', page);
    return this.http.get<SearchRepoResponse>(`${BASE_URL}search/repositories`, {params})
    .pipe(map(this.fetchInfosFromRepo));
  }

  //* mapped data to MappedRepo Model
  fetchInfosFromRepo(response: SearchRepoResponse): MappedRepo {
    const { total_count: reposTotalCount, items } = response;
    const repos = items.map(item => ({
      owner: {
        avatarUrl: item.owner.avatar_url,
        login: item.owner.login,
      },
      name: item.name,
      language: item.language,
      stars: item.stargazers_count,
      creationDate: item.created_at
    }));

    return { reposTotalCount, repos };
  }


  getCommitsByRepo(owner: string, repoName: string): Observable<Commit[]> {
    return this.http.get<Commit[]>(`${BASE_URL}repos/${owner}/${repoName}/commits`)
    .pipe(map(this.mappedCommitData));
  }

  //* Mapped Commit data to Commit Model
  mappedCommitData(data: any[]): Commit[] {
    let commits: Commit[] = [];
     data.map((commitItem) => {
      const result = {
        author: commitItem.commit.author.name,
        url: commitItem.html_url,
        message: commitItem.commit.message
      }
      commits.push(result);
    })
    return commits;
  }

}
