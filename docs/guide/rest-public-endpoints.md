# REST PUBLIC ENDPOINTS
[[toc]]

## [GET] OrderBook
Get the current order book.

::: tip
::: method GET
/engine/depth
:::

Request Query Detail
| Key | Required | Type  | Default | Description |
| ---- |:-------------| ----- | ----- | ----- |
| `pair` | True |  string|none| Current Pair |
| `size` | False |  number|500| Limit the number of asks/bids returned. May be 0 in which case the array of bids is empty|

Request Example
:::: tabs cache-lifetime="10" :options="{ useUrlFragment: false }"
::: tab "CURL" id="bash"
```bash
curl "https://api-v1.resfinex.com/engine/depth?pair=BTC_USDT&size=20"
```
:::
::: tab "JAVASCRIPT" id="node"
```javascript
const fetch = require("node-fetch")
fetch("https://api-v1.resfinex.com/engine/depth?pair=BTC_USDT&size=20")
  .then(e => e.json())  
  .then(e => e.console(e))  
```
:::
::::


Response Example

```json
{  
  "status":"ok",
  "data":{  
    "asks":[  
      {"price":10362,"amount":0.019962},
      {"price":10364.44,"amount":0.135571},
      ...
    ],
    "bids":[  
      {"price":10355.15,"amount":0.02066},
      {"price":10328.6,"amount":0.085558},
      ...
    ],
  }
}
```


## [GET] Trades

Get a list of the most recent trades for the given symbol.

::: tip
::: method GET
/engine/history
:::

Request Query Detail
| Key | Required | Type  | Default | Description |
| ---- |:-------------| ----- | ----- | ----- |
| `pair` | True |  string|none| Current Pair |
Request Example

:::: tabs cache-lifetime="10" :options="{ useUrlFragment: false }"
::: tab "CURL" id="bash"
```bash
curl "https://api-v1.resfinex.com/engine/history?pair=BTC_USDT"
```
:::
::: tab "JAVASCRIPT" id="node"
```javascript
const fetch = require("node-fetch")
fetch("https://api-v1.resfinex.com/engine/history?pair=BTC_USDT")
  .then(e => e.json())  
  .then(e => e.console(e))  
```
:::
::::

Response Example
```json
{  
  "status":"ok",
  "data":[  
    {"amount":0.008205,"price":10360.58,"timestamp":1563730451561},
    {"amount":0.005433,"price":10360.58,"timestamp":1563730451613},
    ...
  ]
}
```


## [GET] Tickers

The ticker is a high level overview of the state of the market. It shows you the current best bid and ask, as well as the last trade price. It also includes information such as daily volume and how much the price has moved over the last day.

::: tip
::: method GET
/engine/ticker
:::

No request query

Request Example

:::: tabs cache-lifetime="10" :options="{ useUrlFragment: false }"
::: tab "CURL" id="bash"
```bash
curl "https://api-v1.resfinex.com/engine/ticker"
```
:::
::: tab "JAVASCRIPT" id="node"
```javascript
const fetch = require("node-fetch")
fetch("https://api-v1.resfinex.com/engine/ticker")
  .then(e => e.json())  
  .then(e => e.console(e))  
```
:::
::::

Response Example
```json
{  
  "status":"ok",
  "data":[  
    {
      "pair":"ETH_USDT",
      "timestamp":1563731054000,
      "last":218.964,
      "volume":42265405.33235419,
      "change":-12.129999999999995,
      "high":233.896,
      "low":217.151
    },
    {
      "pair":"BTC_USDT",
      "timestamp":1563731054000,
      "last":10402.56,
      "volume":39580300.130973846,
      "change":-430.40999999999985,
      "high":11056.73,
      "low":10301.72
    },
    ...
  ]
}
```

Response Detail
| Key         | Type     | Description   |
| ----        | -----    | -----         |
| `pair`      |  string  | Current pair  |
| `timestamp` |  number  | Current timestamp  |
| `last`      |  number  | The current price |
| `volume`    |  number  | The total volume in 24h  |
| `change`    |  number  | The delta price in 24h |
| `high`      |  number  | The maximum price in 24h |
| `low`       |  number  | The minimum price in 24h |


## [GET] Symbol Detail

Get a list of valid symbol IDs and the pair details.

::: tip
::: method GET
/config
:::

No request query

Request Example

:::: tabs cache-lifetime="10" :options="{ useUrlFragment: false }"
::: tab "CURL" id="bash"
```bash
curl "https://api-v1.resfinex.com/config"
```
:::
::: tab "JAVASCRIPT" id="node"
```javascript
const fetch = require("node-fetch")
fetch("https://api-v1.resfinex.com/config")
  .then(e => e.json())  
  .then(e => e.console(e))  
```
:::
::::

Response Example
```json
{
  "status":"ok",
  "data":{
    "pairs":[
      {
        "primary":"ETH",
        "secondary":"USDT",
        "name":"ETH_USDT",
        "totalDecimal":8,
        "priceDecimal":3,
        "amountDecimal":5,
        "minBaseAmount":10
      },
      ...
    ],
    "coins":[
      {
        "symbol":"BTC",
        "name":"BTC",
        "decimal":5,
        "minTrading":0.002
      },
      ...  
    ],
    "decimal":8
  }
}
```

Response Detail
| Key         | Type     | Description   |
| ----        | -----    | -----         |
| `pair.name`             |  string  | Current Pair |
| `pair.primary`          |  string  | Base Coin  |
| `pair.secondary`        |  string  | Counter Coin  |
| `pair.totalDecimal`     |  number  |   |
| `pair.priceDecimal`     |  number  | The max decimal allowed of the price |
| `pair.amountDecimal`    |  number  | The decimal of base coin|
| `pair.minBaseAmount`    |  number  | The minimum amount trading allowed in counter coin |



## [GET] Timestamp

Get current server timestamp, for sync time between api client and our API server

Used for corrected `nonce` in [Authenticated APIs](/guide/rest-authen.html#authentication)

::: tip
::: method GET
/timestamp
:::



Request Example
:::: tabs cache-lifetime="10" :options="{ useUrlFragment: false }"
::: tab "CURL" id="bash"
```bash
curl "https://api-v1.resfinex.com/timestamp"
```
:::
::: tab "JAVASCRIPT" id="node"
```javascript
const fetch = require("node-fetch")
fetch("https://api-v1.resfinex.com/timestamp")
  .then(e => e.json())  
  .then(e => e.console(e))  
```
:::
::::

Response Example
```json
{
  "timestamp":1563732573732
}
```


