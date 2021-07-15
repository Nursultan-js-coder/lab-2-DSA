class LinkedList{
    constructor(){
        this.head=null;
        this.count=0;
    }
    addLast(node){
        if(this.head===null){
            this.head=node;
            this.count++;
            return;
        }
        
        let temp=this.head;
        while(temp.next!==null){
            temp=temp.next;
        }
        temp.next=node;
        this.count++;
        return;
    }
}