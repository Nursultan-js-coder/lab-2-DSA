
let graph;
let choice;
let value;
let nodeValue;
let vertex;
let vertex1;
let src;
let dest;
function setup() {
	createCanvas(windowWidth*0.85, windowHeight);
    noLoop();
    graph=new Graph(100);

    graph.addEdge(0,1,2,200,400,300,200);
    graph.addEdge(0,3,8,200,400,300,600);
    graph.addEdge(3,2,1,300,600,350,400);
    graph.addEdge(1,2,4,300,200,350,400);
    graph.addEdge(2,7,9,350,400,600,200);
    graph.addEdge(3,4,6,300,600,450,600);
    graph.addEdge(1,7,7,300,200,600,200);
    graph.addEdge(6,7,4,700,400,600,200);
    graph.addEdge(6,5,3,700,400,600,600);
    graph.addEdge(4,5,5,450,600,600,600);

    
    let div = createDiv(`<form id="form">
<input id="input"></input>
<button id="bfs">bredth first search</button>
<button id="dfs">depth first search</button>
</form>`);
 
    div.position(width, 10);
    let form=document.querySelector("#form");
    let buttonBFS=form.querySelector("#bfs");
    let buttonDFS=form.querySelector("#dfs");
    let input=form.querySelector("#input");
    input.addEventListener("change",updateValue);
    buttonBFS.addEventListener("click",update);
    buttonDFS.addEventListener("click",update);
    form.addEventListener("submit",submitHandler);
     
    // /////

    // let div1 = createDiv(`<form id="form1">
    // <input id="input1"></input>
    // <button id="add">Add Node</button>
    // </form>`);
      
    //     div1.position(width, 160);
    //     let form1=document.querySelector("#form1");
    //     let add=form1.querySelector("#add");
    //     let input1=form1.querySelector("#input1");
    //     input1.addEventListener("change",updateNodeValue);
    //     // add.addEventListener("click",addNode);
    //     form1.addEventListener("submit",addNode);
         
    // // ////
    // let div2 = createDiv(`<form id="form2">
    // <input id="vertex1" class="vertex"></input>
    // <input id="vertex2" class="vertex"></input>
    // <button id="addEdge">Add Edge</button>
    // </form>`);
        
    //     div2.position(width, 270);
    //     let form2=document.querySelector("#form2");
    //     let input2=form2.querySelector("#vertex1");
    //     let input3=form2.querySelector("#vertex2");
    //     input3.addEventListener("change",updateVertex1);
    //     input2.addEventListener("change",updateVertex);
    //     form2.addEventListener("submit",addNodeEdge);
         
    //     // /////
		let div3 = createDiv(`<form id="form3">
		<input id="src" class="vertex"></input>
		<input id="dest" class="vertex"></input>
		<button id="printPath">Print Paths</button>
		</form>`);
			
			div3.position(width, 420);
			let form3=document.querySelector("#form3");
			let src=form3.querySelector("#src");
			let dest=form3.querySelector("#dest");
			dest.addEventListener("change",updateDest);
			src.addEventListener("change",updateSrc);
			
			form3.addEventListener("submit",printAllPath);
			
			 
    // /////

 
    
    
    
}

function draw() {
background(0);
stroke("#fff");
fill(255)

graph.display();


}

function submitHandler(e){
    e.preventDefault();
    console.log(choice);
    if(choice === "bfs"){
        if(value!==""){
        graph.display();
    graph.bfs(value);
        }
    }
    else{
        if(value!==""){
            graph.display();
        graph.dfs(value);
            }

    }
}

function update(e){
    choice=e.target.id;
}

function updateValue(e){
    value=e.target.value;
}
function addNode(e){
    e.preventDefault();
graph.adj[nodeValue].head=new Node(nodeValue,nodeValue,random(50,width-50),random(50,height-50));
graph.adj[nodeValue].head.draw();
console.log(nodeValue)
}

function updateNodeValue(e){
    nodeValue=e.target.value;
}


function updateVertex(e){
    vertex=e.target.value;
}
function updateVertex1(e){
    vertex1=e.target.value;
}
function addNodeEdge(e){
    e.preventDefault();
    // v,w,weight,xv,yv,xw,yw
    graph.addEdge(vertex,vertex1,graph.data[vertex][vertex1],graph.adj[vertex].head.x,graph.adj[vertex].head.y,graph.adj[vertex1].head.x,graph.adj[vertex1].head.y);
    line(graph.adj[vertex].head.x,graph.adj[vertex].head.y,graph.adj[vertex1].head.x,graph.adj[vertex1].head.y);
    console.log("vertex:",vertex,"vertex1:",vertex1);
    graph.adj[vertex].head.draw()
    graph.adj[vertex1].head.draw()
}
// printint all paths 
function updateSrc(e){
	src=e.target.value;
}
function updateDest(e){
	dest=e.target.value;
}
   function printAllPath(e){
	e.preventDefault();
    graph.printAllPath(parseInt(src),parseInt(dest));
	
}
// 
