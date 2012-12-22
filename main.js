function Tank(){
//TODO:
//1. add animation in move tank
//3. если мы стерли клетку, то очищать массив wallNot и удалять данные из карты

    var canvas = document.getElementById('c'),
    context = canvas.getContext('2d'),
    bgW = 64*13, bgH = 64*10,
    tanks=[],
    images = {
        'p' : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAADFBMVEUAAAD85pyEcgT8mjS3aVkRAAAAfklEQVR42u3WMQ7AIAxD0da5/51LBrBQXJ/Af6sU3kJU8fjezk4ECMARnCTgTgTYQHUc9gC62gVYAE4cJqruCFcB5iayEuFUuwBzE5UnFBbg2kQF8ER14jOA2UQPsADun8hhewsB5iaq+2CYBfh5J+Iv8UYKsIDqwBGb4AMAH8M+F62cJsO7AAAAAElFTkSuQmCC",
        'e' : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAACXBIWXMAAAsTAAALEwEAmpwYAAABR0lEQVRoge2aPQrCQBSEjewRLDyNpAiewcIiB7H0ICksPIOkCJ7GwiMEsQvrCIObH98+mK97ZPeF4TE7gWyxWob+1cdlWIeFXrReqO/fkABrJMAaCbDGvYDQ3tqhOJwbsvR5v5CncZ9vNrvj760gBLdlTRa7n4AEWONeQBE7pms7srTaV3EJVoO9ZVXGJTcieJqfB4D7CUiANe4FBGKv6+njEbh2RiCnAf594H4CEmCNewEJSQzhCvC9APclHB4c9xOQAGvcC0hIYoC7FmwKraDknlYS540EWBMeXTMUSWkKcKtBiie9iJ8l7icgAda4FzA+iTnx2TARJXHeSIA1syUxOH5KK94ZcD8BCbDGvYDxSTzlC5mHa9Ji9xOQAGvcC0hIYrh5mPTHKfEaSR0XSuK8kQBrxicxeJr/6wX4jS1ASZw3EmDNG5W9eJza+PrVAAAAAElFTkSuQmCC",
        '4' : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAgMAAADXB5lNAAAACVBMVEW6BgCAgIDWMgC+PaXGAAAANklEQVR4nGNgAIJQBgiA0aQKrAKCUDAJoQdKIBQNkCVAYVhAGAhHgcCACVAhPEbTx2j6wCMAAKVYc/DEwHQUAAAAAElFTkSuQmCC",
        'l' : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXBAMAAAASBMmTAAAAFVBMVEUAAABta24nAABpEhtsam0BAQECAgLWB/Z5AAAAVklEQVR4Xp3PsQ2AMAxE0U8mOCQmyAiwAEUG8BJh/xG4wlIKohRcY7/GJ7OPiKMZbEYTIiG+uAGmUKk1AZTrpMcA8BtP+DRB9mTpBJFYvOBVAJ5LjOgFGjYO4RMWqT0AAAAASUVORK5CYII="
    },
    direction = 'urdl',
    tankPositions=[['p','u',0,9],['e','d',0,0],['e','d',12,0],['e','d',3,0]],
    maxCountETanks=14,
    countLife =3,
    wallNot = [];
    

    canvas.width = bgW+64*3;
    canvas.height = bgH;

    var DrawYouWin = function(){
        var map=[
          [0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,4,0,4,0,0,0,0,0,0,0,0,0],
          [0,4,0,4,0,4,4,4,0,4,0,4,0],
          [0,0,4,0,0,4,0,4,0,4,0,4,0],
          [0,0,4,0,0,4,4,4,0,4,4,4,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,4,0,0,0,4,0,4,0,4,4,0,0],
          [0,4,0,4,0,4,0,4,0,4,0,4,0],
          [0,0,4,0,4,0,0,4,0,4,0,4,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0]
      ]
        drawAll(map);
    }
    var DrawYouLose = function(){
        var map=[
          [,,,,,,,,,,,,],
          [,,,,,,,,,,,,],
          [,,,,,,,,,,,,],
          [,,,,,,,,,,,,],
          [,,,,4,,4,,4,,,,],
          [,,,,,,,,,,,,],
          [,,,,,,,,,,,,],
          [,,,,,,,,,,,,],
          [,,,,,,,,,,,,],
          [,,,,,,,,,,,,],
      ]
        drawAll(map);
    }
    function drawAll(map){
        context.fillStyle = "#000000";
        context.beginPath();
        context.fillRect(0, 0, bgW, bgH);
        context.fill();
        
        for(var i=0;i<10;i++){
            for(var j=0;j<13;j++){
                if(map[i][j]!=0){
                    var img = new Image();
                    img.src=images[map[i][j]];
                    context.drawImage(img, j*64,i*64);
                }
            }
        }
        context.fillStyle = "#6d6b6e";
        context.beginPath();
        context.fillRect(bgW, 0, bgW+3*64, bgH);
        context.fill();

        context.fillStyle = "black";
        context.font = "18pt Arial";
        context.fillText("Cyberhull", bgW+12, 32);
        context.font = "12pt Arial";
        context.fillText("Battle city: 4kb", bgW+12, 56);

        context.fillStyle = "red";
        for(i=0; i < maxCountETanks;i++){
            img = new Image();
            img.src=images['l'];
            context.drawImage(img, bgW+10+(i%2)*32,64-(i%2)*12+i*12);
        }
    }
    var DrawBg = function(){
        var map=[
          [0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,4,0,4,0,4,0,4,0,4,0,4,0],
          [0,4,0,4,0,0,0,4,0,4,0,4,0],
          [0,0,0,0,4,4,0,4,0,0,0,0,0],
          [0,4,0,4,0,4,0,4,0,4,0,4,0],
          [0,4,0,4,0,4,0,4,0,4,0,4,0],
          [0,0,0,0,0,4,0,4,0,0,0,0,0],
          [0,4,0,4,0,4,4,4,4,4,0,4,0],
          [0,4,0,4,0,4,0,4,0,4,0,4,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0]
      ];

        drawAll(map);

        context.beginPath();
        for(var key in wallNot){
            context.rect(wallNot[key].x,wallNot[key].y,wallNot[key].dx,wallNot[key].dy);
            context.fillStyle = 'black';
            context.fill();
        }
    }


    function createTanks(i){
        var newTank;
        if(maxCountETanks>=(tankPositions.length-1))
            for(var i in tankPositions){
                if(!tanks[i]){
                    newTank = new Player;
                    newTank.init(tankPositions[i][0],tankPositions[i][1],64*tankPositions[i][2],64*tankPositions[i][3],i);
                    tanks[i] = newTank;
                }
            }

    }
    function Player(){
        var that = this;
        that.image = new Image();

        that.init = function(src,direction,x,y,i){
            that.image.src = images[src];
            that.X = x;
            that.Y = y;
            that.sign = direction;
            that.angle = 0;
            that.fires=[];
            that.type=src;
            that.i = i;
        }

        that.move = function(direction){
            if (that.X >= 0 && (that.X + 64 <= bgW) && that.Y >= 0 && that.Y +64 <= bgH) {
                var imageData,angle,x=that.X,y=that.Y;
                that.sign = direction||that.sign;

                switch(that.sign){
                    case 'u':
                        angle = 0;
                        if(y-4>=0)y -= 4;
                        imageData = context.getImageData(x,y,64,1);
                        break;
                    case 'd':
                        angle = Math.PI;
                        if(y+68<=bgH)y += 4;
                        imageData = context.getImageData(x,y+64,64,1);
                        break;
                    case 'r':
                        angle = Math.PI/2;
                        if(x+68<=bgW)x += 4;
                        imageData = context.getImageData(x+64,y,1,64);
                        break;
                    case 'l':
                        angle = 3*Math.PI/2;
                        if(x-4>=0)x -= 4;
                        imageData = context.getImageData(x,y,1,64);
                        break;
                }
                if(canMove(imageData,x, y)){
                    that.X = x;
                    that.Y = y;
                }
                that.angle = angle;
            }
        }
        that.fire = function(){
            var obj={
                sX:0, sY:0, x:0, y:0
            }
            switch(that.sign){
                case 'u':obj.sX = 1;obj.sY = 0;break;
                case 'd':obj.sX = -1;obj.sY = 2;break;
                case 'r':obj.sX = 2;obj.sY = -1;break;
                case 'l':obj.sX = 0;obj.sY = 1;break;
            }
            obj.x = that.X+Math.abs(obj.sX)*32;
            if(obj.sX==2)obj.sX=0

            obj.y = that.Y+Math.abs(obj.sY)*32;
            if(obj.sY==2)obj.sY=0

            that.fires.push(obj)
        }
        function canMove(imageData,x,y){
            for(var i in tanks){
                if(i!=that.i){
                    if(x>=tanks[i].X&&x<=(tanks[i].X+64)&&y>=tanks[i].Y&&y<=(tanks[i].Y+64) ){
                        return false;
                    }
                }
            }
            for(i=0;i<imageData.data.length;i=i+4){
                if(!(imageData.data[i]==0 && imageData.data[i]==imageData.data[i+1] && imageData.data[i+1]==imageData.data[i+2])){
                    return false;
                }
            }
            return true;
        }
        that.changeDirection = function(){
            if (that.X % 32 == 0 && that.Y % 32 == 0 && Math.floor((Math.floor(Math.random() * 128))) % 16 == 0)
            {
                var index = (Math.floor(Math.random() * 4) - 1);
                while(direction[index]==that.sign){
                    index = (Math.floor(Math.random() * 4) - 1)
                }
                that.move(direction[index]);
            }else{
                index+=2;
                if(index>4)index-=4;
                that.move(direction[index]);
                
                if(that.fires.length==0)
                    that.fire();
            }

        }
        that.isFire = function(x,y){
            for(var i in tanks){
                if(i!=that.i && that.type!=tanks[i].type){
                    if(x>=tanks[i].X&&x<=(tanks[i].X+64)&&y>=tanks[i].Y&&y<=(tanks[i].Y+64) ){
                        if(tanks[i].type=='p'){
                            countLife--;
                        } else {
                            maxCountETanks--;
                        }
                        delete tanks[i];
                        setTimeout(createTanks,100);
                    }
                }
            }
            return false;
        }
        that.doFire = function(){
            if(that.fires.length){
                var imageData;
                for(var key in that.fires){
                    var aX = Math.abs(that.fires[key].sX),
                    aY = Math.abs(that.fires[key].sY),
                    x = that.fires[key].x,
                    y = that.fires[key].y;
                    imageData = context.getImageData(x-aX*32-that.fires[key].sY,y-aY*32-that.fires[key].sX,Math.pow(64,aX),Math.pow(64,aY));

                    if(!(that.fires[key].canMove = canMove(imageData,x, y))){
                        if(!that.isFire(x, y)){
                            //destroy wall
                            if(that.fires[key].sX==1)
                                wallNot.push({x:x-32,y:y-16,dx:64,dy:16})
                            if(that.fires[key].sX==-1)
                                wallNot.push({x:x-32,y:y,dx:64,dy:16})

                            if(that.fires[key].sY==1)
                                wallNot.push({x:x-16,y:y-32,dx:16,dy:64})
                            if(that.fires[key].sY==-1)
                                wallNot.push({x:x,y:y-32,dx:16,dy:64})
                        }
                        that.fires.splice(key,1);
                    }
                }
            }
            return true;
        }
        that.draw = function(){
            if(that.type=='e')
                that.changeDirection();

            context.translate( that.X+32, that.Y+32 );
            context.rotate( that.angle );
            context.drawImage(that.image, -32,-32);
            context.rotate( -that.angle );
            context.translate( -(that.X+32), -(that.Y+32) );
            if(that.fires.length){
                for(var key in that.fires){
                    if(that.fires[key].canMove){
                        context.beginPath();
                        context.arc(that.fires[key].x, that.fires[key].y, 4, 0, 2 * Math.PI, false);

                        context.fillStyle = "gray";
                        context.fill();

                        that.fires[key].x += -1*that.fires[key].sY*4;
                        that.fires[key].y += -1*that.fires[key].sX*4;

                        if(that.fires[key].y<0||that.fires[key].x<0||that.fires[key].x>bgW||that.fires[key].y>bgH)
                            that.fires.splice(key,1);
                    }
                }
            }
        }
    }

    function doKeyDown(e){
        switch (e.keyCode) {
            case 38: tanks[0].move('u');break;
            case 40: tanks[0].move('d');break;
            case 37: tanks[0].move('l');break;
            case 39: tanks[0].move('r');break;
            case 32: tanks[0].fire();break;
            case 27: clearTimeout(gLoop);break;
        }
    }
    var GameLoop = function(){
        for(var i in tanks) tanks[i].doFire();

        if(maxCountETanks>0&&countLife>0){
            DrawBg();
            for(i in tanks) tanks[i].draw();
            gLoop = setTimeout(GameLoop, 1000 / 50);
        }else{
            clearTimeout(gLoop)
            
            if(countLife<=0)
                DrawYouLose();

            if(maxCountETanks<=0)
                DrawYouWin()

        }
    }

    createTanks();
    GameLoop();

    window.addEventListener('keydown',doKeyDown,true);
    var gloop;
}
window.addEventListener( 'load', function(){
    bm = new Tank;
});