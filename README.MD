# Assessment

# Stack
- NodeJS
- Server: Koa (-router, -body, -morgan), backpack-core
- Tests: Jest
- CI/CD: github Actions after building / testing => upload to heroku


# Run on heroku server

1. In terminal:
```
curl -d '{"A": "true", "B": "true", "C": "false", "D": "3.0", "E": "15", "F": "15" }' -H "Content-Type: application/json" -X POST https://desolate-garden-94838.herokuapp.com/transform
```

2. Result:
```
{"status":200,"message":"transform","data":{"H":"T","K":1.5}
```
