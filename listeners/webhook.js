/****************************************************
 Listeners
 ****************************************************/

listeners.defaultWebhookGoogleCloudRun = {
    label: 'Catch HTTP googlecloudrun events',
    type: 'service',
    options: {
        service: 'http',
        event: 'webhook',
        matching: {
            path: '/googlecloudrun',
        }
    },
    callback: function(event) {
        sys.logs.info('Received Google Cloud Run webhook. Triggering a package event.');
        sys.events.triggerEvent('googlecloudrun:webhook', event.data);
        return event;
    }
};
