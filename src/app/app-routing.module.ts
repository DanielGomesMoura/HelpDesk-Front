import { TecnicoUpdateComponent } from './components/tecnico/tecnico-create-update-component/tecnico-create-update-component.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { ClienteUpdateComponent } from './components/cliente/cliente-create-update-component/cliente-create-update-component.component';
import { ClienteListComponent } from './components/cliente/cliente-list/cliente-list.component';
import { ChamadoListComponent } from './components/chamado/chamado-list/chamado-list.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: '', component: NavComponent, canActivate: [AuthGuard], children: [
      {path: 'home' , component: HomeComponent },


      {path: 'tecnicos',            component: TecnicoListComponent},
      {path: 'tecnicos/create',     component: TecnicoUpdateComponent},
      {path: 'tecnicos/update/:id', component: TecnicoUpdateComponent},

      {path: 'clientes',            component:  ClienteListComponent},
      {path: 'clientes/create',     component: ClienteUpdateComponent},
      {path: 'clientes/update/:id', component: ClienteUpdateComponent},

      {path: 'chamados',            component: ChamadoListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
