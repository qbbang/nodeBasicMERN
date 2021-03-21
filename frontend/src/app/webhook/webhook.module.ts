import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroComponent } from './container/intro/intro.component';
import { SharedModule } from '../shared/shared.module';
import { WebhookRotingModule } from './webhook.routing.module';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [IntroComponent],
  imports: [
    CommonModule,
    WebhookRotingModule,
    SharedModule.forRoot(),
  ]
})
export class WebhookModule { }
