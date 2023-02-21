class Counter{
    constructor(){
        this.count = 0;
    };

    addCount(){
        this.count++;
    }

    subCount(){
        this.count--;
    }

    getCount(){
        return this.count;
    }
}

export default Counter;