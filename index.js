const Koa = require('koa');
const path = require('path');
const router = require('koa-router')();
const static = require('koa-static');

const app = new Koa();

const staticPath = './'

// log request URL:
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});

router.get('/data', async (ctx, next) => {
  ctx.response.type = 'application/json';
  ctx.response.body = { code: 0, data: [1, 2, 3] };
});

// add url-route:
// router.get('/hello/:name/', async (ctx, next) => {
//   var name = ctx.params.name;
//   ctx.response.body = `<h1>Hello, ${name}!</h1>`;
// });

app.use(static(path.join(__dirname, staticPath)))

// add router middleware:
app.use(router.routes());

app.listen(3000);
console.log('app started at port 3000...');