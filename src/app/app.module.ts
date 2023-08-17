import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BehavioralHealthResourcesComponent } from './behavioral-health-resources/behavioral-health-resources.component';

@NgModule({
  declarations: [
    AppComponent,
    BehavioralHealthResourcesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
