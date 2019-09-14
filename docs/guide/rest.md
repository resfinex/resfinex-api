# General

[[toc]]

## URL Endpoint
Both public and authenticated endpoints use the domain:

`https://api-v1.resfinex.com/`


```
// API endpoint
https://api-v1.resfinex.com/<endpoint>/?parameter=value...
```

## Response Format

```json
{
  status: "ok",//or error
  data: <data>, 
  code: 401, //error code
  msg: "<error msg>", //error code
}
```


## Error Code

<!-- | Code | Decription |
|------|------------|
|400| Login Failed| -->