class Snake{
    constructor(){
        this.snake = [];
        this.dx = 1;
        this.dy = 0;
        this.snake.push(createVector(floor((width/2)/w),floor((height/2)/w)));
    }

    show(){
        for(let i = 0; i < this.snake.length; i++){
            strokeWeight(0.1);
            stroke(0);
            fill(0,255,0);
            rect(this.snake[i].x,this.snake[i].y,1,1);
        }
    }

    eat(){
        let last = this.snake.length - 1;
        let dis = dist(this.snake[last].x, this.snake[last].y, food.x, food.y)

        if(dis < 1){
            this.grow();
            return true;
        }
        return false;
    }

    grow(){
        this.snake.push(createVector(food.x,food.y));
        console.log(this.snake.length)
    }

    die(){
        info.html("BEST: "+ this.snake.length +" --  TIME: " +  Number(frameCount/60).toFixed(0) + " SECONDS")
        this.snake = [];
        this.dx = 1;
        this.dy = 0;
        this.snake.push(createVector(floor((width/2)/w),floor((height/2)/w)));
        
    }

    move(){
        let i;
        for(i = 0; i < this.snake.length - 1; i++){
            this.snake[i].x = this.snake[i+1].x;
            this.snake[i].y = this.snake[i+1].y;
        }
        this.snake[i].x += 1 * this.dx;
        this.snake[i].y += 1 * this.dy;

        this.verify()
    }

    verify(){
        let last = this.snake.length - 1;
        //out
        if((this.snake[last].x < 0 || this.snake[last].x >= width/w) ||
           (this.snake[last].y < 0 || this.snake[last].y >= height/w)){
            console.log("died");
            this.die();
            return ;
        }

        //colison
        for(let i = 0; i < this.snake.length - 1; i++){
            let dis = dist(this.snake[last].x,this.snake[last].y,this.snake[i].x,this.snake[i].y)
            if(dis < 1){
                console.log("died");
                this.die();
                return ;
            }
        }
    }

    direction(x,y){
        if(this.dx + x != 0)
            this.dx= x;
        if(this.dy + y != 0) 
            this.dy = y;
    }
}