import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'modalpage',
    loadChildren: () => import('./modalpage/modalpage.module').then(m => m.ModalpagePageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'videoplay/:sid',
    loadChildren: () => import('./videoplay/videoplay.module').then(m => m.VideoplayPageModule)
  },
  {
    path: 'home-page',
    loadChildren: () => import('./home-page/home-page.module').then( m => m.HomePagePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'triage-questionaire',
    loadChildren: () => import('./triage-questionaire/triage-questionaire.module').then( m => m.TriageQuestionairePageModule)
  },
  {
    path: 'make-appointment/:type/:date/:notes/:slot/:id',
    loadChildren: () => import('./make-appointment/make-appointment.module').then( m => m.MakeAppointmentPageModule)
  },
  {
    path: 'timeslot/:type/:date/:notes/:id',
    loadChildren: () => import('./timeslot/timeslot.module').then( m => m.TimeslotPageModule)
  },
  {
    path: 'qrcode/:background/:symptoms/:pain_locale/:pain_frequency/:pain_radiation/:positioning/:ambulation/:temperature/:pain_level/:dificulty_level/:symptoms_duration',
    loadChildren: () => import('./qrcode/qrcode.module').then( m => m.QRCodePageModule)
  },
  {
    path: 'map/:search',
    loadChildren: () => import('./map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'contactos',
    loadChildren: () => import('./contactos/contactos.module').then( m => m.ContactosPageModule)
  },
  {
    path: 'mudar-password',
    loadChildren: () => import('./mudar-password/mudar-password.module').then( m => m.MudarPasswordPageModule)
  },
  {
    path: 'notificacoes',
    loadChildren: () => import('./notificacoes/notificacoes.module').then( m => m.NotificacoesPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'todas-consultas',
    loadChildren: () => import('./todas-consultas/todas-consultas.module').then( m => m.TodasConsultasPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
