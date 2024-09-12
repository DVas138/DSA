import {BalanceFactor, Colors, Compare, defaultCompare} from "./utils";

class CNode<T> {
    private _item: T
    // left: CNode<T>
    // right: CNode<T>

    set item(value: T) {
        this._item = value;
    }

    constructor(key: T, public left: CNode<T> | null = null, public right: CNode<T> | null = null) {
        this._item = key;
    }

    getItem() {
        return this._item;
    }
}

class BSTree<T> {
    protected root: CNode<T> | null;

    constructor(protected compareFn: Function = defaultCompare) {
        this.root = null
    }

    insert(key: T) {
        if (this.root == null) {
            this.root = new CNode<T>(key);
        } else {
            this.insertNode(this.root, key);
        }
    }

    protected insertNode(node: CNode<T>, key: T) {
        if (this.compareFn(key, node.getItem()) === Compare.LESS_THAN) {
            if (node.left == null) {
                node.left = new CNode<T>(key)
            } else {
                this.insertNode(node.left, key);
            }
        } else {
            if (node.right == null) {
                node.right = new CNode<T>(key);
            } else {
                this.insertNode(node.right, key);
            }
        }
    }

    inOrderTraverse(callback: Function) {
        if (this.root) this.inOrderTraverseNode(this.root, callback);
    }

    private inOrderTraverseNode(node: CNode<T> | null, callback: Function) {
        if (node != null) {
            this.inOrderTraverseNode(node.left, callback)
            callback(node.getItem())
            this.inOrderTraverseNode(node.right, callback);
        }
    }

    preOrderTraverse(callback: Function) {
        this.preOrderTraverseNode(this.root, callback);
    }

    private preOrderTraverseNode(node: CNode<T> | null, callback: Function) {
        if (node != null) {
            callback(node.getItem());
            this.preOrderTraverseNode(node.left, callback);
            this.preOrderTraverseNode(node.right, callback);
        }
    }

    postOrderTraverse(callback: Function) {
        this.postOrderTraverseNode(this.root, callback);
    }

    private postOrderTraverseNode(node: CNode<T> | null, callback: Function) {
        if (node != null) {
            this.postOrderTraverseNode(node.left, callback);
            this.postOrderTraverseNode(node.right, callback)
            callback(node.getItem())
        }
    }

    minMax(direction: "min" | "max") {
        if (this.root) {
            return direction === "min" ? this.minNode(this.root) : this.maxNode(this.root)
        }
    }

    private minNode(node: CNode<T>) {
        while (node != null && node.left != null) {
            node = node.left
        }
        return node.getItem();
    }

    private findMinNode(node: CNode<T>) {
        while (node != null && node.left) {
            node = node.left
        }
        return node;
    }

    private maxNode(node: CNode<T>) {
        while (node != null && node.right != null) {
            node = node.right
        }
        return node.getItem()
    }

    search(key: T): boolean {
        return this.searchNode(this.root, key);
    }

    private searchNode(node: CNode<T> | null, key: T): boolean {
        if (node == null) {
            return false
        }
        if (this.compareFn(key, node.getItem()) == Compare.LESS_THAN) {
            return this.searchNode(node.left, key);
        } else if (this.compareFn(key, node.getItem()) == Compare.BIGGER_THAN) {
            return this.searchNode(node.right, key)
        } else {
            return true
        }
    }

    remove(key: T) {
        if (this.root)
            this.root = this.removeNode(this.root, key); // return sustain the connection with the root
    }

    protected removeNode(node: CNode<T> | null, key: T): CNode<T> | null {
        if (node == null) {
            return null
        }
        if (this.compareFn(key, node.getItem()) == Compare.LESS_THAN) {
            node.left = this.removeNode(node.left, key)
            return node; // to recreate the existing connections (=)
        } else if (this.compareFn(key, node.getItem()) == Compare.BIGGER_THAN) {
            node.right = this.removeNode(node.right, key)
            return node; // (=)
        } else {
            if (node.left == null && node.right == null) {
                node = null
                return node; //(=)
            } else if (node.left == null) {
                node = node.right;
                return node //(=)
            } else if (node.right == null) {
                node = node.left
                return node //(=)
            }
            const aux = this.findMinNode(node.right); // the min in the right subtree or the max in the left one are the closest to the original value of node
            node.item = aux.getItem() // technically deleting the node
            node.right = this.removeNode(node.right, aux.getItem()) // clean the duplicate // or node.left if the min is used
            return node //(=)
        }
    }

}

// const tree = new BSTree<number>();
// tree.insert(11)
// tree.insert(7)
// tree.insert(15)
// tree.inOrderTraverse((key: number) => console.log(key))
// tree.preOrderTraverse((key: number) => console.log(key))
// console.log('**POST**')
// tree.postOrderTraverse((key: number) => console.log(key))
// console.log('** Search 5 and 15 **')
// console.log(tree.search(5))
// console.log(tree.search(15))


class AVLTree<T> extends BSTree<T> { //Rotations are in reverse direction to their methods' names
    constructor(compareFn = defaultCompare) {
        super(defaultCompare);
        this.compareFn = defaultCompare
        this.root = null;
    }

