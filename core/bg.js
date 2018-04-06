chrome['runtime']['onMessage'].addListener(function(request, sender, sendResponse) {

    switch (request.action) {
        case 'setOptions':
            chrome['storage']['local'].set({
                settings: request.payload
            }, sendResponse);
            break;
        case 'getOptions':
            chrome['storage']['local'].get('settings', function(result) {
                if (chrome['runtime'].lastError) {
                    return;
                }
                if (result) {
                    sendResponse(result);
                }
            });
            return true;
            break;
    }
});