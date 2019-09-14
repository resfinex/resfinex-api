# REST AUTH ENDPOINTS


::: tip
- Please reference first [Authentication section](/guide/rest-authen#authentication) for authenticated API
:::

[[toc]]



## [GET] Account Detail
Get the current order book.

::: tip
::: method GET
/account/detail
:::

Request Example
:::: tabs cache-lifetime="10" :options="{ useUrlFragment: false }"
::: tab "JAVASCRIPT" id="node"
```javascript
const fetch = require("node-fetch")
fetch("https://api-v1.resfinex.com/account/detail",{
  method: "GET,
  headers: {
    nonce: <nonce>,
    signature: <signature>,
    token: <APIKey>,
    type: "api",
  },
})
  .then(e => e.json())  
  .then(e => e.console(e))  
```
:::
::::



Response
```json
{
  "status":"ok",
  "data":{
    "feeRate":0.001,
    "feeDiscount":true,
    "email":"example@example.com",
    "username":"example",
    "accountId":"efS/UnUjNEE3yMqxjO",
    "role":"USER"
  }
}
```


## [POST] Balances
Get the current account balances

::: warning
::: method POST
/account/balances
:::

Request Example
:::: tabs cache-lifetime="10" :options="{ useUrlFragment: false }"
::: tab "JAVASCRIPT" id="node"
```javascript
const fetch = require("node-fetch")
fetch("https://api-v1.resfinex.com/account/balances",{
  method: "POST,
  headers: {
    nonce: <nonce>,
    signature: <signature>,
    token: <APIKey>,
    type: "api",
    body:"{}"
  },
})
  .then(e => e.json())  
  .then(e => e.console(e))  
```
:::
::::


Response
```json
{
  "status":"ok",
  "data":[
    {
      "sym":"BTC",
      "total":"0.12331111",
      "inorder":"0.00000000"
    },
    {
      "sym":"ETH",
      "total":"2.00000000",
      "inorder":"1.00000000"
    },
    ...
  ]
}
```




## [POST] Place Order 
Get the current account balances

::: warning
::: method POST
/order/place_order
:::

Request Params Detail
| Key       | Required      | Type    | Default | Description   |
| ----      |:------------- | -----   | -----   |   -----       |
| `type`    | True          |  `LIMIT`, `MARKET` |         | Order Type  |
| `amount`  | True          |  number |none     | Buy/Sell Amount  |
| `pair`    | True          |  string |none     |   |
| `price`   | Required If `type` is `LIMIT`|  number |none     |  Buy/Sell Limit Price |
| `side`    | True          |  `BUY`, `SELL` |none     |   |

::: warning
- The decimal of the `amount` and `price` is difference for each pair, if submit with large decimal, request will be rejected
- For decimal information, please reference [Symbol Detail](/guide/rest-public-endpoints.html#get-symbol-detail) section
:::

Request Example
:::: tabs cache-lifetime="10" :options="{ useUrlFragment: false }"
::: tab "JAVASCRIPT" id="node"
```javascript

const fetch = require("node-fetch")

const requestBody = JSON.stringify({
  amount: <amount>,
  pair: <pair>,
  price: <price>,
  side: <side>,
  type: <type>,
})
//Generate nonce, signature here

fetch("https://api-v1.resfinex.com/order/place_order",{
  method: "POST,
  headers: {
    nonce: <nonce>,
    signature: <signature>,
    token: <APIKey>,
    type: "api",
  },
  body: requestBody
})
  .then(e => e.json())  
  .then(e => e.console(e))  
```
:::
::::


Response
```json
{
  "status":"ok",
  "data":{
    "orderId": "pexT6JoCp8FJZxsRi4xk",
    "timestamp": 1563847169935,
  }
}
```



## [POST] Cancel Order
Cancan order

::: warning
::: method POST
/order/cancel_order
:::

Request Params Detail
| Key       | Required      | Type    | Default | Description   |
| ----      |:------------- | -----   | -----   |   -----       |
| `orderId`    | True          | string |         | Order ID for cancel  |

Request Example
:::: tabs cache-lifetime="10" :options="{ useUrlFragment: false }"
::: tab "JAVASCRIPT" id="node"
```javascript

const fetch = require("node-fetch")

const requestBody = JSON.stringify({
  orderId: "pexT6JoCp8FJZxsRi4xk",
})
//Generate nonce, signature here

fetch("https://api-v1.resfinex.com/order/cancel_order",{
  method: "POST,
  headers: {
    nonce: <nonce>,
    signature: <signature>,
    token: <APIKey>,
    type: "api",
  },
  body: requestBody
})
  .then(e => e.json())  
```
:::
::::





## [POST] Get Open Orders
Get open orders

::: warning
::: method POST
/order/open_orders
:::

Request Params Detail
| Key       | Required      | Type              | Default | Description   |
| ----      |:------------- | -----             | -----   |   -----       |
| `pair`    |   No          | string            |         | Filter by pair|
| `side`    |   No          | `BUY`,`SELL`    |         |Filter by order side `BUY`/`SELL`|
| `type`    |   No          | `LIMIT`,`MARKET`|         |Filter by order type |

Request Example
:::: tabs cache-lifetime="10" :options="{ useUrlFragment: false }"
::: tab "JAVASCRIPT" id="node"
```javascript

const fetch = require("node-fetch")

const requestBody = JSON.stringify({
  pair:"ETH_USDT",
})
//Generate nonce, signature here

fetch("https://api-v1.resfinex.com/order/open_orders",{
  method: "POST,
  headers: {
    nonce: <nonce>,
    signature: <signature>,
    token: <APIKey>,
    type: "api",
  },
  body: requestBody
})
  .then(e => e.json())  
```
:::
::::

Response
```json
{
  "status":"ok",
  "data":[
    {
      "pair": "ETH_USDT",
      "type": "LIMIT",
      "side": "BUY",
      "timestamp": 1563901732945,
      "amount": 3.69154,
      "orderId": "1u2yvV8Ft0ZTJUeG9jnW",
      "status": "OPEN",
      "avgPrice": 0,
      "feeCoin": "ETH",
      "feeDiscountCoin": "RES",
      "feeDiscountTotal": 0,
      "feeTotal": 0,
      "filled": 0,
      "price": 208.478,
      "total": 0,
    },
    ...
  ]
}
```
Response detail
| Key               | Description       |
| ----              |:-------------     |
| `pair`            |Order pair|
| `type`            |Order type `LIMIT`/`MARKET` |
| `side`            |Order side `BUY`/`SELL`|
| `status`          |The current status of the order: `OPEN`/`CANCELED`/`FILLED`/`PARTIAL_FILED` |
| `avgPrice`        |The average of the matching price  |
| `feeCoin`         |Current coin used for pay fee|
| `feeTotal`        |Total fee |
| `feeDiscountCoin` |Discount coin used for pay fee|
| `feeDiscountTotal`|Total discounted fee |
| `price`           |Order price                   |
| `filled`          |The base amount was filled |
| `total`           |The counter amount was filled |






## [POST] Get Closed Orders
Get close orders

::: warning
::: method POST
/order/close_orders
:::

Request Params Detail
| Key       | Required      | Type              | Default | Description   |
| ----      |:------------- | -----             | -----   |   -----       |
| `pair`    |   No          | string            |         | Filter by pair|
| `side`    |   No          | `BUY`,`SELL`    |         |Filter by order side `BUY`/`SELL`|
| `type`    |   No          | `LIMIT`,`MARKET`|         |Filter by order type |
| `status`  |   No          | `FILLED`,`CANCELED`,`CLOSED`|         |Filter by order status |

Request Example
:::: tabs cache-lifetime="10" :options="{ useUrlFragment: false }"
::: tab "JAVASCRIPT" id="node"
```javascript

const fetch = require("node-fetch")

const requestBody = JSON.stringify({
  status: "FILLED",
  pair:"ETH_USDT",
})
//Generate nonce, signature here

fetch("https://api-v1.resfinex.com/order/close_orders",{
  method: "POST,
  headers: {
    nonce: <nonce>,
    signature: <signature>,
    token: <APIKey>,
    type: "api",
  },
  body: requestBody
})
  .then(e => e.json())  
```
:::
::::

Response the same format with [Get Open Orders API](/guide/rest-auth-endpoints.html#post-get-open-orders)




## [POST] Get Order Trades
Get trade on closed orders

::: warning
::: method POST
/order/order_detail
:::

Request Params Detail
| Key       | Required      | Type              | Default | Description   |
| ----      |:------------- | -----             | -----   |   -----       |
| `orderId` |   Yes         | string            |         |               |


Request Example
:::: tabs cache-lifetime="10" :options="{ useUrlFragment: false }"
::: tab "JAVASCRIPT" id="node"
```javascript

const fetch = require("node-fetch")

const requestBody = JSON.stringify({
  orderId: "1u2yvV8Ft0ZTJUeG9jnW",
})
//Generate nonce, signature here

fetch("https://api-v1.resfinex.com/order/order_detail",{
  method: "POST,
  headers: {
    nonce: <nonce>,
    signature: <signature>,
    token: <APIKey>,
    type: "api",
  },
  body: requestBody
})
  .then(e => e.json())  
```
:::
::::

Response Example
```json
{
  "status":"ok",
  "data":[
    {
      "tradeId":"7m+QF2aoZcigJFF",
      "timestamp":1563901101545,
      "pair":"BTC_USDT",
      "price":9984.54,
      "amount":0.060492,
      "total":603.98479368,
      "feeType":"MAKER",
      "fee":6.039381926292588,
      "feeCoin":"RES"
    },
    ...
  ]
}
```

Response detail
| Key               | Description               |
| ----              |:-------------             |
| `tradeId`         |                           |
| `timestamp`       |                           |
| `pair`            |                           |
| `price`           |The matching price         |
| `amount`          |The matching base amount   |
| `total`           |The matching counter amount|
| `feeType`         |`MAKER`/`TAKER`            |
| `feeCoin`         |Coin for paying fee        |
| `fee`             |Total fee amount           |


