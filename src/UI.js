import Storage from './storage.js';
import Todo from './todo.js';

export default class UI {
    static loadUI(){
        UI.toggleMenu()
        UI.toggleMenuItem();
        UI.appendProject();
        UI.addProjectForm();
        UI.addTodoFormListener();
        UI.renderHome(Storage.getAll(), 'Home');
    }

    static toggleMenu(){
        const toggleButton = document.querySelector('.toggle-menu');
        toggleButton.addEventListener('click', () => {
            document.querySelector('.extended-menu').classList.toggle('hidden');
        })
    }
    static toggleMenuItem(){
        const menuHome = document.querySelector('.menu-home');
        const menuToday = document.querySelector('.menu-today');
        const menuWeek = document.querySelector('.menu-week');

        menuHome.addEventListener('click', (e) => {
            UI.toggleActive(e);
            UI.renderHome(Storage.getAll(), e.target.textContent);
        })
        menuToday.addEventListener('click', (e) => {
            UI.toggleActive(e);
        })
        menuWeek.addEventListener('click', (e) => {
            UI.toggleActive(e);
        })
    }
    static addProjectForm(){
        const addProjectBtn = document.querySelector('.menu-add-project');
        addProjectBtn.addEventListener('click', () => {
            const projectFormExist = !!document.querySelector('.menu-add-project-form');
            if(!projectFormExist){
                const projectList = document.querySelector('.extended-menu > ul');
                projectList.append(UI.createProjectForm());
                UI.addProjectFormListener();
            }
        })
    }
    static createProjectForm(){
        const projectForm = document.createElement('form');
        projectForm.classList.add('menu-add-project-form');
        projectForm.innerHTML = `
            <input type="text">
            <button type="submit">Submit</button>
            <button type="button" class="close-project">Close</button>
        `;
        return projectForm;
    }
    static addProjectFormListener(){
        const projectForm = document.querySelector('.extended-menu > ul > form');
        const projectClose = document.querySelector('.close-project');

        projectForm.addEventListener('submit', (e)  => {
            e.preventDefault();
            const projectFormInput = document.querySelector('.extended-menu > ul > form > input');
            if(projectFormInput.value.length > 0){
                const newProject = UI.createProject(projectFormInput.value);
                const projectList = document.querySelector('.extended-menu > ul');
                projectList.appendChild(newProject);
                Storage.setItem(projectFormInput.value, JSON.stringify([]));
                e.target.remove();
            }else{
                alert('Cant add project without a name');
            }
        })
        projectClose.addEventListener('click', (e) => {
            e.target.parentNode.remove();
        })
    }
    static createProject(name){
        const newProject = document.createElement('li');
        const trashIcon = UI.createTrashIcon('hidden');
        newProject.textContent = name;

        newProject.append(trashIcon);
        newProject.addEventListener('click', (e) => {
            UI.toggleActive(e);
            UI.showTodo(e.target.textContent);
        })
        trashIcon.addEventListener('click', (e) => {
            e.currentTarget.parentNode.remove();
            Storage.removeItem(e.currentTarget.parentNode.textContent);
        })

        return newProject;
    }
    static showTodo(currentView){
        const projectContainer = document.querySelector('.project-container');
        projectContainer.innerHTML = '';
        const projectView = document.createElement('h3');
        projectView.classList.add('current-view');
        projectView.textContent = currentView;

        projectContainer.append(projectView);

        for(let key of JSON.parse(Storage.getItem(currentView))){
            const todo = UI.renderTodo(key);
            projectContainer.append(todo);
        }

        const addTodoContainer = document.createElement('div');
        addTodoContainer.classList.add('add-todo-container');
        const addTodoBar = document.createElement('div');
        addTodoBar.classList.add('add-todo-bar');

        addTodoContainer.append(addTodoBar);
        projectContainer.append(addTodoContainer);

        UI.addTodoListener();
    }
    static addTodoListener(){
        const addTodoElem = document.querySelector('.add-todo-container');
        const addTodoFormContainer = document.querySelector('.todo-form-container');
        addTodoElem.addEventListener('click', () => {
            addTodoFormContainer.classList.remove('hidden');
        })
    }
    static addTodoFormListener(){
        const formElement = document.querySelector('.todo-form');
        const closeFormElement = document.querySelector('.todo-form > button[type=button]');
        formElement.addEventListener('submit', (e) => {
            UI.addTodo(e);
            e.target.parentNode.classList.add('hidden');
            const getActive = document.getElementsByClassName('active');
            getActive[0].click();
        })
        closeFormElement.addEventListener('click', (e) => {
           e.target.parentNode.parentNode.classList.add('hidden');
        }) 
    }
    static addTodo(e){
        e.preventDefault();
        const name = document.querySelector('#name');
        const description = document.querySelector('#description');
        const dueDate = document.querySelector('#duedate');
        const priority = document.querySelector('#priority');
        const currentActive = document.getElementsByClassName('active');
        Todo.addTodo(name.value, description.value, dueDate.value, priority.value , currentActive[0].textContent);
        name.value = '';
        description.value = '';
        dueDate.value = '';
        priority.value =  1;
    }
    static toggleActive(e){
        const activeElem = document.getElementsByClassName('active');
        if(activeElem.length > 0){
            activeElem[0].classList.remove('active');
            e.target.classList.add('active');
        }else{
            const home = document.querySelector('.menu-home');
            home.classList.add('active');
            home.click();
        }
    }
    static renderHome(todo, menuName){
        const projectContainer = document.querySelector('.project-container');
        projectContainer.innerHTML = '';
        const projectView = document.createElement('h3');
        projectView.classList.add('current-view');
        projectView.textContent = menuName;

        projectContainer.append(projectView);

        for(let key of todo){
            for(let item of key){
                const todo = UI.renderTodo(item);
                projectContainer.append(todo);
            }
        }
    }
    static renderTodo(todo){
        const newTodoContainer = document.createElement('div');
        newTodoContainer.classList.add('todo-container');
        const newTodo = document.createElement('div');
        newTodo.classList.add('todo');
        newTodo.dataset.priority = todo.priority;
        newTodo.dataset.project = todo.currentProject;
        newTodo.dataset.id = todo.id;
        newTodo.innerHTML = `
            <p class="todo-title">${todo.title}</p>
            <p class="todo-duedate">${todo.dueDate}</p>
            <p class="todo-desc">${todo.description}</p>
        `;

        const option = document.createElement('div');
        option.classList.add('todo-option');

        const trashContainer = document.createElement('div');
        trashContainer.classList.add('option-delete');

        option.addEventListener('click', (e) => {
            Todo.delete(e.currentTarget.parentNode.firstChild);
            const activeElem = document.getElementsByClassName('active');
            activeElem[0].click();
        })

        trashContainer.append(UI.createTrashIcon());
        option.append(trashContainer);

        newTodoContainer.append(newTodo, option);
        return newTodoContainer;
    }
    static appendProject(){
        for(let key of Object.keys(localStorage)){
            const projectList = document.querySelector('.extended-menu > ul');
            const newProject = UI.createProject(key);
            projectList.appendChild(newProject);
        }   
    }
    static createTrashIcon(className){
        const trashSvg = document.createElementNS('http://www.w3.org/2000/svg','svg');
        const trashPath = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'path'
        );
        trashSvg.setAttribute('class', className ? className : '');
        trashSvg.setAttribute('width', '15');
        trashSvg.setAttribute('height', '15');
        trashSvg.setAttribute('viewbox', '0 0 15 15');
        trashSvg.setAttribute('fill', 'none');

        trashPath.setAttribute(
            'd',
            'M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z'
        );
        trashPath.setAttribute('fill', 'currentColor');
        trashPath.setAttribute('fill-rule', 'evenodd');
        trashPath.setAttribute('clip-rule', 'evenodd');

        trashSvg.append(trashPath);

        return trashSvg;
    }
}