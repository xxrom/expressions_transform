import Koa from "koa";
import Router from "koa-router";
import logger from "koa-morgan";
import koaBody from "koa-body";
import env from "dotenv";

import {transformRequest} from "./transform";

env.config();

const server = new Koa();
const router = new Router();

const PORT = process.env.PORT || 4444;

router.get('/', (ctx) => {
  ctx.body = 'Hello from heroku =)';
})

router.post("/transform", koaBody(), (ctx) => {
  const body = ctx.request.body;

  console.log("transform: ", body);

  const processedData = transformRequest(body);

  ctx.body = {
    status: 200,
    message: "transform",
    data: processedData,
  };
});

server
  .use(logger("tiny"))
  .use(router.routes())
  .use(router.allowedMethods())
  .use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;

    console.log(`${ctx.method}: ${ctx.url} - ${ms}ms`);
  })
  .listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
