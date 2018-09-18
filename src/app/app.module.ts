import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatCardModule
 } from '@angular/material';

import { NgModule } from '@angular/core';
// Necesario para poder utiliar NgForm
import { FormsModule } from '@angular/forms'

// Routes
import { APP_ROUTING } from './app-routes';

// Components
import { SettingsComponent } from './components/settings/settings.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


@NgModule({
    declarations: [
        SettingsComponent,
        DashboardComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,

        BrowserAnimationsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,
        MatToolbarModule,
        MatMenuModule,
        MatCardModule



        APP_ROUTING,
    ],
    providers: [],
    bootstrap: [DashboardComponent]
})
export class AppModule { }
