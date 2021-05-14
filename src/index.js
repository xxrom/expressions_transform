import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-morgan';
import koaBody from 'koa-body';
import env from 'dotenv';

import {transformRequest} from './trasform';

env.config()

const server = new Koa();
const router = new Router();

const PORT = process.env.PORT || 4444;

/*
  curl -d '{"link": "/moskovskaya_" }' -H "Content-Type: application/json" -X POST http://localhost:4444/transform
*/
/*
  curl -d '{"A": "true", "B": "true", "C": "false", "D": "3.0", "E": "15", "F": "15" }' -H "Content-Type: application/json" -X POST http://localhost:4444/transform

  => {"status":200,"message":"transform","data":{"H":"T","K":1.5}
 */

router.post('/transform', koaBody(), (ctx) => {
  console.log('tranform', ctx.request.body);
  const body = ctx.request.body;

  const processedData = transformRequest(body);

  ctx.body = {
    status: 200,
    message: 'transform',
    data: processedData,
  };
});

server
  .use(logger('tiny'))
  .use(router.routes())
  .use(router.allowedMethods())
  .use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;

    console.log(`${ctx.method}: ${ctx.url} - ${ms}ms`);
  })
  .listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
  })
