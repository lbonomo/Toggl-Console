import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Necesario para poder utiliar NgForm
import { FormsModule } from '@angular/forms'


// Components
import { SettingsComponent } from './components/settings/settings.component';

// Routes
import { APP_ROUTING } from './app-routes';


@NgModule({
    declarations: [
        SettingsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        APP_ROUTING,
    ],
    providers: [],
    bootstrap: [SettingsComponent]
})
export class AppModule { }
