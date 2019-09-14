# Authenticated APIs



## Authentication
All examples assume the following:

- You are using the provided example request object
- You use your API key and secret
- BTC_USDT is the default symbol

Authentication endpoints should use the domain too:
`https://api-v1.resfinex.com`


:::: tabs cache-lifetime="10" :options="{ useUrlFragment: false }"

::: tab "Javascript" id="nodejs"
```javascript
// Account detail example
const fetch = require("node-fetch")
const crypto = require("crypto")
const url = require('url')

const BASE_URL = "https://api-v1.resfinex.com"
const END_POINT = "/account/detail"
const APIKey = "<Your API public key here>"
const APISecrect = "<Your API secret here>"

/**
 * - Nonce must be your current timestamp, 
 *   and deviate must be less than 5 seconds or will be rejected
 * - Current timestamp can be get via [GET] /timestamp
 * - Nonce provided must be strictly increasing.
*/
const nonce = Date.now()

const requestQuery = { /*Insert your Request body */}
const queryString = url.format({ query: requestQuery })

const requestBody = { /*Insert your Request query */}
const bodyString = JSON.stringify(requestQuery || {})

const method = "GET"

/**
 * - Sign payload is generate from query string for GET method 
 *   and json body string for POST method
*/
const signPayload = method == "GET" ? queryString : bodyString

// The signature must be as lowercase
const signature = crypto
  .createHmac('sha256', APISecrect)
  .update(`${signPayload}_${nonce}_${END_POINT}`)
  .digest("hex")

fetch(
  `${BASE_URL}${END_POINT}${queryString}`,
  {
    method: method,
    headers: {
      nonce: nonce,
      signature: signature,
      token: APIKey,
      type: "api", //Required
    },
    body: method == "GET" ? undefined : bodyString
  })
  .then(res => res.json())
  .then(result => {
    console.log(result.data)
    //TODO with the result
  })

```
:::

::: tab "Python" id="python"
```python
import asyncio
import aiohttp
import hashlib
import urllib
import time
import math
import hmac
import json

BASE_URL = "https://api-v1.resfinex.com"
END_POINT = "/account/detail"
APIKey = "uPRyaQMItSnISBUeGQD73T/C3"
APISecrect = "Ab08rFK2FvlfCJ+9LhYZ9ikxWy264Ed07O0pT1m9"

async def doRequestWithSign(url, query={}, body={}, method="GET"):
  now = math.floor(time.time() * 1000) 
  
  queryString = urllib.parse.urlencode(query)
  bodyString = "" if method == "GET" else json.dumps(body)
  signPayload = queryString if method == "GET" else bodyString
  signString = '%s_%d_%s' % (signPayload, now, url)

  signature = hmac.new(
    bytes(APISecrect,'utf-8'),
    bytes(signString,'utf-8'),
    hashlib.sha256
  ).hexdigest()

  headers = {
    'content-type': 'application/json',
    'nonce': str(now),
    'signature': signature,
    'token': APIKey,
    'type': "api", 
  }

  async with aiohttp.ClientSession(headers=headers) as session:
    if method == "GET":
      async with session.get(BASE_URL + url + queryString) as response:
        return await response.json()
    else:
      async with session.post(BASE_URL + url + queryString, data=bodyString) as response:
        return await response.json()

async def main():
  json = await doRequestWithSign("/account/detail", method="GET", body= {})
  print(json)

loop = asyncio.get_event_loop()
loop.run_until_complete(main())
```
:::
::::


Authentication is done using an API key and a secret. To generate this pair, go to the [API Access page](https://trade.resfinex.com/apikey).

As an example of how to authenticate, we can look at the *"account detail"* endpoint.
Take the example payload above.



The authentication procedure is as follows:

* The `nonce`
  - Nonce must be your **corrected timestamp**, and **deviate** must be **less than 5 seconds** or will be rejected
  - Current timestamp can be get via API [GET Timestamp](/guide/rest-public-endpoints.html#get-timestamp)
  ::: danger
  - Nonce must be **strictly increasing**
  :::

* The `signPayload` is combined of request data and the `Nonce` and the `END_POINT`
  - `GET` Request :the query string e.g. `?ticker=1m`, then append with `_<Nonce>_<END_POINT>`
  - `POST` Request :the body as json string first e.g. `{"orderId": "abc"}` then append with `_<Nonce>_<END_POINT>`
* The `signature` is the hex digest of an **HMAC-SHA256** hash where the massage is the `signPayload`, and the secret key is your API secret.

  `signature = HMAC-SHA256(signPayload, <API Secrect Key>).digest('hex')`
  ::: danger
  - The signature must be as lowercase
  :::

* The extra field is `token`, where is your **API Public Key** and the field `type` must be `"api"`.

* The `nonce`, `signature`, `token` and `type` above are encoded as HTTP headers


::: tip
To correct the nonce in the client side

```
serverTimestamp = <Get Server Timestamp>
currentTimestamp = <Get Current Local Timestamp>

deltaTime = serverTimestamp - currentTimestamp
```
So we had `deltaTime` here, every times we generate a new `nonce`, just add `deltaTime` into `<Current Timestamp>` for corrected the nonce

```
timestamp = <Get Current Local Timestamp>
nonce = timestamp + deltaTime
```
:::
