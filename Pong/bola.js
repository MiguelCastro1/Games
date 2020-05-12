
class Bola{
    constructor(x,y,dy,dx,velocidade,raio){
      this.movimento = false;
      this.x = x;
      this.y = y;
      this.out = false;
      this.espaco = 33;
      this.direcaoX = dx;
      this.direcaoY = dy;
      this.velocidade = velocidade;
      this.raio = raio;
    }
    
    move(){
      if(this.movimento){
        this.x += this.velocidade * this.direcaoX;
        this.y += this.velocidade * this.direcaoY;
      }
    }
    
    colisao_bola(j1,j2){
      //colisao jogador
      if(!this.out && this.x <= this.espaco && this.direcaoX == -1){
        //colisao com jogador dentro
        if(this.y >= jogador1.y && this.y <= jogador1.y + 40){
          this.direcaoX *= -1;
          return ;
        }
				
				//colisao nos cantos
        if(this.y >= jogador1.y-5 && this.y <= jogador1.y + 40+5){
          this.direcaoX *= -1;
          if(this.direcaoY == 1){
						if(this.y <= jogador1.y + 20)
							this.direcaoY *= -1;
					}else{
						if(this.y >= jogador1.y + 20)
							this.direcaoY *= -1;
					}
          return ;
        }

				//colisao nos cantos maximo
				console.log(this.x + " " + this.y);
				if(this.x <= this.espaco-7 && this.y >= jogador1.y - 12 && this.y <= jogador1.y + 40+12){
					this.direcaoX *= -1;
					if(this.direcaoY == 1){
						if(this.y <= jogador1.y + 20)
							this.direcaoY *= -1;
					}else{
						if(this.y >= jogador1.y + 20)
							this.direcaoY *= -1;
					}
					return ;
				}
        
        //bola indo para fora
        if(this.x <= this.espaco - 7 || this.x >= width - this.espaco + 7) 
        	this.out = true;
    	
      }
      
      //colisao full com jogador
      if(!this.out && this.x >= width-this.espaco && this.direcaoX == 1){
        
        //colisao com jogador dentro
        if(this.y >= jogador2.y && this.y <= jogador2.y + 40){
          this.direcaoX *= -1;
          return ;
        }
  
        //colisao nos cantos
        if(this.y >= jogador2.y-5 && this.y <= jogador2.y + 40+5){
					this.direcaoX *= -1;
					if(this.direcaoY == 1){
						if(this.y <= jogador2.y + 20)
							this.direcaoY *= -1;
					}else{
						if(this.y >= jogador2.y + 20)
							this.direcaoY *= -1;
					}
          return ;
				}
				
				//colisao nos cantos maximo
				console.log(this.x + " " + this.y);
				if(this.x >= width-this.espaco + 7 && this.y >= jogador2.y-12 && this.y <= jogador2.y + 40+12){
					this.direcaoX *= -1;
					if(this.direcaoY == 1){
						if(this.y <= jogador2.y + 20)
							this.direcaoY *= -1;
					}else{
						if(this.y >= jogador2.y + 20)
							this.direcaoY *= -1;
					}
					return ;
				}
        
        //bola indo para fora
        if(this.x <= this.espaco - 7 || this.x >= width - this.espaco + 7) 
					this.out = true;	
    	}
  
    	//bola out
      if(this.x <= 0){
        this.out = false;
        this.direcaoX *= -1;
        this.x = width/2;
        this.y = height/2-150;
        jogador2.pontos += 1;
        return ;
      }
    
      //bola out
      if(this.x >= width){
          this.out = false;
          this.direcaoX *= -1;
          this.x = width/2;
          this.y = height/2-150;
          jogador1.pontos += 1;
          return ;
      }
    
      //colisao com paredes
      if((this.y <= 10 && this.direcaoY == -1) || (this.y >= width-10 && this.direcaoY == 1)){
          this.direcaoY *= -1;
          return ;
      }
		}
		
    desenha(){
      fill(0);
      ellipse(this.x,this.y,this.raio,this.raio);
    }
  }