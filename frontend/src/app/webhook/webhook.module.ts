import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroComponent } from './container/intro/intro.component';
import { SharedModule } from '../shared/shared.module';
import { WebhookRotingModule } from './webhook.routing.module';
import { MainComponent } from './container/main/main.component';
import { WebhookAdapter } from './webhook.model';
import { WebhookState } from './webhook.state';
import { WebhookFacade } from './webhook.facade';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WebhookApi } from './webhook.api';
import { TokenInterceptor } from './webhook.interceptor';
import { CardComponent } from './component/card/card.component';
import { HelloComponent } from './container/hello/hello.component';


@NgModule({
  declarations: [
    IntroComponent, 
    MainComponent, CardComponent, HelloComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    WebhookRotingModule,
    SharedModule.forRoot(),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    WebhookApi,
    WebhookAdapter,
    WebhookState,
    WebhookFacade,
  ]
})
export class WebhookModule { 
  static forRoot() {
    return {
      ngModule: WebhookModule,
      providers: [
      ]
    };
  }
}
