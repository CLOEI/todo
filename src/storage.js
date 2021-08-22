export default class Storage{
    static setItem(name, value) {
        localStorage.setItem(name, value);
    }
    static getItem(name){
        return localStorage.getItem(name);
    }
    static removeItem(name){
        localStorage.removeItem(name);
    }
    static clear(){
        localStorage.clear();
    }
    static getAll(){
        const allTodo = [];
        for(let key of Object.keys(localStorage)){
            allTodo.push(JSON.parse(Storage.getItem(key)))
        }
        return allTodo;
    }
}