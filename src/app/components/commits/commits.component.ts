import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { RepoService } from '../../services/repo.service';
import { Observable } from 'rxjs';
import { Commit } from '../../models/commit.model';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-commits',
  standalone: true,
  imports: [NgIf, AsyncPipe, NgFor],
  providers: [RepoService],
  templateUrl: './commits.component.html',
  styleUrl: './commits.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommitsComponent implements OnInit {
  @Input() owner!: string;
  @Input() repository!: string;

  private repoService = inject(RepoService);

  commits$!:Observable<Commit[]>;


  ngOnInit(): void {
    this.loadCommitsDetails();
  }

  loadCommitsDetails(): void {
    this.commits$ = this.repoService.getCommitsByRepo(this.owner, this.repository);
  }
}
