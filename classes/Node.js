

const RADIUS=40;
class Node {
    constructor(val,weight,x,y){
      this.val=val;
      this.next=null;
      this.weight=weight;
      this.x=x;
      this.y=y;
    }
    draw(){
        stroke("#666");
        strokeWeight(4)
        fill(255);
        ellipse(this.x,this.y,RADIUS,RADIUS);
        text(this.val, this.x-5, this.y+3)
    }
    colorify(){
        stroke(255);
        strokeWeight(4)
        fill("red");
        ellipse(this.x,this.y,RADIUS,RADIUS);
        text(this.val, this.x-5, this.y+3) 
    }
}
