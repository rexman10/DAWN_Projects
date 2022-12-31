import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PilotosComponent } from './pilotos/pilotos.component';
import { PistasComponent } from './pistas/pistas.component';
import { StatsComponent } from './stats/stats.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'pilotos', component: PilotosComponent },
  { path: 'pistas', component: PistasComponent },
  { path: 'stats', component: StatsComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
