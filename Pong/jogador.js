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