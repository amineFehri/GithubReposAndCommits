import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RepoService } from '../../services/repo.service';
import { SearchComponent } from '../../shared/search/search.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, SearchComponent],
  providers: [RepoService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
