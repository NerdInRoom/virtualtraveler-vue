const HashMap = function(){
    this.map = new Array();
};

HashMap.prototype = {
    put: function(key, value){
        this.map[key] = value;
    },
    get: function(key){
        return this.map[key];
    },
    getAll: function(){
        return this.map;
    },
    remove: function (key) {
        delete this.map[key];
    },
    clear: function(){
        this.map = new Array();
    },
    keys: function(){
        const keys = new Array();
        for(let i in this.map){
            keys.push(i);
        }
        return keys;
    },
    values : function(){  
        const values = new Array();  
        for(let prop in this.map){  
            values.push(this.map[prop]);
        }  
        return values;
    },
    containsKey: function (key) {
        return key in this.map;
    },
    length: function(){
        return this.map.length;
    }
}

export { HashMap };