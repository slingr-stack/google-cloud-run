/****************************************************
 Dependencies
 ****************************************************/

let httpReference = dependencies.http;

let httpDependency = {
    get: httpReference.get,
    post: httpReference.post,
    put: httpReference.put,
    patch: httpReference.patch,
    delete: httpReference.delete,
    head: httpReference.head,
    options: httpReference.options
};

let httpService = {};

/**
 *
 * Handles a request with retry from the platform side.
 */
function handleRequestWithRetry(requestFn, options, callbackData, callbacks) {
    return requestFn(options, callbackData, callbacks);
}

function createWrapperFunction(requestFn) {
    return function(options, callbackData, callbacks) {
        return handleRequestWithRetry(requestFn, options, callbackData, callbacks);
    };
}

for (let key in httpDependency) {
    if (typeof httpDependency[key] === 'function') httpService[key] = createWrapperFunction(httpDependency[key]);
}

/****************************************************
 Public API - Generic Functions
 ****************************************************/

/**
 * Sends an HTTP GET request to the specified URL with the provided HTTP options.
 *
 * @param {string} path         - The path to send the GET request to.
 * @param {object} httpOptions  - The options to be included in the GET request check http-service documentation.
 * @param {object} callbackData - Additional data to be passed to the callback functions. [optional]
 * @param {object} callbacks    - The callback functions to be called upon completion of the GET request. [optional]
 * @return {object}             - The response of the GET request.
 */
exports.get = function(path, httpOptions, callbackData, callbacks) {
    let options = checkHttpOptions(path, httpOptions);
    return httpService.get(GoogleCloudRun(options), callbackData, callbacks);
};

/**
 * Sends an HTTP POST request to the specified URL with the provided HTTP options.
 *
 * @param {string} path         - The path to send the POST request to.
 * @param {object} httpOptions  - The options to be included in the POST request check http-service documentation.
 * @param {object} callbackData - Additional data to be passed to the callback functions. [optional]
 * @param {object} callbacks    - The callback functions to be called upon completion of the POST request. [optional]
 * @return {object}             - The response of the POST request.
 */
exports.post = function(path, httpOptions, callbackData, callbacks) {
    let options = checkHttpOptions(path, httpOptions);
    return httpService.post(GoogleCloudRun(options), callbackData, callbacks);
};

/**
 * Sends an HTTP PUT request to the specified URL with the provided HTTP options.
 *
 * @param {string} path         - The path to send the PUT request to.
 * @param {object} httpOptions  - The options to be included in the PUT request check http-service documentation.
 * @param {object} callbackData - Additional data to be passed to the callback functions. [optional]
 * @param {object} callbacks    - The callback functions to be called upon completion of the POST request. [optional]
 * @return {object}             - The response of the PUT request.
 */
exports.put = function(path, httpOptions, callbackData, callbacks) {
    let options = checkHttpOptions(path, httpOptions);
    return httpService.put(GoogleCloudRun(options), callbackData, callbacks);
};

/**
 * Sends an HTTP PATCH request to the specified URL with the provided HTTP options.
 *
 * @param {string} path         - The path to send the PATCH request to.
 * @param {object} httpOptions  - The options to be included in the PATCH request check http-service documentation.
 * @param {object} callbackData - Additional data to be passed to the callback functions. [optional]
 * @param {object} callbacks    - The callback functions to be called upon completion of the POST request. [optional]
 * @return {object}             - The response of the PATCH request.
 */
exports.patch = function(path, httpOptions, callbackData, callbacks) {
    let options = checkHttpOptions(path, httpOptions);
    return httpService.patch(GoogleCloudRun(options), callbackData, callbacks);
};

/**
 * Sends an HTTP DELETE request to the specified URL with the provided HTTP options.
 *
 * @param {string} path         - The path to send the DELETE request to.
 * @param {object} httpOptions  - The options to be included in the DELETE request check http-service documentation.
 * @param {object} callbackData - Additional data to be passed to the callback functions. [optional]
 * @param {object} callbacks    - The callback functions to be called upon completion of the DELETE request. [optional]
 * @return {object}             - The response of the DELETE request.
 */
exports.delete = function(path, httpOptions, callbackData, callbacks) {
    let options = checkHttpOptions(path, httpOptions);
    return httpService.delete(GoogleCloudRun(options), callbackData, callbacks);
};

/**
 * Sends an HTTP HEAD request to the specified URL with the provided HTTP options.
 *
 * @param {string} path         - The path to send the HEAD request to.
 * @param {object} httpOptions  - The options to be included in the HEAD request check http-service documentation.
 * @param {object} callbackData - Additional data to be passed to the callback functions. [optional]
 * @param {object} callbacks    - The callback functions to be called upon completion of the HEAD request. [optional]
 * @return {object}             - The response of the HEAD request.
 */
exports.head = function(path, httpOptions, callbackData, callbacks) {
    let options = checkHttpOptions(path, httpOptions);
    return httpService.head(GoogleCloudRun(options), callbackData, callbacks);
};

