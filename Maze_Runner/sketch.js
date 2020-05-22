let cols, rows;
let w = 20;
let grid = [];
let current;
let stack = [];
let x;
let y;
let flag ;
let p;
function setup(){
    let c = createCanvas(600,600);
    c.style("display","block");

    inicia = createButton("Reiniciar");
    inicia.mousePressed(iniciar);
    inicia.style("display","inline-block");
    inicia.style("margin-rigth","20px");

    p = createP("TEMPO: 0 SEGUNDOS");
    p.style("display","inline-block");
    p.style("margin-left","20px","font-size","15pt");

    iniciar();

}

function draw() {
    //background(250);
   for (let i = 0; flag && i < grid.length; i++) {
        grid[i].show();
    }
   

    flag = false;
    frameRate(60);
    if(x == width-w && y == height-w){
        noStroke();
        fill(0, 255, 0, 100);
        rect(x,y,w,w);
        //p.html("TEMPO : " + Number(frameCount/60).toFixed(0) + " segundos")

    }else{
        p.html("TEMPO : " + Number(frameCount/60).toFixed(0) + " segundos")
        noStroke();
        fill(0, 0, 255, 100);
        rect(x,y,w,w);

        noStroke();
        fill(255, 0, 0, 100);
        rect(width-w,height-w,w,w);
    }
}

function criar_labirinto(){

    while(true){
        current.visited = true;
        
        // STEP 1: check available neighbors and pick a random one
        let next = current.checkNeighbors();
       // console.log(current);
        if (next) {
        next.visited = true;
    
        // STEP 2: Keep track of where were in the stack
        stack.push(current);
    
        // STEP 3: Remove wallks between
        removeWalls(current, next);
    
        // STEP 4: Keep going
        current = next;
        } else if (stack.length > 0) {
            current = stack.pop();

        }else{    
            flag = true;
            break;
        }
    }
}

//inicializa o labirinto
function iniciar(){
    grid = [];
    stack = []
    x = y = 0;
    flag = true;
    
    cols = floor(width/w);
    rows = floor(height/w);
    // Create a grid of Cell objects
    for (let   j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            let cell = new Cell(i, j);
            grid.push(cell);
        }
    }
    // Start with the first
    current = grid[0];
    criar_labirinto()
}

// Find the 1D spot in array for 2D location
function index(i, j) {
  if (i < 0 || j < 0 || i > cols-1 || j > rows-1) {
    return -1;
  }
  return i + j * cols;
}

// Remove any walls between
function removeWalls(a, b) {
  let x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  let y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

function keyPressed() {
    let i = index(x/w,y/w);

    if(i === -1) return ;
   
    if(keyCode ==UP_ARROW && !grid[i].walls[0]){
        grid[i].show();
         y -= 20;
    }else if(keyCode == DOWN_ARROW && !grid[i].walls[2]){
        grid[i].show();
        y += 20;
    }else if(keyCode == LEFT_ARROW && !grid[i].walls[3]){
        grid[i].show();
        x -= 20;
    }else if(keyCode == RIGHT_ARROW && !grid[i].walls[1]){
        grid[i].show();
        x += 20;
    }
}

