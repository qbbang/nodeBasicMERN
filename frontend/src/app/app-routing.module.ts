import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WebhookRotingModule} from './webhook/webhook.routing.module';
const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    WebhookRotingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
