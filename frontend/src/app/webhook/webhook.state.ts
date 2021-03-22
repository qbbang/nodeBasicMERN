import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { BehaviorSubject } from "rxjs";
import { Pagination, Webhook } from "./webhook.model";

@Injectable()
export class WebhookState {

  private webhooks: BehaviorSubject<Webhook[]> = new BehaviorSubject([]);
  private page: Subject<Pagination> = new Subject<Pagination>();

  constructor() {
  }

  setPagination(pagination: Pagination) {
    return this.page.next(pagination);
  }

  getPagination() {
    return this.page.asObservable();
  }

  setWebhooks(webhooks: Webhook[]) {
    this.webhooks.next(webhooks);
  }

  getWebhooks() {
    return this.webhooks.asObservable();
  }

  addWebhooks(webhook: Webhook) {
    const curVal = this.webhooks.getValue();
    this.webhooks.next([...curVal, webhook]);
  }

  removeWebhooks(webhooks: Webhook[]) {
    const curVal = this.webhooks.getValue();
    this.webhooks.next(curVal.filter(u => webhooks.map(a => a._id != u._id)));
  }

  removeWebhook(webhook: Webhook) {
    const curVal = this.webhooks.getValue();
    this.webhooks.next( curVal.filter(u => u._id != webhook._id));
  }


}
