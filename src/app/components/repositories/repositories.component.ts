import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FilterComponent } from '../filter/filter.component';
import { RepoListComponent } from './repo-list/repo-list.component';
import { SearchComponent } from '../../shared/search/search.component';

@Component({
  selector: 'app-repositories',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FilterComponent, RepoListComponent, SearchComponent],
  templateUrl: './repositories.component.html',
  styleUrl: './repositories.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepositoriesComponent {
  queryFilter !: string;

  otherFilter: any;

  getQueryFilter(event: string) : void{
    this.queryFilter = event;
  }

  getOtherFilters(event: any): void {
    this.otherFilter = event
  }

}
