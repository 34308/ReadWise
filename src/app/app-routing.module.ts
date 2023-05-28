import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReviewComponent} from "./components/review/review.component";
import {SignupComponent} from "./components/signup/signup.component";
import {LoginComponent} from "./components/login/login.component";
import {BookDetailsComponent} from "./components/book-details/book-details.component";
import {FavoritesComponent} from "./components/favorites/favorites.component";
import {SettingsComponent} from "./components/settings/settings.component";
import {AuthGuard} from "./services/guard.service";
import {AddReviewComponent} from "./components/add-review/add-review.component";

const routes: Routes = [
  {
    path:"",
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path:"signup",
    component:SignupComponent
  },
  {
    path:"home",
    component:ReviewComponent},
  {
    path:"login",
    component:LoginComponent},
  {
    path:"detail/:id",
    component:BookDetailsComponent},
  {
    path:"favorite",
    component:FavoritesComponent,canActivate: [AuthGuard] },
  {
    path:"settings",
    component:SettingsComponent,canActivate: [AuthGuard] },
  {
    path:"add-review",
    component:AddReviewComponent,canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
