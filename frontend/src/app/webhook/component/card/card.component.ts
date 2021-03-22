import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Webhook } from '../../webhook.model';

@Component({
  selector: 'mcr-webhook-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() webhooks: Observable<Webhook[]>
  
  constructor() { }

  ngOnInit(): void {
  }

}
