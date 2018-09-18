import { RouterModule, Routes } from '@angular/router';

// Components
import { SettingsComponent } from './components/settings/settings.component';

const APP_ROUTES:Routes = [
    { path: 'settings', component: SettingsComponent },
    // Default route
    { path: '**', pathMatch: 'full', redirectTo: 'settings' }
]

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
