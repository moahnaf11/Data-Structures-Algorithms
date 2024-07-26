class Node {
    constructor (value=null, nextNode=null) {
        this.value = value;
        this.next = nextNode;
    }
}



class LinkedList {
    constructor () {
        this.start = null;
    }

    append(value) {
        if (!this.start) {
            this.start = new Node(value);

        }   else {
            let current = this.start;
            while (current.next) {
                current = current.next;
            }
            current.next = new Node(value);
        }
    }

    prepend(value) {
        let newNode = new Node(value);
        newNode.next = this.start;
        this.start = newNode;

    }

    size() {
        if (this.start) {
            let count = 0;
            let current = this.start;
            while (current) {
                count += 1;
                current = current.next;   
            }
            return count;
        }
        return count;
        
    }

    head() {
        return this.start;
    }

    tail() {
        if (this.start) {
            let current = this.start;
            while (current.next) {
                current = current.next;
            }
            return current;
        }
        return null;

    }

    at(index) {
        if (this.start && index >= 0) {
            let current = this.start;
            let count = 0;
            while (count < index) {
                current = current.next;
                if (current) {
                    count += 1;
                }   else {
                    return null;
                }
            }
            return current
        }
        return null;
    }

    pop() {
        if (this.start) {
            let current = this.start;
            while (current.next) {
                current = current.next;
            }
            current = null;
        }   

    }

    contains(value) {
        if (this.start) {
            let current = this.start;
            while (current) {
                if (current.value === value) {
                    return true;
                }   else {
                    current = current.next;
                }
            }
            return false;
        }
        return false;
    }

    find(value) {
        if (this.start) {
            let index = 0;
            let current = this.start;
            while (current) {
                if (current.value === value) {
                    return index;
                }   else {
                    index += 1;
                    current = current.next;
                }
            }
            return null;
        }
        return null;
    }

    toString() {
        if (this.start) {
            let string = "";
            let current = this.start;
            while (current) {
                string += `(${current.value}) -> `;
                current = current.next;
                
            }
            string += "null"
            return string;
        }
        return "null";
    }

    insertAt(value, index) {
        if (!this.start && index === 0) {
            this.prepend(value);
        }   else if (this.start && index === 0) {
            this.prepend(value);
        }   else if (index < 0) {
            throw new Error("index must be positive");
        }   else if (this.start && index > 0) {
            let current = this.start;
            let count = 0;
            while (current) {
                if (count === index - 1) {
                    let newNode = new Node(value);
                    newNode.next = current.next;
                    current.next = newNode;
                    return

                }
                current = current.next;
                count += 1;
            }
            throw new Error("index out of range")
        }
    }


    removeAt(index) {
        if (index < 0) {
            throw new Error("index must be positive");
        }   else if (index === 0 && this.start) {
            this.start = this.start.next;
        }   else if (!this.start) {
            throw new Error("index out of range");
        }   else {
            let count = 0;
            let current = this.start;
            while (current.next) {
                if (count === index - 1) {
                    current.next = current.next.next;
                    return;
                }
                count += 1;
                current = current.next;
            }
            throw new Error("index out of range");
        }
    }


}




const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");
list.removeAt(4);
list.insertAt("hi", 5);

console.log(list.toString());
