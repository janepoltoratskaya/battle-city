function Tank(){

    var canvas = document.getElementById('c'),
    context = canvas.getContext('2d'),
    bgW = 64*13, bgH = 64*10,
    tanks=[],

    map=[
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
      ]
    canvas.width = bgW;
    canvas.height = bgH;

    var DrawBg = function(size){
        context.fillStyle = "#000000";
        context.beginPath();
        context.fillRect(0, 0, bgW, bgH);
        context.fill();
        
        for(var i=0;i<10;i++){
            for(var j=0;j<13;j++){
                if(map[i][j]!=0){
                    var img = new Image();
                    img.src=map[i][j];
                    context.drawImage(img, j*64,i*64);
                }
            }
        }
        
        context.beginPath();
        for(var key in wallNot){
            context.rect(wallNot[key].x,wallNot[key].y,wallNot[key].dx,wallNot[key].dy);
            context.fillStyle = '#000000';
            context.fill();
        }
    }

    var direction = 'udrl';
    var tankPositions=[['p','u',0,9],['e','d',0,0],['e','d',12,0]];
    var countETanks =2;
    var wallNot = [];
    function createTanks(){
        var newTank;
        for(var i in tankPositions){
            newTank = new Player;
            newTank.init(tankPositions[i][0],tankPositions[i][1],64*tankPositions[i][2],64*tankPositions[i][3],i);
            tanks[i] = newTank;

        }
    }
    function Player(){
        var that = this;
        that.image = new Image();
        that.life = 3;

        that.init = function(src,direction,x,y,i){
            that.image.src = src;
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
                if(canMove(imageData)){
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
        function canMove(imageData){
            for(var i=0;i<imageData.data.length;i=i+4){
                if(!(imageData.data[i]==0 && imageData.data[i]==imageData.data[i+1] && imageData.data[i+1]==imageData.data[i+2])){
                    return false;
                    break;
                }
            }
            return true;
        }
        that.changeDirection = function(){
//Существует функция смены направления, которая при вызове в первом периоде поведения меняет направление
//танка случайным образом,
//во втором периоде даёт танкам с чётными номерами команду двигаться к первому игроку,
//с нечётными — ко второму,
//а в третьем даёт команду двигаться в сторону штаба.
//
//При пересечении вражеским танком границы тайла (когда обе коодринаты становятся кратны восьми),
//существует вероятность 1/16, что для танка будет вызвана эта функция.
//Если же координаты танка не были кратны восьми, либо же не была вызвана функция
//смены направления, и при всём этом танк упирается в препятствие,
//то с вероятностью 1/4 произойдёт следующее: танк сменит направление
//на противоположное, если хотя бы одна из координат не кратна восьми,
//в ином случае танку будет дана команда смены направления.
//
//При выполнении команды смены направления происходит несколько другое:
//с вероятностью 1/2 вызывается описанная выше функция, иначе с равными
//вероятностями циклически берётся либо предыдущее,
//либо следующее направление из списка: вверх, влево, вниз,
//вправо (т.е. танк поворачивается либо по часовой, либо против часовой стрелки).

            if (that.X % 8 == 0 && that.Y % 8 == 0 && Math.floor((Math.floor(Math.random() * 128))) % 16 == 0)
            {
                //выбирать путь в сторону игрока
                var index = (Math.floor(Math.random() * 4) - 1);
                while(direction[index]==that.sign){
                    index = (Math.floor(Math.random() * 4) - 1)
                }
                that.move(direction[index]);
            }else{
                that.move();
            }
            
            if(!that.fires.length)
                that.fire();
        }
        that.isFire = function(x,y){
            for(var i in tanks){
                if(i!=that.i && that.type!=tanks[i].type){
                    if(x>=tanks[i].X&&x<=(tanks[i].X+64)&&y>=tanks[i].Y&&y<=(tanks[i].Y+64) ){
                        if(tanks[i].type=='p'){
                            tanks[i].life--;
                            console.log(tanks[i].life)
                            //create new tank in start position
                            tanks[i].init(tankPositions[i][0],tankPositions[i][1],64*tankPositions[i][2],64*tankPositions[i][3],i);
                        } else {
                            //удаляем вражеский танк
                            delete tanks[i];
                            countETanks--;
                        }
                    }
                }
            }
            return false;
        }
        that.doFire = function(){
            if(that.fires.length){
                var imageData;
                for(var key in that.fires){
                    aX = Math.abs(that.fires[key].sX);
                    aY = Math.abs(that.fires[key].sY);

                    imageData = context.getImageData(that.fires[key].x-aX*32-that.fires[key].sY,that.fires[key].y-aY*32-that.fires[key].sX,Math.pow(64,aX),Math.pow(64,aY));
                    
                    if(!(that.fires[key].canMove = canMove(imageData))){
                        if(!that.isFire(that.fires[key].x, that.fires[key].y)){
                            //destroy wall
                            if(that.fires[key].sX==1)//u
                                wallNot.push({x:that.fires[key].x-32,y:that.fires[key].y-16,dx:64,dy:16})
                            if(that.fires[key].sX==-1)//d
                                wallNot.push({x:that.fires[key].x-32,y:that.fires[key].y,dx:64,dy:16})

                            if(that.fires[key].sY==1)//l
                                wallNot.push({x:that.fires[key].x-16,y:that.fires[key].y-32,dx:16,dy:64})
                            if(that.fires[key].sY==-1)//r
                                wallNot.push({x:that.fires[key].x,y:that.fires[key].y-32,dx:16,dy:64})
                        }
                        delete that.fires.splice(key,1)
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

                        if(that.fires[key].y<0||that.fires[key].x<0||that.fires[key].x>bgW||that.fires[key].y>bgH){
                            delete that.fires[key]
                        }
                    }
                }
            }
        }
    };

    function doKeyDown(e){
        switch (e.keyCode) {
            case 38: tanks[0].move('u');break;
            case 40: tanks[0].move('d');break;
            case 37: tanks[0].move('l');break;
            case 39: tanks[0].move('r');break;
            case 32: tanks[0].fire();break;
        }
    }
    var GameLoop = function(){
        for(var i in tanks){
            tanks[i].doFire();
        }
        DrawBg();
        for(var i in tanks){
            tanks[i].draw();
        }
        if(countETanks>0&&tanks[0].life>0){
            setTimeout(GameLoop, 1000 / 50);
        }else{
            if(tanks[0].life<=0)
                alert('you lose!')
            if(countETanks<=0)
                alert('you win!')
        }
    }

    createTanks();
    GameLoop();
    
    window.addEventListener('keydown',doKeyDown,true);
}

window.addEventListener( 'load', function(){
    bm = new Tank;
});