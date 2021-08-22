import Storage from './storage.js';

export default class Todo{
    static addTodo(title, description, dueDate, priority, currentProject){
        const todoItems = JSON.parse(Storage.getItem(currentProject));
        const newTodo = Todo.create(title, description, dueDate, priority, todoItems.length + 1, currentProject);
        todoItems.push(newTodo);
        Storage.setItem(currentProject, JSON.stringify(todoItems));
    }
    static create(title, description, dueDate, priority, id, currentProject){
        return {
            title,
            description,
            dueDate,
            priority,
            id,
            currentProject
        }
    }
    static delete(elem){
        const id = elem.dataset.id;
        const currentProject = elem.dataset.project;
        const todo = JSON.parse(Storage.getItem(currentProject));
        const updatedTodo = todo.filter((val) => {
            return val.id != id;
        })
        Storage.setItem(currentProject, JSON.stringify(updatedTodo));
    }
}