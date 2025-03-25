import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { html } from 'hono/html'
export const canvas = new Hono();
canvas.use(logger());

canvas.get('/', (c) => {
  return c.html(html
    `<!DOCTYPE html>
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>n/plase</title>
         <link rel="stylesheet" href="/stylesheets/style.css" />
        <script src="/javascripts/bundle.js" defer></script>
         <canvas class="canvas" width="600" height="400"></canvas>
      </head>
      <body> 
        <input type="color" value="#ff0000" class="color">      
        <button class="applyColorButton">色を反映</button>
        <button class="logoutButton">ログアウト</button>
      </body>
    </html>`
  )
})
   //"dev": "node src/index.js",  