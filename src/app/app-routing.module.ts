import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AdminguardService } from './services/guards/adminguard.service';
import { RoleguardService as RoleGuard } from './services/roleguard.service';

const routes: Routes = [
  { path: '', component: LoginComponent},

  {
    path: 'home',
    canActivate: [RoleGuard],
     component: HomeComponent
  },

  { path: 'login', component: LoginComponent},

  {
    path: 'admin',
    canActivate: [AdminguardService],
    component: AdminComponent
  },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule {

}
