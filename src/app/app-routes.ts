import { RouterModule, Routes } from '@angular/router';

// Components
import { SettingsComponent } from './components/settings/settings.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const APP_ROUTES:Routes = [
    { path: 'settings', component: SettingsComponent },
    { path: 'home', component: DashboardComponent },

    // Default route
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
]

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
