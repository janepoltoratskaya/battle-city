function Tank(){
//TODO:
//add ename tank move to orel
    var canvas = document.getElementById('c'),
    context = canvas.getContext('2d'),
    bgW = 64*13, bgH = 64*10,
    tanks=[],
    images = {
        'p' : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAADFBMVEUAAAD85pyEcgT8mjS3aVkRAAAAfklEQVR42u3WMQ7AIAxD0da5/51LBrBQXJ/Af6sU3kJU8fjezk4ECMARnCTgTgTYQHUc9gC62gVYAE4cJqruCFcB5iayEuFUuwBzE5UnFBbg2kQF8ER14jOA2UQPsADun8hhewsB5iaq+2CYBfh5J+Iv8UYKsIDqwBGb4AMAH8M+F62cJsO7AAAAAElFTkSuQmCC",
        'e' : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAACXBIWXMAAAsTAAALEwEAmpwYAAABR0lEQVRoge2aPQrCQBSEjewRLDyNpAiewcIiB7H0ICksPIOkCJ7GwiMEsQvrCIObH98+mK97ZPeF4TE7gWyxWob+1cdlWIeFXrReqO/fkABrJMAaCbDGvYDQ3tqhOJwbsvR5v5CncZ9vNrvj760gBLdlTRa7n4AEWONeQBE7pms7srTaV3EJVoO9ZVXGJTcieJqfB4D7CUiANe4FBGKv6+njEbh2RiCnAf594H4CEmCNewEJSQzhCvC9APclHB4c9xOQAGvcC0hIYoC7FmwKraDknlYS540EWBMeXTMUSWkKcKtBiie9iJ8l7icgAda4FzA+iTnx2TARJXHeSIA1syUxOH5KK94ZcD8BCbDGvYDxSTzlC5mHa9Ji9xOQAGvcC0hIYrh5mPTHKfEaSR0XSuK8kQBrxicxeJr/6wX4jS1ASZw3EmDNG5W9eJza+PrVAAAAAElFTkSuQmCC",
        '0' : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAgMAAADXB5lNAAAADFBMVEUAAAC6BgDWMgCAgIAGRGAtAAAAM0lEQVQ4y2NkgIJQIF4VxsDASIHAKpBgWOiAC/yH0hQJhFFDIHRwCFAhPEbTx2j6wCIAAFteWsGXoGdnAAAAAElFTkSuQmCC",
        '1' : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAgMAAADXB5lNAAAADFBMVEUAAAC6BgDWMgCAgIAGRGAtAAAAOElEQVR4Xu3IIQ4AMAxC0V2SS3LJrtmCqajA1PQJSP7prIUUOXonMAVI/VSIwgr49F7gox8LhREuGqlesGdYNvkAAAAASUVORK5CYII=",
        "2" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAgMAAADXB5lNAAAADFBMVEUAAAC6BgDWMgCAgIAGRGAtAAAANUlEQVQ4jWMIBYL/QMwAA2QIrAKC/6GrVg20wH8ooEggFAIoE1gFBgMuQIXwGE0fo+kDjwAANU9esGISNt0AAAAASUVORK5CYII=",
        '3' : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAgMAAADXB5lNAAAADFBMVEUAAAC6BgDWMgCAgIAGRGAtAAAAOElEQVR4Xu3IIQ4AMAxC0V2SS3LJrtmCqajA1PQJSP5Bihy9E5gCpH4qRGEFfHov8NGPhcIJjbUuWlBesFKAXL0AAAAASUVORK5CYII=",
        '4' : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAgMAAADXB5lNAAAACVBMVEW6BgCAgIDWMgC+PaXGAAAANklEQVR4nGNgAIJQBgiA0aQKrAKCUDAJoQdKIBQNkCVAYVhAGAhHgcCACVAhPEbTx2j6wCMAAKVYc/DEwHQUAAAAAElFTkSuQmCC",
        'l' : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXBAMAAAASBMmTAAAAFVBMVEUAAABta24nAABpEhtsam0BAQECAgLWB/Z5AAAAVklEQVR4Xp3PsQ2AMAxE0U8mOCQmyAiwAEUG8BJh/xG4wlIKohRcY7/GJ7OPiKMZbEYTIiG+uAGmUKk1AZTrpMcA8BtP+DRB9mTpBJFYvOBVAJ5LjOgFGjYO4RMWqT0AAAAASUVORK5CYII=",
        'o':  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAgMAAADXB5lNAAAADFBMVEUAAABeDRFwbnF0cnVF6HKGAAAAjUlEQVR4Xq3Q0Q3DMAgE0NuoIzBF5knm8RJmia4Tijkp5RPknCx0eh9IGG9kmiYQg/XB8YKzz9U1RoCWwWvM76kQdwIgDVisnKlyfxUsog6faAmkAQdx3eMASAJFAbjkWaFlOE5/fzCCWQAyKKrAbMAk3JPAJRDjnzdhjAtPHJgy8I4dSKdtAI97Dfr5AXx57WmKpPLpAAAAAElFTkSuQmCC"
    },
    direction = 'urdl',
    tankPositions=[['p','u',4,9]
        ,['e','d',0,0],['e','d',12,0],['e','d',3,0]
    ],
    orel={x:6*64,y:9*64},
    maxCountETanks=14,
    countLife =3;

    canvas.width = bgW+64*3;
    canvas.height = bgH;

    var DrawYouWin = function(){
        context.fillStyle = "#000000";
        context.beginPath();
        context.fillRect(0, 0, bgW, bgH);
        context.fill();
        context.fillStyle = "red";
        context.font = "20pt Arial";
        context.fillText("You Win", 360, 320);
    }
    var DrawYouLose = function(){
        context.fillStyle = "#000000";
        context.beginPath();
        context.fillRect(0, 0, bgW, bgH);
        context.fill();
        context.fillStyle = "red";
        context.font = "20pt Arial";
        context.fillText("Game over", 340, 320);
    }
    
    var map=[
      [5,5,5,5,5,5,5,5,5,5,5,5,5],
      [5,4,5,4,5,4,5,4,5,4,5,4,5],
      [5,4,5,4,5,4,4,4,5,4,5,4,5],
      [5,4,5,4,5,4,5,4,5,4,5,4,5],
      [5,5,5,5,5,5,5,5,5,5,5,5,5],
      [4,5,4,4,4,5,4,5,4,4,4,5,4],
      [5,5,5,5,5,5,4,5,5,5,5,5,5],
      [5,4,5,4,5,5,5,5,5,4,5,4,5],
      [5,4,5,4,5,4,4,4,5,4,5,4,5],
      [5,5,5,5,5,4,5,4,5,5,5,5,5]
  ];
    var DrawBg = function(){
        context.fillStyle = "#000000";
        context.beginPath();
        context.fillRect(0, 0, bgW, bgH);
        context.fill();

        for(var i=0;i<10;i++){
            for(var j=0;j<13;j++){
                if(map[i][j]!=5){
                    var img = new Image();
                    img.src=images[map[i][j]];
                    context.drawImage(img, j*64,i*64);
                }
            }
        }
        var img = new Image();
        img.src=images['o'];
        context.drawImage(img, orel.x,orel.y);

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
            if(x>=orel.x&&x<=(orel.x+64)&&y>=orel.y&&y<=(orel.y+64) )
                return false;

            for(var i in tanks){
                if(i!=that.i){
                    if(x>=tanks[i].X&&x<=(tanks[i].X+64)&&y>=tanks[i].Y&&y<=(tanks[i].Y+64) )
                        return false;
                }
            }
            for(i=0;i<imageData.data.length;i=i+4){
                if(!(imageData.data[i]==0 && imageData.data[i]==imageData.data[i+1] && imageData.data[i+1]==imageData.data[i+2]))
                    return false;
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
            if(x>=orel.x&&x<=(orel.x+64)&&y>=orel.y&&y<=(orel.y+64) )
                countLife--;
            else
                for(var i in tanks)
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
                    imageData = context.getImageData(x-aX*4-that.fires[key].sY,y-aY*4-that.fires[key].sX,Math.pow(8,aX),Math.pow(8,aY));

                    if(!(that.fires[key].canMove = canMove(imageData,x, y))){
                        if(!that.isFire(x, y)){
                            var i=Math.floor(x/64),j=Math.floor(y/64),newTypeWall;
                            if(that.fires[key].sX==1){
                                if(y%64==0)j--;
                                newTypeWall=3;
                            }
                            if(that.fires[key].sX==-1)
                                newTypeWall=1;
                            if(that.fires[key].sY==1){
                                if(x%64==0)i--;
                                newTypeWall=2;
                            }
                            if(that.fires[key].sY==-1)
                                newTypeWall=0;
                            if(map[j][i]==4) map[j][i]=newTypeWall;
                            else if(map[j][i]==newTypeWall) map[j][i]=5;
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

                        if(that.fires[key].y<=0||that.fires[key].x<=0||that.fires[key].x>=bgW||that.fires[key].y>=bgH)
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
            gLoop = setTimeout(GameLoop, 100);
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