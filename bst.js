class Node {
    constructor(data) {
        this.data = data;
        this.leftChildren = null
        this.rightChildren = null;
    }
}

class Tree {
    constructor(array) {
        this.array = array;
        this.root = this.buildTree(array);
    }


    buildTree (array) {
        const newArray = this.removeDuplicates(array);
        const root = this.bst(newArray, newArray.length - 1);

        return root;
    }


    removeDuplicates (array) {
        let uniqueArray = [];
        array.forEach((item) => {
            if (!uniqueArray.includes(item)) {
                uniqueArray.push(item);
            }
        })
        uniqueArray.sort((a, b) => a - b);
        return uniqueArray;
    }

    bst(array, end, start = 0) {
        if (start > end) {
            return null;
        }   else {
            const mid = Math.floor((start + end) / 2);
            const root = new Node(array[mid]);

            const leftEnd = mid - 1;

            root.leftChildren = this.bst(array, leftEnd)

            const rightStart = mid + 1;
            const rightEnd = end;

            root.rightChildren = this.bst(array, rightEnd, rightStart);

            return root;


        }

    }

    insert(value) {
        this.root = this.insertNode(this.root, value)
    }

    insertNode(root, value) {
        if (!root) {
            return new Node(value);
        }   else {
            if (value < root.data) {
                root.leftChildren = this.insertNode(root.leftChildren, value)

            }   else if (value > root.data) {
                root.rightChildren = this.insertNode(root.rightChildren, value);
            }
        }
        return root;
    }

    deleteItem(value) {
        this.root = this.deleteNode(this.root, value);
    }
    
    deleteNode(root, value) {
        if (!root) return null;
    
        if (value < root.data) {
            root.leftChildren = this.deleteNode(root.leftChildren, value);
        } else if (value > root.data) {
            root.rightChildren = this.deleteNode(root.rightChildren, value);
        } else {
            // Node with one child or no child
            if (!root.leftChildren) return root.rightChildren;
            if (!root.rightChildren) return root.leftChildren;
    
            // Node with two children: Get the inorder successor
            root.data = this.minValue(root.rightChildren);
            // Delete the inorder successor
            root.rightChildren = this.deleteNode(root.rightChildren, root.data);
        }
        return root;
    }
    
    minValue(node) {
        let current = node;
        while (current.leftChildren) {
            current = current.leftChildren;
        }
        return current.data;
    }

    find(value) {
        return this.findNode(this.root, value);
    }
    
    findNode(root, value) {
        if (!root || root.data === value) {
            return root;
        }
    
        if (value < root.data) {
            return this.findNode(root.leftChildren, value);
        } else {
            return this.findNode(root.rightChildren, value);
        }
    }

    levelOrder(callback) {
        if (typeof callback !== 'function') {
            throw new Error('A callback function is required.');
        }

        const queue = [];
        if (this.root) {
            queue.push(this.root);
        }

        while (queue.length > 0) {
            const node = queue.shift();
            callback(node);

            if (node.leftChildren) {
                queue.push(node.leftChildren);
            }
            if (node.rightChildren) {
                queue.push(node.rightChildren);
            }
        }
    }


    inOrder(callback) {
        if (typeof callback !== 'function') {
            throw new Error('A callback function is required.');
        }
        this.inOrderTraversal(this.root, callback);
    }

    inOrderTraversal(node, callback) {
        if (node) {
            this.inOrderTraversal(node.leftChildren, callback);
            callback(node);
            this.inOrderTraversal(node.rightChildren, callback);
        }
    }

    preOrder(callback) {
        if (typeof callback !== 'function') {
            throw new Error('A callback function is required.');
        }
        this.preOrderTraversal(this.root, callback);
    }

    preOrderTraversal(node, callback) {
        if (node) {
            callback(node);
            this.preOrderTraversal(node.leftChildren, callback);
            this.preOrderTraversal(node.rightChildren, callback);
        }
    }

    postOrder(callback) {
        if (typeof callback !== 'function') {
            throw new Error('A callback function is required.');
        }
        this.postOrderTraversal(this.root, callback);
    }

    postOrderTraversal(node, callback) {
        if (node) {
            this.postOrderTraversal(node.leftChildren, callback);
            this.postOrderTraversal(node.rightChildren, callback);
            callback(node);
        }
    }

    height(node) {
        if (!node) {
            return -1;
        }
        const leftHeight = this.height(node.leftChildren);
        const rightHeight = this.height(node.rightChildren);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(node) {
        if (!node) {
            throw new Error('Node is not present in the tree.');
        }
        return this.calculateDepth(this.root, node, 0);
    }

    calculateDepth(current, targetNode, depth) {
        if (!current) {
            return -1; // Target node not found
        }
        if (current === targetNode) {
            return depth;
        }

        const leftDepth = this.calculateDepth(current.leftChildren, targetNode, depth + 1);
        if (leftDepth !== -1) {
            return leftDepth;
        }

        return this.calculateDepth(current.rightChildren, targetNode, depth + 1);
    }

    isBalanced() {
        if (!this.root) {
            return true;
        }
        return this.checkBalance(this.root).isBalanced;
    }

    checkBalance(node) {
        if (!node) {
            return { height: -1, isBalanced: true };
        }

        const left = this.checkBalance(node.leftChildren);
        const right = this.checkBalance(node.rightChildren);

        const height = Math.max(left.height, right.height) + 1;
        const isBalanced = left.isBalanced && right.isBalanced &&
                            Math.abs(left.height - right.height) <= 1;

        return { height, isBalanced };
    }

    rebalance() {
        const sortedValues = [];
        this.inOrder(node => sortedValues.push(node.data)); // Collect values
        this.root = this.buildTree(sortedValues); // Build a balanced tree
    }

}


function generateRandomArray(size, max) {
    const array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * max));
    }
    return array;
}

function printTreeElements(tree) {
    console.log('Level Order:');
    tree.levelOrder(node => console.log(node.data));

    console.log('\nPre Order:');
    tree.preOrder(node => console.log(node.data));

    console.log('\nIn Order:');
    tree.inOrder(node => console.log(node.data));

    console.log('\nPost Order:');
    tree.postOrder(node => console.log(node.data));
}

// Create a random BST
const randomArray = generateRandomArray(10, 10);
const tree = new Tree(randomArray);

console.log('Initial Tree:');
console.log('Is Balanced:', tree.isBalanced());
printTreeElements(tree);

// Unbalance the tree by adding numbers > 100
tree.insert(150);
tree.insert(200);
tree.insert(250);

console.log('\nAfter Adding Numbers > 100:');
console.log('Is Balanced:', tree.isBalanced());
printTreeElements(tree);

// Rebalance the tree
tree.rebalance();

console.log('\nAfter Rebalancing:');
console.log('Is Balanced:', tree.isBalanced());
printTreeElements(tree);




