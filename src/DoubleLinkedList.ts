import {LinkedList,Node} from "./LinkedList";
import {defaultEquals} from "./utils";

class DoubleLinkedListNode<T> extends Node<T> {
    prev: Node<T> | undefined | this

    constructor(value: T) {
        super(value);
        this.prev = undefined

    }
}

class DoubleLinkedList<T> extends LinkedList<T> {
    private tail: DoubleLinkedListNode<T> | undefined;

    constructor(equals = defaultEquals) {
        super(equals);
        this.tail = undefined
    }

    insert(element: T, index: number): boolean {
        if (index >= 0 && index <= this.size()) {
            const node = new DoubleLinkedListNode<T>(element);
            let head = this.getHead() as DoubleLinkedListNode<T>;
            if (index == 0) {
                if (head) {
                    node.next = head
                    head.prev = node
                    this.setHead(node)
                } else {
                    this.tail = node;
                    this.setHead(node)
                }
            } else if (index == this.size()) {
                if (this.tail) {
                    this.tail.next = node;
                    node.prev = this.tail;
                    this.tail = node;
                }
            } else {
                const previous = this.getElementAt(index - 1);
                if (previous) {
                    node.next = previous.next;
                    node.prev = previous
                    previous.next.prev = node;
                    previous.next = node
                }
            }
            this.setSize(this.size() + 1)
            return true
        }
        return false
    }
    removeAt(index: number){
        if(index>= 0 && index <= this.size()){
            let current = this.getHead() as DoubleLinkedListNode<T>;
            if(index == 0 ){
                if(current){
                    this.setHead(current.next);
                    if(this.size() == 1){
                        this.tail = undefined
                    } else {
                        current.next.prev = undefined
                    }
                } else if(index == this.size() - 1){
                    if(this.tail){
                        current = this.tail;
                        this.tail = current.prev as DoubleLinkedListNode<T>;
                        this.tail.next = undefined;
                    }
                } else {
                    let current = this.getElementAt(index) as DoubleLinkedListNode<T>;
                    const previous = current.prev;
                    if(previous){
                    previous.next = current.next;
                    current.next.prev = previous;
                    }
                }
            }
            this.setSize(this.size() - 1);
            return current.value
        }
    }
}

const doubleList = new DoubleLinkedList<number>();
doubleList.insert(23,0);
console.log(doubleList.size())
doubleList.insert(24,1);
console.log(doubleList.toString())
doubleList.removeAt(0)
console.log(doubleList.toString())
