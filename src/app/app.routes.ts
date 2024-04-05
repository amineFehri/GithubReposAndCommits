import { Routes } from '@angular/router';
import { RepositoriesComponent } from './components/repositories/repositories.component';
import { CommitsComponent } from './components/commits/commits.component';
import { HomeComponent } from './components/home/home.component';

export const REPOS_ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'repos',
        component: RepositoriesComponent,
      },
      {
        path: 'commits/:owner/:repository',
        component: CommitsComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
];

export default  REPOS_ROUTES;
