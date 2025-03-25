import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { canvas } from './canvas.js'
import { HTTPException } from 'hono/http-exception'
import { authHandler, initAuthConfig, verifyAuth } from '@hono/auth-js'
import { serveStatic } from '@hono/node-server/serve-static'
import { secureHeaders } from 'hono/secure-headers'
import { PrismaClient } from '@prisma/client'
import Google from '@auth/core/providers/google'
import 'dotenv/config'

const prisma = new PrismaClient({
  log: ['query']
});
//Hono設定
const app = new Hono();
app.use('*', secureHeaders())
//ルーター
app.route('/canvas', canvas)
//アカウント認証
app.use(serveStatic({ root: "./public" }));
app.use(
  '*',
  initAuthConfig((c) => ({
    secret: c.env.AUTH_SECRET,
    providers: [
      Google,
    ],
  }))
)
//例外処理
app.onError((err, c) => {
  if (err instanceof HTTPException && err.status === 401) {

    return c.redirect('/api/auth/signin')
  }

  return c.text('Other Error', 500)
})
app.use('/api/auth/*', authHandler())
// 全てのページで認証を必須にする
app.use('*', verifyAuth())
//アクセスされた時
let Userauth=null;
app.get('/', (c) => {
  Userauth = c.get('authUser')
  return c.redirect('/canvas')
})
//サーバー 
const port = process.env.PORT || 3000; 
app.get('/api/get-port', (c) => {
  return c.json({ port });
});

// Start the server after defining routes
console.log(`Server is running on http://localhost:${port}`);

const server = serve({
  fetch: app.fetch,
  port: port 
});


//websocket
import { Server } from 'socket.io';
const io = new Server(server);
await canvasClate(100);
//データベースに挿入
async function dataInit(object) {
  await prisma.Map.deleteMany({
    where: {
      posX: object.x,
      posY: object.y,
    }
  });
  await prisma.map.create({
    data: {
      posX: object.x,
      posY: object.y,
      color: object.color,
    },
  });
}
async function Canvaschanges(data) {
  io.emit('Canvaschanges', data);
}
io.on('connection', async (socket) => {console.log('接続がありました！'); 
 //コネクションしてきたクライアントにだけ送る
  const canvasData = JSON.stringify(await prisma.map.findMany({
    orderBy: [{ posY: 'asc' }, { posX: 'asc' }],
  }));
  socket.emit('canvasData', canvasData);
  socket.emit('Useremail',Userauth);
   //全体に送る
  socket.on('Canvaschanges', async (data) => {
    console.log("受信:", data);
    const Data = JSON.parse(data.statusString);
    await dataInit(Data);
    Canvaschanges(data);
  });

});
//破損時もしくはcanvasリセット時に使う関数
async function canvasClate(canvasSize){
if(await prisma.Map.count()!=canvasSize*canvasSize){
   await prisma.Map.deleteMany();

    const colorNumber = {
    0: 'gray',
    1: 'dimgray',
    2: 'gray',
    };
//白黒模様を生成
    for (let a = 0; a < canvasSize; a++) {
        for (let b = 0; b < canvasSize; b++) {
            const key=a%2+b%2;
            await prisma.map.create({
              data: {
                posX: b,
                posY: a,
                color: colorNumber[key],
              },
            });
          }}}};


