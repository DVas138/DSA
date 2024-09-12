"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
class CNode {
    // left: CNode<T>
    // right: CNode<T>
    set item(value) {
        this._item = value;
    }
    constructor(key, left = null, right = null) {
        this.left = left;
        this.right = right;
        this._item = key;
    }
    getItem() {
        return this._item;
    }
}
class BSTree {
    constructor(compareFn = utils_1.defaultCompare) {
        this.compareFn = compareFn;
        this.root = null;
    }
    insert(key) {
        if (this.root == null) {
            this.root = new CNode(key);
        }
        else {
            this.insertNode(this.root, key);
        }
    }
    insertNode(node, key) {
        if (this.compareFn(key, node.getItem()) === utils_1.Compare.LESS_THAN) {
            if (node.left == null) {
                node.left = new CNode(key);
            }
            else {
                this.insertNode(node.left, key);
            }
        }
        else {
            if (node.right == null) {
                node.right = new CNode(key);
            }
            else {
                this.insertNode(node.right, key);
            }
        }
    }
    inOrderTraverse(callback) {
        if (this.root)
            this.inOrderTraverseNode(this.root, callback);
    }
    inOrderTraverseNode(node, callback) {
        if (node != null) {
            this.inOrderTraverseNode(node.left, callback);
            callback(node.getItem());
            this.inOrderTraverseNode(node.right, callback);
        }
    }
    preOrderTraverse(callback) {
        this.preOrderTraverseNode(this.root, callback);
    }
    preOrderTraverseNode(node, callback) {
        if (node != null) {
            callback(node.getItem());
            this.preOrderTraverseNode(node.left, callback);
            this.preOrderTraverseNode(node.right, callback);
        }
    }
    postOrderTraverse(callback) {
        this.postOrderTraverseNode(this.root, callback);
    }
    postOrderTraverseNode(node, callback) {
        if (node != null) {
            this.postOrderTraverseNode(node.left, callback);
            this.postOrderTraverseNode(node.right, callback);
            callback(node.getItem());
        }
    }
    minMax(direction) {
        if (this.root) {
            return direction === "min" ? this.minNode(this.root) : this.maxNode(this.root);
        }
    }
    minNode(node) {
        while (node != null && node.left != null) {
            node = node.left;
        }
        return node.getItem();
    }
    findMinNode(node) {
        while (node != null && node.left) {
            node = node.left;
        }
        return node;
    }
    maxNode(node) {
        while (node != null && node.right != null) {
            node = node.right;
        }
        return node.getItem();
    }
    search(key) {
        return this.searchNode(this.root, key);
    }
    searchNode(node, key) {
        if (node == null) {
            return false;
        }
        if (this.compareFn(key, node.getItem()) == utils_1.Compare.LESS_THAN) {
            return this.searchNode(node.left, key);
        }
        else if (this.compareFn(key, node.getItem()) == utils_1.Compare.BIGGER_THAN) {
            return this.searchNode(node.right, key);
        }
        else {
            return true;
        }
    }
    remove(key) {
        if (this.root)
            this.root = this.removeNode(this.root, key); // return sustain the connection with the root
    }
    removeNode(node, key) {
        if (node == null) {
            return null;
        }
        if (this.compareFn(key, node.getItem()) == utils_1.Compare.LESS_THAN) {
            node.left = this.removeNode(node.left, key);
            return node; // to recreate the existing connections (=)
        }
        else if (this.compareFn(key, node.getItem()) == utils_1.Compare.BIGGER_THAN) {
            node.right = this.removeNode(node.right, key);
            return node; // (=)
        }
        else {
            if (node.left == null && node.right == null) {
                node = null;
                return node; //(=)
            }
            else if (node.left == null) {
                node = node.right;
                return node; //(=)
            }
            else if (node.right == null) {
                node = node.left;
                return node; //(=)
            }
            const aux = this.findMinNode(node.right); // the min in the right subtree or the max in the left one are the closest to the original value of node
            node.item = aux.getItem(); // technically deleting the node
            node.right = this.removeNode(node.right, aux.getItem()); // clean the duplicate // or node.left if the min is used
            return node; //(=)
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
class AVLTree extends BSTree {
    constructor(compareFn = utils_1.defaultCompare) {
        super(utils_1.defaultCompare);
        this.compareFn = utils_1.defaultCompare;
        this.root = null;
    }
    getNodeHeight(node) {
        if (node == null)
            return -1;
        return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1; // +1 count the current node
    }
    getBalanceFactor(node) {
        const heightDiff = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
        switch (heightDiff) {
            case -2:
                return utils_1.BalanceFactor.UNBALANCED_RIGHT;
            case -1:
                return utils_1.BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
            case 2:
                return utils_1.BalanceFactor.UNBALANCED_LEFT;
            case 1:
                return utils_1.BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
            default:
                return utils_1.BalanceFactor.BALANCED;
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
    rotationLL(node) {
        if (node && node.left && node.right) {
            const tempNode = node.left;
            node.left = tempNode.right;
            tempNode.right = node;
            return tempNode;
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
    rotationRR(node) {
        if (node && node.left && node.right) {
            const tempNode = node.right;
            node.right = tempNode.left;
            tempNode.left = node;
            return tempNode;
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
    rotateLR(node) {
        if (node && node.left && node.right) {
            let tempNode = this.rotationRR(node.left);
            if (tempNode) {
                node.left = tempNode;
                return this.rotationLL(node);
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
    rotateRL(node) {
        if (node && node.left && node.right) {
            let tempNode = this.rotationLL(node.right);
            if (tempNode) {
                node.right = tempNode;
                return this.rotationRR(node);
            }
        }
    }
    insert(key) {
        this.root = this.insertNode(this.root, key);
    }
    insertNode(node, key) {
        var _a, _b;
        if (node == null) {
            return new CNode(key);
        }
        else if (this.compareFn(key, node.getItem()) == utils_1.Compare.LESS_THAN) {
            node.left = this.insertNode(node.left, key);
        }
        else if (this.compareFn(key, node.getItem()) == utils_1.Compare.BIGGER_THAN) {
            node.right = this.insertNode(node.right, key);
        }
        else {
            return node;
        }
        const balance = this.getBalanceFactor(node);
        if (balance == utils_1.BalanceFactor.UNBALANCED_LEFT) {
            let leftBuff;
            if (this.compareFn(key, (_a = node.left) === null || _a === void 0 ? void 0 : _a.getItem()) == utils_1.Compare.LESS_THAN) {
                leftBuff = this.rotationLL(node);
                if (leftBuff) {
                    node = leftBuff;
                }
            }
            else {
                leftBuff = this.rotateLR(node);
                if (leftBuff) {
                    node = leftBuff;
                }
            }
        }
        if (balance == utils_1.BalanceFactor.UNBALANCED_RIGHT) {
            let rightBuff;
            if (this.compareFn(key, (_b = node.left) === null || _b === void 0 ? void 0 : _b.getItem()) == utils_1.Compare.BIGGER_THAN) {
                rightBuff = this.rotationRR(node);
                if (rightBuff) {
                    node = rightBuff;
                }
            }
            else {
                rightBuff = this.rotateRL(node);
                if (rightBuff) {
                    node = rightBuff;
                }
            }
        }
        return node;
    }
    removeNode(node, key) {
        node = super.removeNode(node, key);
        if (node == null) {
            return node;
        }
        const balance = this.getBalanceFactor(node);
        if (balance == utils_1.BalanceFactor.UNBALANCED_LEFT && node.left) {
            const balanceLeft = this.getBalanceFactor(node.left);
            if (balanceLeft == utils_1.BalanceFactor.BALANCED || balanceLeft == utils_1.BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
                return this.rotationLL(node) || null;
            }
            if (balanceLeft == utils_1.BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
                return this.rotateLR(node.left) || null;
            }
        }
        if (balance == utils_1.BalanceFactor.UNBALANCED_RIGHT && node.right) {
            const balanceRight = this.getBalanceFactor(node.right);
            if (balanceRight == utils_1.BalanceFactor.BALANCED || balanceRight == utils_1.BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT) {
                return this.rotationLL(node) || null;
            }
            if (balanceRight == utils_1.BalanceFactor.SLIGHTLY_UNBALANCED_LEFT) {
                return this.rotateLR(node.right) || null;
            }
        }
        return node;
    }
}
class RedBlackCNode extends CNode {
    constructor(key) {
        super(key);
        this.left = null;
        this.right = null;
        this._color = utils_1.Colors.RED;
        this._parent = null;
    }
    get color() {
        return this._color;
    }
    set color(value) {
        this._color = value;
    }
    get parent() {
        return this._parent;
    }
    set parent(value) {
        this._parent = value;
    }
    isRed() {
        return this._color == utils_1.Colors.RED;
    }
}
class RedBlackTree extends BSTree {
    constructor(compareFn = utils_1.defaultCompare) {
        super(compareFn);
        this.compareFn = compareFn;
        this.compareFn = compareFn;
        this.root = null;
    }
    insert(key) {
        if (!this.root) {
            this.root = new RedBlackCNode(key);
            this.root.color = utils_1.Colors.BLACK;
        }
        else {
            const newNode = this.insertNode(this.root, key);
            if (newNode)
                this.fixTreeProperties(newNode);
        }
    }
    insertNode(node, key) {
        if (this.compareFn(key, node.getItem()) == utils_1.Compare.LESS_THAN) {
            if (!node.left) {
                node.left = new RedBlackCNode(key);
                node.left.parent = node;
                return node.left;
            }
            else {
                this.insertNode(node.left, key);
            }
        }
        else if (this.compareFn(key, node.getItem()) === utils_1.Compare.BIGGER_THAN) {
            if (!node.right) {
                node.right = new RedBlackCNode(key);
                node.right.parent = node;
                return node.right;
            }
            else {
                this.insertNode(node.right, key);
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
    rotateLL(node) {
        const tempNode = node.left;
        if (tempNode) {
            node.left = tempNode.right;
            if (tempNode.right && tempNode.right.getItem()) {
                tempNode.right.parent = node;
            }
            tempNode.parent = node.parent;
            if (!node.parent) {
                this.root = tempNode;
            }
            else {
                if (node === node.parent.left) {
                    node.parent.left = tempNode;
                }
                else {
                    node.parent.right = tempNode;
                }
            }
            tempNode.right = node;
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
    rotateRR(node) {
        const tempNode = node.right;
        if (tempNode) {
            node.right = tempNode.left;
            if (tempNode.left && tempNode.left.getItem()) {
                tempNode.left.parent = node;
            }
            tempNode.parent = node.parent;
            if (!node.parent) {
                this.root = tempNode;
            }
            else {
                if (node === node.parent.left) {
                    node.parent.left = tempNode;
                }
                else {
                    node.parent.right = tempNode;
                }
            }
            tempNode.left = node;
            node.parent = tempNode;
        }
    }
    fixTreeProperties(node) {
        while (node && node.parent && node.parent.isRed() && node.color !== utils_1.Colors.BLACK) {
            let parent = node.parent;
            const grandParent = parent.parent;
            if (grandParent && grandParent.left == parent) {
                const uncle = grandParent.right;
                if (uncle && uncle.color == utils_1.Colors.RED) {
                    grandParent.color = utils_1.Colors.RED;
                    parent.color = utils_1.Colors.BLACK;
                    uncle.color = utils_1.Colors.BLACK;
                    node = grandParent;
                }
                else {
                    //Case 2A
                    if (node == parent.right) {
                        this.rotateRR(parent);
                        node = parent;
                        if (node.parent)
                            parent = node.parent;
                    }
                    //Case 3A
                    this.rotateLL(grandParent);
                    parent.color = utils_1.Colors.BLACK;
                    grandParent.color = utils_1.Colors.RED;
                    node = parent;
                }
            }
            else {
                if (grandParent) {
                    const uncle = grandParent.left;
                    if (uncle && uncle.color == utils_1.Colors.RED) {
                        grandParent.color = utils_1.Colors.RED;
                        parent.color = utils_1.Colors.BLACK;
                        uncle.color = utils_1.Colors.BLACK;
                        node = grandParent;
                    }
                    else {
                        //Case 2B
                        if (node == parent.left) {
                            this.rotateLL(parent);
                            node = parent;
                            node.parent ? parent = node.parent : null;
                        }
                        //Case 3B
                        this.rotateRR(grandParent);
                        parent.color = utils_1.Colors.BLACK;
                        grandParent.color = utils_1.Colors.RED;
                        node = parent;
                    }
                }
            }
        }
        this.root ? this.root.color = utils_1.Colors.BLACK : null;
    }
}
//# sourceMappingURL=Recursion.js.map