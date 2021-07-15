

let tempWeight;
let min=999999;
let shortestPath=[];
class Graph{
    constructor(v){
        this.V=v;
        this.adj=[];
        this.visited=[]
        this.x=500;
        this.y=10;
        this.min=0;
        this.path=[];
        this.hasPath=false;
        this.data=[];
        this.weights=[];

        for(let i=0;i<v;i++){
            this.adj[i]=new LinkedList();
            this.visited[i]=false;
            this.data[i]=[];
            for(let j=0;j<v;j++){
                this.data[i][j]=0;
            }
        }
    
    }
    displayData(){
        for(let i=0;i<this.V;i++){
            
            for(let j=0;j<this.V;j++){
               console.log(this.data[i][j]);
            }
        }
    }
    addEdge(v,w,weight,xv,yv,xw,yw){
        let nodeV;
        let nodeW;
        let margin=100;
        if(this.adj[v].head===null){
            nodeV=new Node(v,0,xv,yv)
            this.adj[v].addLast(nodeV);
            
        }

        if(this.adj[w].head===null){
            nodeW=new Node(w,0,xw,yw)
            this.adj[w].addLast(nodeW);
 
        }
        if(this.adj[w].head===null){
        this.adj[v].addLast(new Node(w,weight,xw,yw));
        this.data[v][w]=weight;
        }
        else{
        this.adj[v].addLast(new Node(w,weight,this.adj[w].head.x,this.adj[w].head.y));
        this.data[v][w]=weight;
        }
        if(this.adj[v].head===null){
            
            this.adj[w].addLast(new Node(v,weight,xv,yv));
            this.data[w][v]=weight;}
        else{
            this.data[w][v]=weight;
            this.adj[w].addLast(new Node(v,weight,this.adj[v].head.x,this.adj[v].head.y));
        }
      

    }

    // /////////
     async bfsUtil(src){
        let queue = [];
        this.visited[src] = true;
        queue.push(this.adj[src].head);        
        while(queue.length > 0)
        {
            let item = queue.shift();
            textSize(20);
            noStroke();
            fill(255);
            text(`${item.val}-->`,this.x,18);
            this.x+=50;
            await this.sleep(300);
            item.colorify();
           
            let node = this.adj[item.val].head;
            while(node!=null){
                if(!this.visited[node.val]){
                    this.visited[node.val]=true;
                    queue.push(node);
                    
                }
                node=node.next;
            }
        
        }
    }
    async bfs(src){
        this.x=100;
        fill(0);
        noStroke()
        rect(0,0,width,30);
        for(let i=0;i<this.V;i++){
            this.visited[i]=false;
        }
       await this.bfsUtil(src);
    }
    
    // /////////
    async dfsUtil(src){
      
        this.visited[src]=true;
        
        let temp=this.adj[src].head;

         textSize(20);
           noStroke();
             fill(255);
            text(`${temp.val} -->`,this.x,18);
            this.x+=50;
       await this.sleep(300);
       temp.colorify();

        while(temp!==null){
         if(!this.visited[temp.val]){
         await this.sleep(300)
         await this.dfsUtil(temp.val);
         }
         temp=temp.next;
     }
     
    
     }
       
    async dfs(src){
        this.x=100;
        fill(0);
        noStroke()
        rect(0,0,width,30);
        for(let i=0;i<this.V;i++){
            this.visited[i]=false;
        }
        this.dfsUtil(src);
    }
    
    // /////////

