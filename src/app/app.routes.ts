import { Routes } from '@angular/router';
import { AdmisionesComponent } from './pages/admisiones/admisiones.component';
import { CotelComponent } from './pages/cotel/cotel.component';
import { OfertaAcademicaComponent } from './pages/oferta-academica/oferta-academica.component';
import { VidaAcademicaComponent } from './pages/vida-academica/vida-academica.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ConoceNuestrosProgramasComponent } from './pages/conoce-nuestros-programas/conoce-nuestros-programas.component';

export const routes: Routes = [

    {
        path: 'ConoceNuestros',
        component: ConoceNuestrosProgramasComponent
    },
     {
        path: 'cotel',
        component: CotelComponent
    },
    {
        path: 'oferta-academica',
        component: OfertaAcademicaComponent
    },
    {
        path: 'admisiones',
        component: AdmisionesComponent
    },
    
    {
        path: 'investigacion-y-creacion',
        component: VidaAcademicaComponent
    },
    // (Opcional) Redirige la ruta raíz (/) a "la-universidad" por defecto
   
    {
        path: 'vida-academica',
        component: VidaAcademicaComponent
    },

    {
        path: '',
        redirectTo: 'la-universidad',
        pathMatch: 'full'
    },

    {
        path: 'Menu',
        component: MenuComponent
    }

    

];


