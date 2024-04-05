import { ApplicationConfig } from '@angular/core';
import { Routes, provideRouter, withComponentInputBinding } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./app.routes'),
  },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
  ]
};
