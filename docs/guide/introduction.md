# Introduction



The Resfinex APIs are designed to allow access to all of the features of the Resfinex platform, subject to you complying with the API Terms of Service. The end goal is to allow users to create trading platforms on their own to create highly customised and advanced trading strategies.

There are a few things that make the Resfinex API special. The Resfinex API is designed around speed - our ultimate goal is to provide our traders the fastest access to the market possible. For this reason we try to send only the required data, usually in the form of lists. Our Node.js library supports serializing of the data, if you prefer to use properties.

The second feature a WebSocket user will see is the use of Snapshots.

Initially, we send a full snapshot of the data. Network latency is the biggest issue for data updates. After we send the initial snapshot, we only send data updates. With those updates, the client has to update the initial data locally.

There are several safeguards available to make sure your data is consistent. Two of them are sequencing and CRC checksums. You can opt-in for these features by sending messages to the config channel.

The above should give you an idea of the steps we take to ensure the speed of the Resfinex APIs. In the next section we will cover general information, like rate limits, as well as how your data is returned, and in which cases the data format can change. We will also explain how data precision settings work, and how the different symbols for currencies and pairs function.

## Rate limits
Resfinex API access is rate limited. The rate limit applies if an IP address exceeds a certain number of requests per minute. The current limit is between 10 and 45 to a specific REST API endpoint (ie. /ticker). In case a client reaches the limit, we block the requesting IP address for 10-60 seconds on that endpoint. The API will return the JSON response `{"error": "ERR_RATE_LIMIT"}`. These DDoS defenses may change over time to further improve reliability.

## Multiple clients
Your security is key to us. For every authenticated action taken via the Resfinex API, a nonce is required. Nonces are used to guard against replay attacks. If multiple requests arrive at the API with the wrong nonce (e.g. due to an async timing issue) the API will reject the request.

This means that if you want to use multiple HTTP or WebSocket connections you will need a separate API key for each client.

## Data format
### General notes
Two domains are utilised for REST endpoints and WebSocket channels, the difference between the two being if the request is public, or requires authentication.

Endpoints that require authentication should use the domain:
`(https | wss)://api-v1.resfinex.com/`

Public endpoints should use the domain:
`(https | wss)://api-pub.resfinex.com/`

Do not parse text descriptions - use only codes. Text descriptions are subject to changes and adjustments without any warning.

Messages may contain null placeholders in the payload for future additional fields
All times are UTC timestamps expressed as milliseconds (eg 1477409622229)

### Protocol extension / change of message format
New fields may be appended at the end of an Array or inserted in an Object without changing the API version. When we change existing positional elements in an Array or existing fields in an Object, it will trigger a version change of the API.

### Error codes
Please use the numeric error codes that come with an error. The additional error text may change without notice. Use error codes, your application will become more reliable.

### What is a symbol?
A symbol can be a trading pair or a margin currency.

Trading pair symbols are formed insert a `_` between the symbol (i.e `BTC_USD`, `ETH_USD`).

<!-- ### Price Precision
The precision level of all trading prices is calculated based on significant figures.

For all pairs on Resfinex we use 5 significant digits. Examples of five significant digits would be 12.123, 1.1234, 123.43, and 1234.5.

This mimics how traditional global markets handle the precision of small, medium and large values. The reason is that the higher the amounts, the less relevant the number of decimals become. The corollary is true for very small amounts, where more precision is more useful.

If you submit prices with a precision large a precision of 5, the API will cut them. -->

## Legal
All API keys are used at your own risk and expense. We are not responsible for any negligence, error, compromised security, malfunction, cyberattack, or other force majeure affecting this environment. You hereby release us, hold us harmless and indemnify us from any and all damages, losses or claims associated with your use of this environment.

-- general info about the api and how it works - and our reasoning --
explanations on running multiple clients - an issue coming up often in the issue tracker
notes section is merged with the main section.