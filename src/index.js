import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-morgan';
import koaBody from 'koa-body';
import env from 'dotenv';

env.config()

const server = new Koa();
const router = new Router();

const PORT = process.env.PORT || 4444;

router.post('/transform', koaBody(), (ctx) => {
  console.log('tranform', ctx.request.body);
  const body = ctx.request.body;

  ctx.body = {
    status: 200,
    message: 'transform',
    data: body,
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