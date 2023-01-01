import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { PilotosComponent } from './pilotos/pilotos.component';
import { PistasComponent } from './pistas/pistas.component';
import { StatsComponent } from './stats/stats.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PilotosComponent,
    PistasComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
