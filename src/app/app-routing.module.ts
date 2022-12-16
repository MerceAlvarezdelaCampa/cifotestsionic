import { NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, PreloadAllModules, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';
import { VacancaResolver } from './services/detail.resolve.service';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
		...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'new-vacanca',
    loadChildren: () => import('./new-vacanca/new-vacanca.module').then( m => m.NewVacancaPageModule)
  },
  {
    path: 'detail-vacanca/:id',
    loadChildren: () => import('./detail-vacanca/detail-vacanca.module').then( m => m.DetailVacancaPageModule),
    resolve: {
      vacanca: VacancaResolver
    }
  },
  {
    path: 'detail-vacanca',
    loadChildren: () => import('./detail-vacanca/detail-vacanca.module').then( m => m.DetailVacancaPageModule),
    resolve: {
      vacanca: VacancaResolver
    }
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