    display(){
        for(let i=0;i<this.V;i++){
            
            let head=this.adj[i].head;
            if(head!==null){
            head.draw();
            textSize(16)
          
            let temp=this.adj[i].head;
            
                temp=temp.next;
               
                while(temp!=null){
                    strokeWeight(3) 
                    fill(255)
                    stroke("#666")
                    line(head.x,head.y,temp.x,temp.y);
                    noStroke()
                    
                    temp.draw();
                    head.draw();
                    let x=(temp.x+head.x)/2+20
                    let y=(temp.y+head.y)/2+30;
                    noStroke()
                    textSize(20);
                    fill(color(255, 145, 2));
                    text(temp.weight,x,y);
                    temp=temp.next;
                }
                


               
              }
        }
    }
    // /////////////////// printing all path from src to destination
    async printAllPath(src,dest){
        min=999999;
        shortestPath=[];
        fill(0);
        noStroke();
        rect(500,0,width,150);
        this.y=20;
        this.x=100;
        this.hasPath=false;
         for(let i=0;i<this.V;i++){
             this.visited[i]=false;
             this.path=[];
         }
         
         this.path.push(src);
         let weight=0;
        await  this.printAllPathUtil(src,dest,weight);
         if(this.hasPath){
             console.log("shortes path found",shortestPath);
             console.log("shortes path value ",min);
             await this.printResultPath(shortestPath,min,true);
         }

    
     
     }
       async printAllPathUtil(src,dest){

         if(src===dest){
             this.hasPath=true;
             if(min > this.sum(this.weights)){
                 min=this.sum(this.weights);
                 shortestPath=_.cloneDeep(this.path);
             }
             console.log(`destination is reached path (weight :${this.weights} ) :` ,this.path);
             
            await  this.printResultPath(this.path,this.sum(this.weights),false);
             return;
         }
       
         this.visited[src]=true; 
         let head=this.adj[src].head;
         let temp=this.adj[src].head;
 
        while(temp!==null){
          if(!this.visited[temp.val]){
             this.path.push(temp.val);
             this.weights.push(this.data[head.val][temp.val]);
             tempWeight=this.data[head.val][temp.val];
            await  this.printAllPathUtil(temp.val,dest);
             this.path.pop();
             this.weights.pop();


          }
          temp=temp.next;
      }
      this.visited[src]=false;
      
     
      }
      sum(){
          let sum=0;
          for(let i=0;i<this.weights.length;i++){
            sum+=this.weights[i];
          }
          return sum;
      }
    
    async printResultPath(path,weight,isShortest){
        this.x=500;
        for(let i=0;i<path.length;i++){
            await this.sleep(50);
            console.log(path[i]);
            let node=this.adj[path[i]].head;
            node.colorify();
            fill(255);
            noStroke()
            textSize(20);
            strokeWeight(4);
            if(isShortest)
            fill("red");
            text(node.val,this.x,this.y);
            this.x+=20;
            textSize(15);
            strokeWeight(2);
            if(isShortest)
            fill("red");
            text("-->",this.x,this.y);
            this.x+=30;
        }
        fill("magenta");
        text("path value:",this.x,this.y);
        this.x+=80;
        text(weight,this.x,this.y);
        this.x+=30;
        if(isShortest)
        text("shortest",this.x,this.y);

        await this.sleep(1000);
        for(let i=0;i<path.length;i++){
            
            this.adj[path[i]].head.draw();
        }
        if(isShortest){
            let last=this.adj[path[path.length-1]].head;
            for(let i=1;i<path.length;i++){
                await this.sleep(100);
                stroke("red");
                line(this.adj[path[i-1]].head.x,this.adj[path[i-1]].head.y,this.adj[path[i]].head.x,this.adj[path[i]].head.y);
                this.adj[path[i-1]].head.colorify();
            }  
            last.colorify(); 
        }
        this.y+=20;
        this.s

     }


   printSolution(dist)
{
    console.log("Vertex \t\t Distance from Source<br>");
    for(let i = 0; i < this.V; i++)
    {
        console.log(i + " \t\t " + 
                 dist[i]);
    }
}
minDistance(dist, sptSet)
{
      
    let min = Number.MAX_VALUE;
    let min_index = -1;
      
    for(let v = 0; v < this.V; v++)
    {
        if (sptSet[v] == false && dist[v] <= min) 
        {
            min = dist[v];
            min_index = v;
        }
    }
    return min_index;
}
 dijkstra(src)
{
    let dist = new Array(this.V);
    let sptSet = new Array(this.V);
    for(let i = 0; i < this.V; i++)
    {
        dist[i] = Number.MAX_VALUE;
        sptSet[i] = false;
    }
    dist[src] = 0;
      
    for(let count = 0; count < this.V - 1; count++)
    {
          
 
        let u = this.minDistance(dist, sptSet);
          
        sptSet[u] = true;
          
        for(let v = 0; v < this.V; v++)
        {
            if (!sptSet[v] && this.data[u][v] != 0 && 
                   dist[u] != Number.MAX_VALUE &&
                   dist[u] + this.data[u][v] < dist[v])
            {
                dist[v] = dist[u] + this.data[u][v];
                
            }
        }
    }
      
    this.printSolution(dist);
}
 
     

    async sleep(ms){
        return new  Promise(resolve=>setTimeout(resolve,ms));
    }
}