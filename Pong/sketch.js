
let jogador1,jogador2,bola;
let btn_pausa,btn_restart;

function setup() {
  let c = createCanvas(400, 400);
  c.style("display","block");

  //instanciacao
  bola = new Bola(width/2,height/2-170,1,1,1,20);
  jogador1 = new Jogador(20,20,2,5,40);
  jogador2 = new Jogador(width-5-20,height/2,3,5,40);

  //butons
  btn_restart = createButton("Iniciar");
  btn_restart.style("display","inline-block");
  btn_restart.mousePressed(restart);

  btn_pausa = createButton("Pausar");
  btn_pausa.style("display","inline-block");
  btn_pausa.style("visibility","hidden");
  btn_pausa.mousePressed(pausa);
}

function draw() {
  background(250);
  jogador1.desenha();
  jogador2.desenha();
  
  textSize(32);
  text(String(jogador1.pontos),width/2 - 100,50);
  text(String(jogador2.pontos),width/2 + 75,50);
  
  movimento_tabuas();
  
  bola.desenha()
  
  bola.move()

  bola.colisao_bola(jogador1,jogador2);

  //frameRate(10);
}

function movimento_tabuas(){
 if(keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW))
    jogador1.atualiza_posicao();
  
  if(keyIsDown(SHIFT) || keyIsDown(CONTROL))
    jogador2.atualiza_posicao();
}

function keyPressed() {
    jogador1.move(keyCode,UP_ARROW,DOWN_ARROW);
    jogador2.move(keyCode,SHIFT,CONTROL);
}

function restart(){

  if(btn_restart.html() == "Iniciar"){
    bola.movimento = true;
    btn_pausa.style("visibility","visible");
    btn_restart.html("Restart");
  }else{
    bola = new Bola(width/2,height/2-170,1,1,0,20);
    jogador1 = new Jogador(0,0,3,5,40);
    jogador2 = new Jogador(width-10,height/2,3,5,40);
    btn_pausa.html("Continuar");
    bola.movimento = false;
  }
}

function pausa(){
  if(btn_pausa.html() == "Pausar"){
    btn_pausa.html("Continuar");
    bola.movimento = false;
  }else{
    btn_pausa.html("Pausar");
    bola.movimento = true;
  }
}