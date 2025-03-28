import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './service/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'counter',
    loadChildren: () =>
      import('./counter/counter.module').then((m) => m.CounterModule),
  },
  {
    path: 'postlist',
    loadChildren: () => import('./post/post.module').then((m) => m.PostModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
