import {defaultEquals} from "./utils";

export class Node<T> {
    next: any
    value: T

    constructor(element: T) {
        this.value = element;
        this.next = undefined
    }
}

export class LinkedList<T> {
    private count: number;
    private head: Node<T> | undefined;
    equalFn: (a: any, b: any) => boolean

    constructor(equalsFn = defaultEquals) {
        this.count = 0
        this.head = undefined
        this.equalFn = equalsFn;
    }

    push(element: T) {
        const node = new Node<T>(element);
        let current;
        if (this.head == null) {
            this.head = node
        } else {
            current = this.head;
            while (current.next) {
                current = current.next
            }
            current.next = node;
        }
        this.count++
    }

    removeAt(index: number) {
        if (index >= 0 && index < this.count && this.head) {
            let current = this.head;
            if (index == 0) {
                this.head = current.next
            } else {
                // let previous = this.head
                // for(let i = 0 ; i < index; i++){ // experiment with <=
                //     previous = current;
                //     current = current.next;
                // }
                // previous.next = current.next
                let previous = this.getElementAt(index - 1);
                if (previous) {
                    current = previous.next
                    previous.next = current.next;
                } else {
                    return undefined
                }

            }
            this.count--
            return current.value
        }
        return undefined
    }

    getElementAt(index: number) {
        if (index >= 0 && index < this.count && this.head) {
            let node = this.head;
            for (let i = 1; i <= index; i++) {
                node = node.next
            }
            return node;
        }
        return undefined
    }

    insert(element: T, index: number) {
        if (index >= 0 && index <= this.count) {
            const node = new Node(element);
            if (index == 0) {
                node.next = this.head;
                this.head = node;
            } else {
                const previous = this.getElementAt(index - 1)
                if (previous) {
                    node.next = previous.next
                    previous.next = node
                }
            }
            this.count++
            return true
        }
        return false
    }

    indexOf(value: T) {
        let current = this.head;
        for (let i = 0; i < this.count && current; i++) {
            if (this.equalFn(value, current.value)) {
                return i;
            }
            current = current.next
        }
        return -1;
    }

    remove(value: T) {
        return  this.removeAt(this.indexOf(value))
    }

    size() {
        return this.count
    }
    setSize(value: number){
        this.count = value
    }

    isEmpty() {
        return this.count == 0
    }

    getHead() {
        return this.head
    }
    setHead(node: Node<T>){
        this.head = node;
    }
    toString(){
        if(!this.head){
            return ''
        }
        let string = `${this.head.value}`
        let current = this.head.next
        for(let i = 1; i < this.count && current ; i++){
            string = `${string}, ${current.value}`;
            current = current.next
        }
        return string;
    }

}

// const linkedList = new LinkedList<number>();
// linkedList.push(1);
// linkedList.push(10);
// console.log(linkedList.toString())
// linkedList.removeAt(1);
// console.log(linkedList.toString())
// linkedList.insert(45,1);
// linkedList.push(230);
// console.log(linkedList.toString())
// console.log(linkedList.size())
// console.log(linkedList.getElementAt(2))
// console.log(linkedList.size())
// console.log(linkedList.indexOf(230))
// console.log(linkedList.remove(230))
// console.log(linkedList.toString())

