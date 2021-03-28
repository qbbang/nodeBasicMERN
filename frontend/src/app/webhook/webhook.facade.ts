import { Injectable } from "@angular/core";
import { WebhookApi } from "./webhook.api";
import { Webhook, WebhookResponse } from "./model/webhook.model";
import { WebhookState } from "./state/webhook.state";
import { distinctUntilChanged, tap } from 'rxjs/operators';

@Injectable()
export class WebhookFacade {

  constructor(
    private webhookApi: WebhookApi,
    private webhookState: WebhookState
  ) {

  }

  search(param: any) {
    return this.webhookApi.search(param)
      .subscribe((data: WebhookResponse) => {
          this.webhookState.setWebhooks(data.data);
        //   this.userState.setPagination({pages: data.response.page.length, count: data.response.page.length});
      });
    
  }

  delete(_id: string) {
    return this.webhookApi.delete(_id);
  }

  save(data: any) {
    return this.webhookApi.save(data);
  }

  getPagination() {
    return this.webhookState.getPagination()
      .pipe(distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)));
  }

  getWebhooks() {
    return this.webhookState.getWebhooks();
  }

}
