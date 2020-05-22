let linhas,colunas, w, h;
let minas,campo;
let iniciar,ordem;

function setup(){
    let c = createCanvas(700,600);
    c.style("display","block");

    iniciar = createButton("Reiniciar");
    iniciar.mousePressed(minar_campo);
    iniciar.style("display","inline-block");
    iniciar.style("margin-rigth","20px");

    lbl = createElement("label", "Tamanho");
    lbl.style("margin-left","20px");
    lbl.style("margin-rigth","20px");
    lbl.style("color","blue");
    lbl.style("font-size","15pt");

    ordem = createSlider(10,50,20,10);
    ordem .style("display","inline-block");
    ordem.style("margin-left","20px");

    minar_campo();
}

function draw(){
    background(255);

    for (let i = 0; i < linhas; i++) {
        for (let j = 0; j < colunas; j++) {
            campo[i][j].show();
        }
    }
}

function minar_campo(){
    let color = " " + random(255);
    back = select("body");
    back.style("backgroundColor",color);
    linhas = ordem.value();
    colunas = ordem.value();

    if(linhas > 20)
        minas = 2*linhas+2*colunas;
    else
        minas = linhas+2*colunas;

    w = width/colunas;
    h = height/linhas;

    //inicializando campo
    campo  = new Array(colunas);
    for (let i = 0; i < linhas; i++) {
        campo[i] = new Array(colunas);
        for (let j = 0; j < colunas; j++) {
            campo[i][j] = new Quadrado(i,j);          
        }
    }

    //gerando minas aleatorias no campo
    let c = 0;
    while(c < minas){
        i = floor(random(linhas));
        j = floor(random(colunas));
        if(campo[i][j].mina == false){
            campo[i][j].mina = true;
            c += 1;
        }
    }
}

function mousePressed() {
    let i = floor(mouseX/w);
    let j = floor(mouseY/h);

    if(i >= 0 && i < linhas && j >= 0 && j < colunas && !campo[i][j].visitado){
        jogada(i,j);

        if(!restante()){
            console.log("Victory")
        }
    }

}

function verifica_minas(i,j){
    let cont = 0;

    if(i > 0 && j > 0 && campo[i-1][j-1].mina) cont++;
    if(i > 0 && campo[i-1][j].mina) cont++;
    if(i > 0 && j < colunas -1 && campo[i-1][j+1].mina) cont++;
    if(j > 0 && campo[i][j-1].mina) cont++;
    if(j < colunas-1 && campo[i][j+1].mina) cont++;
    if(i < linhas-1 && j > 0 && campo[i+1][j-1].mina) cont++;
    if(i < linhas-1 && campo[i+1][j].mina) cont++;
    if(i < linhas-1 && j < colunas-1 && campo[i+1][j+1].mina) cont++;

    return cont;
}

function jogada(i,j){
    campo[i][j].visitado = true;

    if(campo[i][j].mina){
        on = false;
        mostrar_minas();
        return ;
    }

    let cont = verifica_minas(i,j);
    campo[i][j].vizinhos = cont;

    //verifica vizinhos
    if (cont == 0){
        if(i > 0 && j > 0 && !campo[i-1][j-1].visitado) jogada(i-1,j-1);
        if(i > 0 && !campo[i-1][j].visitado) jogada(i-1,j);
        if(i > 0 && j < colunas-1 && !campo[i-1][j+1].visitado) jogada(i-1,j+1);
        if(j > 0 && !campo[i][j-1].visitado) jogada(i,j-1);
        if(j < colunas-1 && !campo[i][j+1].visitado) jogada(i,j+1);
        if(i < linhas-1 && j > 0 && !campo[i+1][j-1].visitado) jogada(i+1,j-1);
        if(i < linhas-1 && !campo[i+1][j].visitado) jogada(i+1,j);
        if(i < linhas-1 && j < colunas-1 && !campo[i+1][j+1].visitado) jogada(i+1,j+1);
    }     
}

function restante(){
    for (let i = 0; i < linhas; i++) {
        for (let j = 0; j < colunas; j++) {
            if(!campo[i][j].visitado && !campo[i][j].mina)
                return true;
        }   
    }
    return false;
}

function mostrar_minas(){
    for (let i = 0; i < linhas; i++) {
        for (let j = 0; j < colunas; j++) {
            if(campo[i][j].mina)
                campo[i][j].visitado = true;
        }   
    }
}
