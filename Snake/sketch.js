let snake;
let food;
let  w = 20;
let btn_restart, btn_pausa,info;
let dir;

function setup(){
  let c = createCanvas(500,500);
  snake = new Snake();
  food = newFood();
  frameRate(8);

  c.style("display","block");
  btn_restart = createButton("Restart");
  btn_restart.style("display","inline-block");
  btn_restart.mousePressed(restart);

  btn_pausa = createButton("Pausar");
  btn_pausa.style("display","inline-block");
  btn_pausa.mousePressed(pausa);

  info = createP("BEST: 0  -- TIME: 0 SECONDS");
  info.style("display","inline-block");
  info.style("margin-left","20px","font-size","15pt");

}

function draw(){
  scale(w);
  background(50);

  if(snake.eat())
    food = newFood();
  snake.move()
  snake.show();
  
  

  strokeWeight(0.1);
  stroke(0);
  fill(255,0,0);
  rect(food.x,food.y,1,1);
}

function newFood(){
  let x = floor(random(width/w))
  let y = floor(random(height/w));
  return createVector(x,y);
}

function keyPressed() {
  if(keyCode == UP_ARROW){
      snake.direction(0,-1);
  }else if(keyCode == DOWN_ARROW){
      snake.direction(0,1);
  }else if(keyCode == LEFT_ARROW){
      snake.direction(-1,0);
  }else if(keyCode == RIGHT_ARROW){
      snake.direction(1,0);
  }
}

function restart(){
  snake.die();
  food = newFood();
}

function pausa(){
  if(btn_pausa.html() ==  "Pausar"){
    dir = createVector(snake.dx,snake.dy);
    snake.direction(0,0);
    btn_pausa.html("Continuar");
  }else{
    snake.direction(dir.x,dir.y);
    btn_pausa.html("Pausar");
  }

}