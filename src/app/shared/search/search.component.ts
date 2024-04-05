import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { RepoService } from '../../services/repo.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule, RouterLink],
  providers: [RepoService],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {

  searchValue : string = '';
  private router = inject(Router);

  @Output() onReadyquery : EventEmitter<string> = new EventEmitter<string>();

  searchSubmit() {
    if (this.searchValue) {
      this.onReadyquery.emit(this.searchValue);
      this.router.navigate(['/repos'], {queryParams : {q : this.searchValue}})
    }
  }
}