/**
 * Sends an HTTP OPTIONS request to the specified URL with the provided HTTP options.
 *
 * @param {string} path         - The path to send the OPTIONS request to.
 * @param {object} httpOptions  - The options to be included in the OPTIONS request check http-service documentation.
 * @param {object} callbackData - Additional data to be passed to the callback functions. [optional]
 * @param {object} callbacks    - The callback functions to be called upon completion of the OPTIONS request. [optional]
 * @return {object}             - The response of the OPTIONS request.
 */
exports.options = function(path, httpOptions, callbackData, callbacks) {
    let options = checkHttpOptions(path, httpOptions);
    return httpService.options(GoogleCloudRun(options), callbackData, callbacks);
};

exports.utils = {

    /**
     * Gets a configuration from the properties.
     *
     * @param {string} property             - The name of the property to get.
     *                                          If it is empty, return the entire configuration object.
     * @return {string}                     - The value of the property or the whole object as string.
     */
    getConfiguration: function (property) {
        if (!property) {
            sys.logs.debug('[googlecloudrun] Get configuration');
            return JSON.stringify(config.get());
        }
        sys.logs.debug('[googlecloudrun] Get property: '+property);
        return config.get(property);
    },

    /**
     * Concatenates a path with a param query and its value.
     *
     * @param path                          - The path to concatenate.
     * @param key                           - The name of the param.
     * @param value                         - The value of the param.
     * @returns {string}                    - The concatenated path without coding parameters.
     */
    concatQuery: function (path, key, value) {
        return path + ((!path || path.indexOf('?') < 0) ? '?' : '&') + key + "=" + value;
    },

    /**
     * Merges two JSON objects into a single object.
     *
     * @param {Object} json1 - The first JSON object to be merged.
     * @param {Object} json2 - The second JSON object to be merged.
     * @return {Object} - The merged JSON object.
     */
    mergeJSON: mergeJSON,
};

/****************************************************
 Private helpers
 ****************************************************/

function checkHttpOptions (path, options) {
    options = options || {};
    if (!!path) {
        if (isObject(path)) {
            // take the 'path' parameter as the options
            options = path || {};
        } else {
            if (!!options.path || !!options.params || !!options.body) {
                // options contain the http package format
                options.path = path;
            } else {
                // create html package
                options = {
                    path: path,
                    body: options
                }
            }
        }
    }
    return options;
}

function isObject (obj) {
    return !!obj && stringType(obj) === '[object Object]'
}

let stringType = Function.prototype.call.bind(Object.prototype.toString)

/****************************************************
 Configurator
 ****************************************************/

let GoogleCloudRun = function (options) {
    options = options || {};
    options= setApiUri(options);
    options= setRequestHeaders(options);
    return options;
}

/****************************************************
 Private API
 ****************************************************/

function setApiUri(options) {
    let url = options.path || "";
    const API_REGION = config.get("region")
    const API_URL = 'https://' + API_REGION + '.googleapis.com/v2'
    options.url = API_URL + url;
    sys.logs.debug('[googlecloudrun] Set url: ' + options.path + "->" + options.url);
    return options;
}

function setRequestHeaders(options) {
    let headers = options.headers || {};
    headers = mergeJSON(headers, {"Content-Type": "application/json"});
    headers = mergeJSON(headers, {"Authorization": "Bearer "+getAccessTokenForAccount()});
    options.headers = headers;
    return options;
}

function getAccessTokenForAccount(account) {
    account = account || "account";
    sys.logs.info('[googlecloudrun] Getting access token for account: '+account);
    let installationJson = sys.storage.get('installationInfo-GoogleCloudRun---'+account) || {id: null};
    let token = installationJson.token || null;
    let expiration = installationJson.expiration || 0;
    if (!!token || expiration < new Date()) {
        sys.logs.info('[googlecloudrun] Access token is expired or not found. Getting new token');
        let res = httpService.post(
            {
                url: "https://oauth2.googleapis.com/token",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: {
                    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                    assertion: getJsonWebToken()
                }
            });
        token = res.access_token;
        let expires_at = res.expires_in;
        expiration = new Date(new Date(expires_at) - 1 * 60 * 1000).getTime();
        installationJson = mergeJSON(installationJson, {"token": token, "expiration": expiration});
        sys.logs.info('[googlecloudrun] Saving new token for account: ' + account);
        sys.storage.replace('installationInfo-GoogleCloudRun---'+account, installationJson);
    }
    return token;
}

function getJsonWebToken() {
    let currentTime = new Date().getTime();
    let futureTime = new Date(currentTime + ( 10 * 60 * 1000)).getTime();
    let scopesGlobal = 'https://www.googleapis.com/auth/cloud-platform';
    return sys.utils.crypto.jwt.generate(
        {
            iss: config.get("serviceAccountEmail"),
            aud: 'https://oauth2.googleapis.com/token',
            scope: scopesGlobal,
            iat: currentTime,
            exp: futureTime
        },
        config.get("privateKey"),
        "RS256"
    )
}

function mergeJSON (json1, json2) {
    const result = {};
    let key;
    for (key in json1) {
        if(json1.hasOwnProperty(key)) result[key] = json1[key];
    }
    for (key in json2) {
        if(json2.hasOwnProperty(key)) result[key] = json2[key];
    }
    return result;
}
