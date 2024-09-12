import {defaultToString} from "./utils";

class ValuePair<K, V> {
    constructor(public key: K, public value: V) {
    }

    toString() {
        return (`#${this.key}: ${this.value}`)
    }

}

export class Dictionary<K, V> {
    private table: { [key: string]: ValuePair<K, V> }

    constructor(private toStrFn: (key: K) => string = defaultToString) {
        this.table = {};
    }

    hasKey(key: K) {
        return this.table[this.toStrFn(key)] != null;
    }

    set(key: K, value: V) {
        if (key && value) {
            this.table[this.toStrFn(key)] = {key: key, value: value}
            return true;
        }
        return false;
    }

    delete(key: K) {
        if (this.hasKey(key)) {
            delete this.table[this.toStrFn(key)];
            return true
        }
        return false;
    }

    get(key: K) {
        const pair = this.table[this.toStrFn(key)];
        return pair == null ? undefined : pair.value;
    }

    valuePairs() {
        return Object.values(this.table);
    }

    keysOrValue(prop: "key" | "value") {
        return prop === "key" ?
            this.valuePairs().map(pair => pair.key) :
            this.valuePairs().map(pair => pair.value)
    }

    forEach(callback: (key: K, value: V) => any) {
        const pairs = this.valuePairs();
        let result = true
        for (let i of pairs) {
            result = callback(i.key, i.value);
            if (result === false) break
        }
    }

    size() {
        return Object.keys(this.table).length;
    }

    isEmpty() {
        return this.size() === 0;
    }

    clear() {
        this.table = {};
        return true;
    }

    toString() {
        if (this.isEmpty()) {
            return ''
        }
        const pairs = this.valuePairs();
        let buff = pairs.toString();
        for (let i = 1; i < pairs.length; i++) {
            buff = `${buff}, ${pairs[i].toString()}`
        }
        return buff
    }
}

// const emailDictionary = new Dictionary();
// emailDictionary.set("Gandalf", "hobbitmaster23@outlook.com");
// emailDictionary.set("John", "theBasterd@outlook.com");
// emailDictionary.set("Tyrion", "littlebigman43@outlook.com");
// console.log(emailDictionary.hasKey("Gandalf"))
// console.log(emailDictionary.size());
// console.log(emailDictionary.keysOrValue("key"))
// console.log(emailDictionary.keysOrValue("value"))
// console.log(emailDictionary.get("Tyrion"))
// emailDictionary.delete("John")
// console.log(emailDictionary.keysOrValue("key"))
// console.log(emailDictionary.keysOrValue("value"))
// emailDictionary.forEach((key, value) => console.log('Key: ', key, " Value: ", value ))

class HashTable<K, V> {
    private table: { [key: string]: ValuePair<K, V> }

    constructor(private toStrFn: (value: K) => string = defaultToString) {
        this.table = {}
    }

    loseLoseHash(key: K) {
        if (typeof key == "number") return key;
        let hash = 0;
        let chars = this.toStrFn(key);
        for (let i = 0; i < chars.length; i++) {
            hash += chars.charCodeAt(i);
        }
        return hash % 37;
    }

    hash(key: K) {
        return this.loseLoseHash(key);
    }

    put(key: K, value: V) {
        if (!key || !value) {
            return false;
        } else {
            const hash = this.hash(key);
            if(this.table[hash] == null){
                this.table[hash] = new ValuePair(key, value);
            } else {
                let index = hash + 1;
                while(this.table[index] != null){
                    index++
                }
                this.table[index] = new ValuePair(key, value);
            }
            return true
        }
    }

    get(key: K) {
        const pos = this.hash(key);
        if(this.table[pos]){
            if(this.table[pos].key == key){
                return this.table[pos].value;
            }
            let index = pos + 1;
            while (this.table[index] != null && this.table[index].key != key){
                index++
            }
            if(this.table[index] != null && this.table[index].key == key){
                return this.table[index].value
            }
        }
        return undefined;
    }

    remove(key: K) {
        const hash = this.hash(key)
       if(this.table[hash] != null){
           if(this.table[hash].key === key){
                delete this.table[hash]
               this.verify(key, hash);
                return true;
           }
           let index = hash + 1;
           while (this.table[index] != null && this.table[index].key !== key){
               index++
           }
           if(this.table[index] != null && this.table[index].key === key){
               delete this.table[index]
               this.verify(key, index);
               return true;
           }
       }
       return false;
    }

    djb2(key: K){
        const keyString = this.toStrFn(key)
        let hash = 5381
        for(let i = 0; i < keyString.length; i++ ){
            hash = (hash * 33) + keyString.charCodeAt(i)
        }
        return hash % 1013;
    }

    verify(key: K, removedPos: number){
        const hash = this.hash(key); //original
        let index = removedPos + 1; // next element
        while(this.table[index] != null ){
            const currentPos = this.hash(this.table[index].key);
            if(currentPos <= hash || currentPos <= removedPos){
                this.table[removedPos] = this.table[index];
                delete this.table[index]
                removedPos = index
            }
            index++
        }
    }
}


const hashTable = new HashTable();
hashTable.put('Gandalf', 'hobbitShperd@outlook.com')
hashTable.put('John', 'theHeir21@outlook.com')
hashTable.put('Tyrion', 'bigShadow23@outlook.com')
console.log(`${hashTable.hash('Gandalf')} - Gandalf`)
console.log(`${hashTable.hash('John')} - John`)
console.log(`${hashTable.hash('Tyrion')} - Tyrion`)

console.log(hashTable.get('Gandalf'))
console.log(hashTable.get('Loid'))
hashTable.remove('Gandalf')
console.log(hashTable.get('Gandalf'))