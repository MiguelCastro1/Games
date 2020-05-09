class Jogador{
  constructor(x,y,velocidade,largura,comprimento){
    this.x = x;
    this.y = y;
    this.direcao = 1;
    this.pontos = 0;
    this.velocidade = velocidade;
    this.largura = largura;
    this.comprimento = comprimento;
  }
  
  atualiza_posicao(){
    this.y = this.y +  this.velocidade * this.direcao; 
    if(this.y <= 0) this.y = 0;
    if(this.y >= height-this.comprimento)  this.y = height-this.comprimento;
  }
  
  move(keycode,up,down){
    if(keycode == up){
      if(this.direcao == 1)
        this.direcao *= -1;      
      this.atualiza_posicao();
    }else if(keyCode == down){
      if(this.direcao == -1)
        this.direcao *= -1;      
      this.atualiza_posicao();
    }
  }
  
  desenha(){
    fill(0);
    rect(this.x,this.y,this.largura,this.comprimento);
  }
}


class Bola{
  constructor(x,y,dy,dx,velocidade,raio){
    this.x = x;
    this.y = y;
    this.out = false;
    this.direcaoX = dx;
    this.direcaoY = dy;
    this.velocidade = velocidade;
    this.raio = raio;
  }
  
  move(){
    this.x += this.velocidade * this.direcaoX;
    this.y += this.velocidade * this.direcaoY;
  }
  
  colisao_bola(j1,j2){
    //colisao com tabua - jogador1
    if(!this.out && this.x <= 10 && this.direcaoX == -1 && (this.y >= j1.y-this.raio/2 && this.y <= j1.y+j1.comprimento+this.raio/2)){
      this.direcaoX *= -1;
      return ;
    }

    //colisao com tabua - jogador2
    if(!this.out && this.x >= width - 10 && this.direcaoX == 1 && (this.y >= j2.y-this.raio/2 && this.y <= j2.y+j2.comprimento+this.raio/2)){
      this.direcaoX *= -1;
      return ;
    }

      if(this.x - 10 <= 0) this.out = true;
      
    //bola out
    if(this.x <= -1 * this.raio/2-2){
      j2.pontos += 1;
      this.out = false;
      this.direcaoX *= -1;
      this.direcaoY *= -1;
      this.x = width/2;
      this.y = height/2-150;
      //this.velocidade = 0;
      return ;
    }
    

    if(this.x >= width+this.raio/2+2){
      j1.pontos += 1;
      this.out = false;
      this.x = width/2;
      this.direcaoX *= -1;
      this.direcaoY *= -1;
      this.y = height/2-150;
      //this.velocidade = 0;
      return ;
    }
    
    //colisao com paredes
    if((this.y <= this.raio/2  && this.direcaoY == -1) || (this.y >= height-this.raio/2 && this.direcaoY== 1)){
      this.direcaoY *= -1;
    }
  }
  
  desenha(){
    fill(0);
    ellipse(this.x,this.y,this.raio,this.raio);
  }
}

let jogador1,jogador2,bola;
let btn_pausa,btn_restart;
function setup() {
  let c = createCanvas(400, 400);
  c.style("display","block");
  bola = new Bola(width/2,height/2-150,1,1,0,20);
  jogador1 = new Jogador(0,0,3,5,40);
  jogador2 = new Jogador(width-5,height/2,3,5,40);

  //butons
  btn_restart = createButton("Iniciar");
  btn_restart.style("display","inline-block");
  btn_restart.mousePressed(restart);

  btn_pausa = createButton("pausar");
  btn_pausa.style("display","inline-block");
  btn_pausa.style("visibility","hidden");
  btn_pausa.mousePressed(pausa);
}




function draw() {
  background(250);
  
  movimento_tabuas();
  
  bola.colisao_bola(jogador1,jogador2);
  jogador1.desenha();
  jogador2.desenha();
  
  textSize(32);
  text(String(jogador1.pontos),width/2 - 100,50);
  text(String(jogador2.pontos),width/2 + 75,50);
  
  bola.desenha()
  
  bola.move()
  //frameRate(2);

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
    bola.velocidade = 3;
    btn_pausa.style("visibility","visible");
    btn_restart.html("Restart");
  }else{
    bola = new Bola(width/2,height/2-150,1,1,0,20);
    jogador1 = new Jogador(0,0,3,5,40);
    jogador2 = new Jogador(width-10,height/2,3,5,40);
    btn_pausa.html("Continuar");
    bola.velocidade = 0;
  }
}

function pausa(){
  if(btn_pausa.html() == "Pausar"){
    btn_pausa.html("Continuar");
    bola.velocidade = 0;
  }else{
    btn_pausa.html("Pausar");
    bola.velocidade = 3;
  }
}