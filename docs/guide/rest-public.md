# Public APIs


Public endpoints should use the domain:
`https://api-v1.resfinex.com`


:::: tabs cache-lifetime="10" :options="{ useUrlFragment: false }"

::: tab "Curl" id="curl"
```bash
curl https://api-v1.resfinex.com/engine/ticker
```
:::

::: tab "Javascript" id="nodejs"
```javascript
const fetch = require("node-fetch")

fetch(
  "https://api-v1.resfinex.com/engine/ticker")
  .then(res => res.json())
  .then(result => {
      //TODO with the result
  })
```
:::

:::tab "Python" id="python"
```python
import asyncio
import aiohttp

async def fetch(url):
  async with aiohttp.ClientSession() as session:
    async with session.get(url) as response:
      return await response.text()

async def main():
  json = await fetch("https://api-v1.resfinex.com/engine/ticker")
  print(json)

  pass

loop = asyncio.get_event_loop()
loop.run_until_complete(main())
```
:::

::::
