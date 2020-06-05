
let cols, rows,x,y;
let w = 20;
let grid, stack,openSet,closedSet; //arrays
let current,mazze,start,end; 
let begin,info; //btn e p

function setup(){
    let c = createCanvas(600,600);
    c.style("display","block");

    begin = createButton("RESTART");
    begin.mousePressed(initialize);
    begin.style("display","inline-block");
    begin.style("margin-rigth","20px");

    info = createP("TIME: 0 SECONDS");
    info.style("display","inline-block");
    info.style("margin-left","20px","font-size","15pt");

    initialize();
    frameRate(60);
}

function draw() {
    //background(250);
    //console.log(game);
    
    if(mazze){
        if(x == width-w && y == height-w){
            noStroke();
            fill(0, 255, 0, 100);
            rect(x,y,w,w);
            info.html("FINISHED ON : " + Number(frameCount/60).toFixed(0) + " SECONDS")
        }else{
            info.html("<b>TIME: " + Number(frameCount/60).toFixed(0) + " SECONDS</b>");
        }
    }else{
        info.html("<b>BUILDING MAZZE ... </b>");
        initialize();
    }
}

//inicializa o labirinto 
function  initialize(){
    grid = [];
    stack = [];
    openSet = [];
    closedSet = [];
    x = y = 0;
    mazze = false;

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

    //remove wals of last
    let last = grid[grid.length-1];
    if (last.walls[0]) removeWalls(last,grid[index(last.i, last.j - 1)]);
    if (last.walls[3]) removeWalls(last,grid[index(last.i - 1, last.j)]);

    //drawn labirinto 
    for (let i = 0;i < grid.length; i++) {
        grid[i].show();
    }

    //drawn player and end
    move()
    noStroke();
    fill(255, 0, 0, 100);
    rect(width-w,height-w,w,w);

    //initialize Start and end
    start = grid[0];
    end = grid[grid.length - 1];
    
    // openSet starts with beginning only (A*)
    openSet.push(start);

    //validate the mazze
    astar();
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
            current = stack.shift();
        }else{    
            //end 
            break;
        }       
    }
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
        move();
    }else if(keyCode == DOWN_ARROW && !grid[i].walls[2]){
        grid[i].show();
        y += 20;
        move();
    }else if(keyCode == LEFT_ARROW && !grid[i].walls[3]){
        grid[i].show();
        x -= 20;
        move();
    }else if(keyCode == RIGHT_ARROW && !grid[i].walls[1]){
        grid[i].show();
        x += 20;
        move();
    }
}

function move(){
    noStroke();
    fill(0, 0, 255, 100);
    rect(x,y,w,w);
}