    getNodeHeight(node: CNode<T> | null): number {
        if (node == null) return -1
        return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1 // +1 count the current node
    }

    getBalanceFactor(node: CNode<T>) {
        const heightDiff = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
        switch (heightDiff) {
            case -2:
                return BalanceFactor.UNBALANCED_RIGHT
            case -1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
            case 2:
                return BalanceFactor.UNBALANCED_LEFT
            case 1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
            default:
                return BalanceFactor.BALANCED
        }
    }

    /**
     * Left left case: rotate right
     *
     *       b                           a
     *      / \                         / \
     *     a   e -> rotationLL(b) ->   c   b
     *    / \                             / \
     *   c   d                           d   e
     *
     * @param node Node<T>
     */
    //1 up and prepare
    //2 down to position
    rotationLL(node: CNode<T>) {
        if (node && node.left && node.right) {
            const tempNode = node.left;
            node.left = tempNode.right;
            tempNode.right = node;
            return tempNode
        }

    }

    /**
     * Right right case: rotate left
     *
     *     a                              b
     *    / \                            / \
     *   c   b   -> rotationRR(a) ->    a   e
     *      / \                        / \
     *     d   e                      c   d
     *
     * @param node Node<T>
     */
    //1 up and prepare
    //2 down to position
    rotationRR(node: CNode<T>) {
        if (node && node.left && node.right) {
            const tempNode = node.right;
            node.right = tempNode.left;
            tempNode.left = node;
            return tempNode
        }
    }


// Left right case
    // eg:
    //     e                              e                               e
    //    / \      rotationRR(node.left) / \        roationLL(node)      / \
    //   c  ...   -> rotationRR(a) ->   c   ...   -> roationLL(c) ->    b   ...
    //  /                              /                               / \
    // a                              b                               a   c
    //  \                            /
    //   b                          a
    rotateLR(node: CNode<T>) {
        if (node && node.left && node.right) {
            let tempNode = this.rotationRR(node.left);
            if (tempNode) {
                node.left = tempNode;
                return this.rotationLL(node)
            }
        }
    }

    // Right left case
    // eg:
    //     a                              a                           a
    //    / \     rotationLL(node.right) / \       roationRR(node)   / \
    // ...   b    -> rotationLL(d) ->  ...  b   -> roationRR(b) -> ...  c
    //        \                              \                         / \
    //        d                               c                       b   d
    //       /                                 \
    //      c                                   d
    rotateRL(node: CNode<T>) {
        if (node && node.left && node.right) {
            let tempNode = this.rotationLL(node.right)
            if (tempNode) {
                node.right = tempNode
                return this.rotationRR(node)
            }
        }
    }

    insert(key: T) {
        this.root = this.insertNode(this.root, key);
    }

    protected insertNode(node: CNode<T> | null, key: T): CNode<T> {
        if (node == null) {
            return new CNode<T>(key);
        } else if (this.compareFn(key, node.getItem()) == Compare.LESS_THAN) {
            node.left = this.insertNode(node.left, key)
        } else if (this.compareFn(key, node.getItem()) == Compare.BIGGER_THAN) {
            node.right = this.insertNode(node.right, key)
        } else {
            return node;
        }
        const balance = this.getBalanceFactor(node);
        if (balance == BalanceFactor.UNBALANCED_LEFT) {
            let leftBuff
            if (this.compareFn(key, node.left?.getItem()) == Compare.LESS_THAN) {
                leftBuff = this.rotationLL(node);
                if (leftBuff) {
                    node = leftBuff;
                }
            } else {
                leftBuff = this.rotateLR(node);
                if (leftBuff) {
                    node = leftBuff;
                }
            }
        }
        if (balance == BalanceFactor.UNBALANCED_RIGHT) {
            let rightBuff
            if (this.compareFn(key, node.left?.getItem()) == Compare.BIGGER_THAN) {
                rightBuff = this.rotationRR(node);
                if (rightBuff) {
                    node = rightBuff;
                }
            } else {
                rightBuff = this.rotateRL(node);
                if (rightBuff) {
                    node = rightBuff;
                }
            }
        }
        return node
    }

    removeNode(node: CNode<T> | null, key: T): CNode<T> | null {
        node = super.removeNode(node, key);
        if (node == null) {
            return node;
        }
        const balance = this.getBalanceFactor(node);
        if (balance == BalanceFactor.UNBALANCED_LEFT && node.left) {
            const balanceLeft = this.getBalanceFactor(node.left);
            if (balanceLeft == BalanceFactor.BALANCED || balanceLeft == BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
                return this.rotationLL(node) || null
            }
            if (balanceLeft == BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
                return this.rotateLR(node.left) || null
            }
        }
        if (balance == BalanceFactor.UNBALANCED_RIGHT && node.right) {
            const balanceRight = this.getBalanceFactor(node.right);
            if (balanceRight == BalanceFactor.BALANCED || balanceRight == BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
                return this.rotationLL(node) || null
            }
            if (balanceRight == BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
                return this.rotateLR(node.right) || null
            }
        }
        return node
    }
}

