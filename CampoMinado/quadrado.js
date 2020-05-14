class Quadrado{
    constructor(i,j){
        this.i = i;
        this.j = j;
        this.vizinhos = 0;
        this.mina = false;
        this.visitado = 0;
    }

    show(){
        stroke(200);

        if(!this.visitado){
            fill(0);
            rect(this.i*w,this.j*h,w,h);
        }else{
            if(this.vizinhos >= 1){
                textSize(w);
                fill(0,0,255);
                text(this.vizinhos,this.i*w+w/5 ,this.j*h+h - h/8);
            }else if(this.mina){
                fill(255,0,0);
                rect(this.i*w,this.j*h,w,h);
            }
        }
    }
}