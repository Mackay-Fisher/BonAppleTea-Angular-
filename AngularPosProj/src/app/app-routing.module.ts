import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { CustomerViewComponent } from './customer-view/customer-view.component';

import { AuthGuard } from '@auth0/auth0-angular';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LearnMoreComponent } from './learn-more/learn-more.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerViewComponent,
    pathMatch: 'full',
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'contact',
    component: ContactUsComponent
  },
  {
    path: 'more-info',
    component: LearnMoreComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}