<table class="table" style="margin-top: 10px">
    <thead>
    <tr>
        <th>Title</th>
        <th>Last Updated</th>
        <th>Summary</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>Google Cloud Run package</td>
        <td>July 19, 2025</td>
        <td>Detailed description of the API of the Google Cloud Run package.</td>
    </tr>
    </tbody>
</table>

# Overview

Repo: [https://github.com/slingr-stack/google-cloud-run-package](https://github.com/slingr-stack/google-cloud-run-package)

## Properties

### Name: `serviceAccountEmail`

This is the service account for Google Cloud Run, providing more secure access compared to the API key.
More information](https://cloud.google.com/run/docs/securing/service-identity?hl=es-419&_gl=1*1yhyics*_up*MQ..&gclid=CjwKCAjwqMO0BhA8EiwAFTLgIFO0lq1Y-FSj3e3non2DOmPIoYiWuafPSXX5BbMF8gX3d8MJuxuU1xoC2uoQAvD_BwE&gclsrc=aw.ds)

### Name: `privateKey`

This is the private key associated with the service account for Google Cloud Run.

# Javascript API

The Javascript API of the googlecloudrun package has two pieces:

- **HTTP requests**

## HTTP requests

You can make `GET`,`PUT`,`PATCH`,`DELETE` requests to the [googlecloudrun API](https://cloud.google.com/run/docs/reference/rest) like this:

```javascript
var response = pkg.googlecloudrun.api.get('/{parent}/jobs')
```

Please take a look at the documentation of the [HTTP service](https://github.com/slingr-stack/http-service)
for more information about generic requests.

## Dependencies
* HTTP Service (v1.6.7)

# About SLINGR

SLINGR is a low-code rapid application development platform that speeds up development,
with robust architecture for integrations and executing custom workflows and automation.

[More info about SLINGR](https://slingr.io)

# License

This package is licensed under the Apache License 2.0. See the `LICENSE` file for more details.
