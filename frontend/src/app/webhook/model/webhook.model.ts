import { Injectable } from "@angular/core";

export class Webhook {
    _id: string;
    authCookie: string;
    category: string;
    roomId: string;
    roomName: string;
    senderId: string;
}

export class WebhookResponse {
    status: boolean;
    message: string;
    data: Webhook[];
}

export interface Pagination {
    count: number;
    pages: number;
}

@Injectable({
    providedIn: 'root'
    })
    
    export class WebhookAdapter {
    adapt(item: any): WebhookResponse {
        return Object.assign(new WebhookResponse(), item);
    }
}

