"use strict";
class Deque {
    constructor() {
        this.head = 0;
        this.tail = 0;
        this.items = {};
    }
    isEmpty() {
        return this.tail - this.head == 0;
    }
    clear() {
        this.items = {};
        this.head = 0;
        this.tail = 0;
    }
    toString() {
        let buff = '';
        if (!this.isEmpty()) {
            for (let i = this.tail - 1; i >= this.head; i--) {
                buff += this.items[i] + ', ';
            }
        }
        return buff;
    }
    addFront(element) {
        if (this.isEmpty()) {
            this.items[this.tail] = element;
            this.tail++;
        }
        else if (this.head > 0) {
            this.items[--this.head] = element;
        }
        else {
            for (let i = this.head; i < this.tail; i++) {
                this.items[i + 1] = this.items[i];
            }
            this.items[this.head] = element;
            this.tail++;
        }
    }
    removeFront() {
        if (this.isEmpty()) {
            return undefined;
        }
        let buff = this.items[this.head];
        delete this.items[this.head];
        this.head++;
        return buff;
    }
    addBack(element) {
        this.items[this.tail] = element;
        this.tail++;
    }
    removeBack() {
        if (!this.isEmpty()) {
            let buff = this.items[this.tail - 1];
            delete this.items[this.tail - 1];
            this.tail--;
            return buff;
        }
        return undefined;
    }
}
const deque = new Deque();
console.log(deque.isEmpty());
deque.addBack("John");
deque.addBack("jack");
console.log(deque.toString());
deque.addBack("Carmella");
console.log(deque.toString());
console.log(deque.isEmpty());
console.log(deque.removeFront());
console.log(deque.toString());
console.log(deque.removeBack());
console.log(deque.toString());
deque.addFront("Jill");
console.log(deque.toString());
//# sourceMappingURL=deque.js.map