import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WebhookFacade } from '../../webhook.facade';
import { Webhook } from '../../model/webhook.model';

@Component({
  selector: 'mcr-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  webhooks$: Observable<Webhook[]>;
  
  constructor(private facade: WebhookFacade) { }

  ngOnInit(): void {
    this.webhooks$ = this.facade.getWebhooks();
    this.facade.search({});
  }

}
