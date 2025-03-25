'use strict';
import io from 'socket.io-client';
document.addEventListener("DOMContentLoaded", function() {
//読み込まれた後に実行
async function getPortFromServer() {
    const response = await fetch('/api/get-port');
    const data = await response.json();
    const port = data.port || 3000;  // 環境変数のポートがない場合は 3000 をデフォルトにする
    console.log(`ポート番号: ${port}`);
    return io(`http://localhost:${port}`);  // URL の文字列に変換して接続
}

async function main_app(socket){

const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');
const colorPalette = document.querySelector('.color');
const applyColorButton = document.querySelector('.applyColorButton');
const logoutButton =document.querySelector('.logoutButton');
const canvasPosX=10,canvasPosY=10;
const intervalTime=10;
let width = window.innerWidth-20;
let height = window.innerHeight-20;
let canvasSize=100;
let pixelsize=null;
let userId=null;
let color=null;
canvas.style.top="100px"
canvas.style.top = canvasPosY+"px";
canvas.style.left = canvasPosX+"px";
//たて画面と横画面に対応
if(width<height){
 pixelsize=width/canvasSize;
}else{
 pixelsize=height/canvasSize;
}
canvas.width =canvasSize*pixelsize;
canvas.height = canvasSize*pixelsize;
console.log(logoutButton.offsetWidth);
if(width<height){ (colorPalette.style.top=canvas.height*1.03)+"px";
    colorPalette.style.top=canvas.height*1.03+"px";

    applyColorButton.style.top=canvas.height*1.03+"px";
    applyColorButton.style.left=colorPalette.offsetWidth*2+"px";

    logoutButton.style.left=(width-logoutButton.offsetWidth)+"px";
    logoutButton.style.top=canvas.height*1.03+"px";

}else{
    colorPalette.style.left=canvas.width*1.03+"px";

    applyColorButton.style.left=canvas.width*1.03+"px";
    applyColorButton.style.top=(colorPalette.offsetHeight*2)+"px";

    logoutButton.style.left=canvas.width*1.03+"px";
    logoutButton.style.top=(height-logoutButton.offsetHeight)+"px";
}
//
document.querySelector('.canvas').onclick = function(event){
    const xpos= Math.floor((event.clientX - canvasPosX) / pixelsize);
    const ypos=Math.floor((event.clientY - canvasPosY) / pixelsize);

if(color!=null&&userId!=null){

        let cookies =new Date(document.cookie);
        if(cookies=='Invalid Date'){
            cookies=new Date(0);
        }
        const canvasInterval = new Date();
if(cookies.getTime()<canvasInterval.getTime()){

        canvasInterval.setSeconds(canvasInterval.getSeconds() + intervalTime); 
        const expires = "expires=" + canvasInterval.toUTCString();  
        document.cookie = `username=${canvasInterval};${expires} ; path=/canvas`;
    const mousePos = {
        x: xpos,
        y: ypos,
        color: color,
    };
    const statusString = JSON.stringify(mousePos);
    socket.emit('Canvaschanges', {statusString});
}else{
    alert(`一度塗ると${intervalTime}秒間再度塗ることはできません`);
}
}else{
    if(color==null){
        alert("色を選択してください");
    }else{
        alert("ログインされてません");
    }
};
};


    function canvasUpdate(data){
        context.fillStyle = data.color; 
        context.fillRect(data.x*pixelsize,data.y*pixelsize, pixelsize, pixelsize);
    }
    function canvasLoad(canvasData){
        const canvasLength=Math.sqrt(canvasData.length);
        let num=0;
        console.log(canvasData[0].color);
        for(let y=0;y<canvasLength;y++){
            for(let x=0;x<canvasLength;x++){
                const data =canvasData[num];
                num++;
                context.fillStyle = data.color;
                context.fillRect(x*pixelsize, y*pixelsize, pixelsize, pixelsize);
        }
    }
};


//websocket通信

socket.on("connect_error", (error) => {
    console.error("Socket.IO 接続エラー:", error);
});

socket.on("disconnect", () => {
    console.log("Socket.IO 接続終了");
});

socket.on('Canvaschanges',(data) => {
    canvasUpdate(JSON.parse(data.statusString));
});
socket.on('canvasData',(data) => {
    canvasLoad(JSON.parse(data));
});
socket.on('Useremail', (data) => {
    userId=data.token.email;
});
   
//ボタン処理
applyColorButton.addEventListener('click',async function() {
    color =await document.querySelector('.color').value;
});
logoutButton.addEventListener('click',async function() {
    window.location.href = 'https://accounts.google.com/Logout';
});
}
(async () => {
    const socket = await getPortFromServer();
    main_app(socket);
})();
});


