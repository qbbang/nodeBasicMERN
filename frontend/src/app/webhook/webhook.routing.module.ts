import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroComponent } from './container/intro/intro.component';
import { MainComponent } from './container/main/main.component';

const routes: Routes = [
    { path:'webhook/intro', component: IntroComponent },
    { path:'webhook/main', component: MainComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebhookRotingModule { }
