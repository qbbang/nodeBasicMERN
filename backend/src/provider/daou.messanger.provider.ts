

import axios from 'axios';


export default {
    /**
     * Singleton-like Database Object that connects to the mongodb database
     */
    async sendMessage(webhook, message){
        // send to DaouMessanger
        const formdataReq = new URLSearchParams();
        formdataReq.append('message', message);
        formdataReq.append('resource', 'go_pc_11301_708');
        formdataReq.append('userSeq', webhook.senderId);
        formdataReq.append('tempMessageId', '103911.1199999752');

        return await axios.post(`https://kstm.daouoffice.com/api/chat/rooms/${webhook.roomId}`, formdataReq, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': `GOSSOcookie=${webhook.authCookie};`,
                'Connection': 'keep-alive',
                'Accept': '*/*',
                'User-Agent': 'PostmanRuntime/7.26.8'
            }
        });
    }
}
