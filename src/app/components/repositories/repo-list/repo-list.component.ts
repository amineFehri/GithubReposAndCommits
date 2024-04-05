import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  inject,
} from '@angular/core';
import { RepoService } from '../../../services/repo.service';
import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { MappedRepo, Repo } from '../../../models/repo.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { OtherFiltersPipe } from '../../../pipes/other-filters.pipe';
import { Commit } from '../../../models/commit.model';

@Component({
  selector: 'app-repo-list',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, DatePipe, OtherFiltersPipe],
  templateUrl: './repo-list.component.html',
  styleUrl: './repo-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepoListComponent implements OnChanges {
  private route = inject(ActivatedRoute);

  private router = inject(Router);

  currentPage: number = 1; //? Numéro de page actuel

  @Input()
  queryFilter: string = '';

  @Input()
  filterCriteria: any;

  private repoService = inject(RepoService);

  reposSearch$ = new BehaviorSubject<Repo[]>([]);

  ngOnChanges(): void {
    this.reposSearch$.next([]);
    //*? get query value from current route
    this.route.queryParamMap.subscribe((r: ParamMap) => {
      this.queryFilter = r.get('q') || '';
      this.getListRepos();
    });
  }

  getListRepos(): void {
    if (this.queryFilter) {
      this.repoService.search(
        this.queryFilter,
        this.currentPage
      ).subscribe((res: any) => {
        const currentList = this.reposSearch$.getValue();
        const newList = currentList.concat(res.repos);
        this.reposSearch$.next(newList);
      });
    }
  }

  loadMore(): void {
    this.currentPage++;
    this.getListRepos();
  }

  navigateToCommits(owner: string, repository: string): void {
    this.router.navigate(['/commits', owner, repository])
  }

}