class RedBlackCNode<T> extends CNode<T> {
    private _color: Colors;
    private _parent: RedBlackCNode<T> | null
    left: RedBlackCNode<T> | null;
    right: RedBlackCNode<T> | null;

    constructor(key: T) {
        super(key);
        this.left = null
        this.right = null
        this._color = Colors.RED
        this._parent = null
    }


    get color() {
        return this._color;
    }

    set color(value) {
        this._color = value;
    }

    get parent(): RedBlackCNode<T> | null {
        return this._parent;
    }

    set parent(value: RedBlackCNode<T> | null) {
        this._parent = value;
    }

    isRed() {
        return this._color == Colors.RED
    }
}

class RedBlackTree<T> extends BSTree<T> {
    protected root: RedBlackCNode<T> | null;

    constructor(protected compareFn = defaultCompare) {
        super(compareFn);
        this.compareFn = compareFn;
        this.root = null;
    }

    insert(key: T) {
        if (!this.root) {
            this.root = new RedBlackCNode(key)
            this.root.color = Colors.BLACK
        } else {
            const newNode = this.insertNode(this.root, key)
            if (newNode) this.fixTreeProperties(newNode);
        }
    }

    protected insertNode(node: RedBlackCNode<T>, key: T) {
        if (this.compareFn(key, node.getItem()) == Compare.LESS_THAN) {
            if (!node.left) {
                node.left = new RedBlackCNode<T>(key);
                node.left.parent = node;
                return node.left
            } else {
                this.insertNode(node.left, key);
            }
        } else if (this.compareFn(key, node.getItem()) === Compare.BIGGER_THAN) {
            if (!node.right) {
                node.right = new RedBlackCNode(key);
                node.right.parent = node;
                return node.right
            } else {
                this.insertNode(node.right, key)
            }
        }
    }

    /**
     * Left left case: rotate right
     *
     *       b                           a
     *      / \                         / \
     *     a   e -> rotationLL(b) ->   c   b
     *    / \                             / \
     *   c   d                           d   e
     *
     * @param node Node<T>
     */
    rotateLL(node: RedBlackCNode<T>){
        const tempNode = node.left;
        if(tempNode){
            node.left = tempNode.right
            if (tempNode.right && tempNode.right.getItem()) {
                tempNode.right.parent = node
            }
            tempNode.parent = node.parent
            if (!node.parent) {
                this.root = tempNode
            } else {
                if (node === node.parent.left){
                    node.parent.left = tempNode
                } else {
                    node.parent.right = tempNode
                }
            }
            tempNode.right = node
            node.parent = tempNode;
        }
    }

    /**
     * Right right case: rotate left
     *
     *     a                              b
     *    / \                            / \
     *   c   b   -> rotationRR(a) ->    a   e
     *      / \                        / \
     *     d   e                      c   d
     *
     * @param node Node<T>
     */
    rotateRR(node: RedBlackCNode<T>) {
        const tempNode = node.right
        if (tempNode) {
            node.right = tempNode.left
            if (tempNode.left && tempNode.left.getItem()) {
                tempNode.left.parent = node
            }
            tempNode.parent = node.parent
            if (!node.parent) {
                this.root = tempNode
            } else {
                if (node === node.parent.left) {
                    node.parent.left = tempNode
                } else {
                    node.parent.right = tempNode
                }
            }
            tempNode.left = node
            node.parent = tempNode;
        }
    }

    fixTreeProperties(node: RedBlackCNode<T>) {
        while (node && node.parent && node.parent.isRed() && node.color !== Colors.BLACK) {
            let parent = node.parent;
            const grandParent = parent.parent
            if (grandParent && grandParent.left == parent) {
                const uncle = grandParent.right;
                if (uncle && uncle.color == Colors.RED) {
                    grandParent.color = Colors.RED
                    parent.color = Colors.BLACK
                    uncle.color = Colors.BLACK
                    node = grandParent
                } else {
                    //Case 2A
                    if (node == parent.right) {
                        this.rotateRR(parent)
                        node = parent
                        if (node.parent) parent = node.parent
                    }
                    //Case 3A
                    this.rotateLL(grandParent)
                    parent.color = Colors.BLACK
                    grandParent.color = Colors.RED
                    node = parent

                }
            } else {
                if (grandParent) {
                    const uncle = grandParent.left
                    if (uncle && uncle.color == Colors.RED) {
                        grandParent.color = Colors.RED;
                        parent.color = Colors.BLACK
                        uncle.color = Colors.BLACK
                        node = grandParent
                    } else {
                        //Case 2B
                        if (node == parent.left) {
                            this.rotateLL(parent)
                            node = parent
                            node.parent ? parent = node.parent : null
                        }
                        //Case 3B
                        this.rotateRR(grandParent)
                        parent.color = Colors.BLACK
                        grandParent.color = Colors.RED
                        node = parent
                    }
                }
            }
        }
        this.root ? this.root.color = Colors.BLACK : null
    }
}

