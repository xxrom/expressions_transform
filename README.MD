# Assessment

# Stack
- NodeJS
- Server: Koa (-router, -body, -morgan), backpack-core
- Tests: Jest
- CI/CD: github Actions [build => tests => deploy to heroku]


# Execute data on heroku server

1. In terminal:
```bash
curl -d '{"A": "true", "B": "true", "C": "false", "D": "3.0", "E": "15", "F": "15" }' -H "Content-Type: application/json" -X POST https://desolate-garden-94838.herokuapp.com/transform
```

2. Result:
```bash
{"status":200,"message":"transform","data":{"H":"T","K":1.5}
```

# Server methods:
- POST method on "https://desolate-garden-94838.herokuapp.com/transform"
- - for running main calculations

- GET method on "https://desolate-garden-94838.herokuapp.com"
- - just for health check

# Heroku server URL:
- [HerokuRootLink](https://desolate-garden-94838.herokuapp.com)

- [HerokuTransformLink](https://desolate-garden-94838.herokuapp.com/transform)
