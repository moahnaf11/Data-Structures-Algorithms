import { LinkedList } from "./script.mjs";

class Hashmap {
    constructor() {
        this.capacity = 16;
        this.loadfactor = 0.75;
        this.bucket = Array.from({length: this.capacity}, () => new LinkedList());
        this.size = 0;

    }

    hash(key) {
        let hashCode = 0;
      
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
     
        return hashCode % this.capacity;
    }

    set(key, value) {
        const hashIndex = this.hash(key);
        if (hashIndex < 0 || hashIndex >= this.bucket.length) {
            throw new Error("Trying to access index out of bound");
        }
        const linkedList = this.bucket[hashIndex];
        let current = linkedList.start;

        while (current) {
            if (current.key === key) {
                current.value = value;
                return
            }
            current = current.next;
        }
        linkedList.prepend(value, key);
        this.size += 1;

        if (this.size / this.capacity > this.loadfactor) {
            this.resize();
        }
    }

    resize() {
        const oldBuckets = this.bucket;
        this.capacity *= 2;
        this.bucket = Array.from({length: this.capacity}, () => new LinkedList());
        this.size = 0;

        oldBuckets.forEach((linkedList) => {
            let current = linkedList.start;
            while (current) {
                this.set(current.key, current.value);
                current = current.next;
            }

        })
    }

    get(key) {
        let hashIndex = this.hash(key);
        if (hashIndex < 0 || hashIndex >= this.bucket.length) {
            throw new Error("Trying to access index out of bound");
        }
        let linkedList = this.bucket[hashIndex];
        let current = linkedList.start;
        while (current) {
            if (current.key === key) {
                return current.value;
            }
            current = current.next;
        }
        return null;
    }

    has(key) {
        let hashIndex = this.hash(key);
        if (hashIndex < 0 || hashIndex >= this.bucket.length) {
            throw new Error("Trying to access index out of bound");
        }
        let linkedList = this.bucket[hashIndex];
        let current = linkedList.start;

        while (current) {
            if (current.key === key) {
                return true
            }
            current = current.next;
        }
        return false;
    }


    remove(key) {
        let hashIndex = this.hash(key);
        if (hashIndex < 0 || hashIndex >= this.bucket.length) {
            throw new Error("Trying to access index out of bound");
        }
        let linkedList = this.bucket[hashIndex];
        let current = linkedList.start;
        let count = 0;

        if (!current) {
            return false;
        }   else if (current.key === key) {
            linkedList.start = current.next;
            return true;
        }   else {
            while (current.next) {
                if (current.next.key === key) {
                    current.next = current.next.next;
                    this.size -= 1;
                    return true;
                }
                current = current.next;
            }

            return false;
        }
    }

    length() {
        let count = 0;
        this.bucket.forEach((linkedList) => {
            let current = linkedList.start;
            while (current) {
                count += 1;
                current = current.next;
            }
        })
        return count;
        
    }

    clear() {
        this.bucket = Array.from({ length: this.capacity }, () => new LinkedList());
    }

    keys() {
        let array = [];
        this.bucket.forEach((linkedList) => {
            let current = linkedList.start;
            while (current) {
                if (current.key) {
                    array.push(current.key);
                }
                current = current.next;
            }
        })
        return array;
    }

    values() {
        let array = [];
        this.bucket.forEach((linkedList) => {
            let current = linkedList.start;
            while (current) {
                if (current.value) {
                    array.push(current.value);
                }
                current = current.next;
            }
        })
        return array;
    }

    entries() {
        let array = [];
        this.bucket.forEach((linkedList) => {
            let current = linkedList.start;
            while (current) {
                array.push([current.key, current.value]);
                current = current.next;
            }
        })
        return array;
    }
}


const test = new Hashmap();


test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

test.set("lion", "black")
test.set('moon', 'silver')

console.log(test.entries());
console.log(test.capacity);