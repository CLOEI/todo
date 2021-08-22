/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/UI.js":
/*!*******************!*\
  !*** ./src/UI.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UI)
/* harmony export */ });
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage.js */ "./src/storage.js");
/* harmony import */ var _todo_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todo.js */ "./src/todo.js");



class UI {
    static loadUI(){
        UI.toggleMenu()
        UI.toggleMenuItem();
        UI.appendProject();
        UI.addProjectForm();
        UI.addTodoFormListener();
        UI.renderHome(_storage_js__WEBPACK_IMPORTED_MODULE_0__.default.getAll(), 'Home');
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
            UI.renderHome(_storage_js__WEBPACK_IMPORTED_MODULE_0__.default.getAll(), e.target.textContent);
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
                _storage_js__WEBPACK_IMPORTED_MODULE_0__.default.setItem(projectFormInput.value, JSON.stringify([]));
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
            _storage_js__WEBPACK_IMPORTED_MODULE_0__.default.removeItem(e.currentTarget.parentNode.textContent);
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

        for(let key of JSON.parse(_storage_js__WEBPACK_IMPORTED_MODULE_0__.default.getItem(currentView))){
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
        _todo_js__WEBPACK_IMPORTED_MODULE_1__.default.addTodo(name.value, description.value, dueDate.value, priority.value , currentActive[0].textContent);
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
            _todo_js__WEBPACK_IMPORTED_MODULE_1__.default.delete(e.currentTarget.parentNode.firstChild);
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

/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Storage)
/* harmony export */ });
class Storage{
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

/***/ }),

/***/ "./src/todo.js":
/*!*********************!*\
  !*** ./src/todo.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Todo)
/* harmony export */ });
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage.js */ "./src/storage.js");


class Todo{
    static addTodo(title, description, dueDate, priority, currentProject){
        const todoItems = JSON.parse(_storage_js__WEBPACK_IMPORTED_MODULE_0__.default.getItem(currentProject));
        const newTodo = Todo.create(title, description, dueDate, priority, todoItems.length + 1, currentProject);
        todoItems.push(newTodo);
        _storage_js__WEBPACK_IMPORTED_MODULE_0__.default.setItem(currentProject, JSON.stringify(todoItems));
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
        const todo = JSON.parse(_storage_js__WEBPACK_IMPORTED_MODULE_0__.default.getItem(currentProject));
        const updatedTodo = todo.filter((val) => {
            return val.id != id;
        })
        _storage_js__WEBPACK_IMPORTED_MODULE_0__.default.setItem(currentProject, JSON.stringify(updatedTodo));
    }
}

/***/ }),

/***/ "../../node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./sass/style.scss":
/*!**********************************************************************************************************!*\
  !*** ../../node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./sass/style.scss ***!
  \**********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "../../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "header {\n  display: flex;\n  height: 60px;\n  background-color: #d0b49f;\n  color: #f6f2f0;\n  align-items: center; }\n  header h1 {\n    margin-left: 0.5rem; }\n  header .toggle-menu {\n    position: relative;\n    width: 2rem;\n    height: 2rem;\n    margin: 0 0.5rem 0 auto;\n    cursor: pointer; }\n    header .toggle-menu .menu-bar {\n      position: absolute;\n      width: 2rem;\n      height: 0.4rem;\n      top: 50%;\n      transform: translateY(-50%);\n      border-radius: 1px;\n      background-color: #f1e7dd; }\n      header .toggle-menu .menu-bar::before {\n        content: \"\";\n        position: absolute;\n        width: 2rem;\n        height: 0.4rem;\n        transform: translateY(-150%);\n        background-color: #f1e7dd;\n        border-radius: 1px; }\n      header .toggle-menu .menu-bar::after {\n        content: \"\";\n        position: absolute;\n        width: 2rem;\n        height: 0.4rem;\n        transform: translateY(150%);\n        background-color: #f1e7dd;\n        border-radius: 1px; }\n\nmain {\n  display: flex;\n  flex-direction: column;\n  color: #011627; }\n  main .extended-menu {\n    background-color: #e7d1c9;\n    width: 100%; }\n    main .extended-menu p {\n      font-size: 1.2rem;\n      padding: 0.5rem;\n      margin: 0 1rem;\n      border-radius: 4px;\n      cursor: pointer; }\n      main .extended-menu p:hover {\n        background-color: #f3e7e4; }\n    main .extended-menu p:nth-child(1) {\n      margin-top: 0.5rem; }\n    main .extended-menu p:nth-last-child(1) {\n      margin-bottom: 0.5rem; }\n    main .extended-menu h2 {\n      margin: 1rem 0 1rem 1rem; }\n    main .extended-menu ul {\n      list-style-type: none; }\n      main .extended-menu ul li {\n        display: flex;\n        padding: 0.5rem;\n        margin: 0 1rem;\n        border-radius: 4px;\n        cursor: pointer; }\n        main .extended-menu ul li:hover {\n          background-color: #f3e7e4; }\n          main .extended-menu ul li:hover svg {\n            display: block; }\n        main .extended-menu ul li svg {\n          display: hidden;\n          margin-left: auto;\n          transform: translateY(15%); }\n      main .extended-menu ul form {\n        margin: 0 1rem; }\n        main .extended-menu ul form input[type=\"text\"] {\n          display: block;\n          width: 100%;\n          max-width: 10rem;\n          margin-bottom: 0.5rem; }\n  main .project-container h3 {\n    margin: 1rem 0.5rem; }\n  main .project-container .todo-container {\n    width: 90%;\n    margin: 0 auto 0.5rem auto;\n    display: flex; }\n    main .project-container .todo-container .todo {\n      width: 100%;\n      background-color: #e7d1c9;\n      word-break: break-all; }\n      main .project-container .todo-container .todo .todo-title {\n        font-size: 20px; }\n      main .project-container .todo-container .todo .todo-desc {\n        background-color: #f3e7e4;\n        max-height: 18px;\n        overflow-y: hidden; }\n        main .project-container .todo-container .todo .todo-desc:hover {\n          max-height: max-content;\n          overflow-y: visible; }\n    main .project-container .todo-container .todo-option {\n      display: none;\n      align-items: center;\n      justify-content: center;\n      width: 3rem;\n      background-color: #e7d1c9;\n      cursor: pointer; }\n    main .project-container .todo-container:hover .todo-option {\n      display: grid; }\n  main .project-container .add-todo-container {\n    position: relative;\n    width: 95%;\n    margin: 1rem auto;\n    height: 2rem;\n    background-color: #e7d1c9;\n    cursor: pointer; }\n    main .project-container .add-todo-container .add-todo-bar {\n      position: absolute;\n      width: 0.5rem;\n      height: 1.5rem;\n      background-color: #f3e7e4;\n      top: 50%;\n      right: 50%;\n      transform: translate(50%, -50%); }\n      main .project-container .add-todo-container .add-todo-bar::after {\n        position: absolute;\n        content: \"\";\n        width: 0.5rem;\n        height: 1.5rem;\n        background-color: #f3e7e4;\n        transform: rotate(90deg); }\n\n@media only screen and (min-width: 768px) {\n  main {\n    display: flex;\n    flex-direction: row;\n    height: calc(100vh - 60px); }\n    main .extended-menu {\n      width: 25vw;\n      overflow-y: auto; }\n    main .project-container {\n      width: 100%;\n      overflow-y: auto; } }\n\n.todo-form-container {\n  position: absolute;\n  display: grid;\n  place-items: center;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  backdrop-filter: blur(3px); }\n  .todo-form-container .todo-form {\n    display: grid;\n    justify-content: center;\n    grid-gap: 5px;\n    width: 90%;\n    max-width: 300px;\n    background-color: #d0b49f;\n    padding: 1rem 0;\n    border-radius: 2px; }\n    .todo-form-container .todo-form input {\n      width: 100%; }\n\n@media only screen and (min-width: 768px) {\n  .todo-form-container .todo-form {\n    grid-template-columns: max-content max-content; } }\n\n* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box; }\n\n.active {\n  background-color: #f3e7e4 !important;\n  font-weight: bold; }\n\n.hidden {\n  display: none; }\n", "",{"version":3,"sources":["webpack://./sass/header.scss","webpack://./sass/main.scss","webpack://./sass/todo.scss","webpack://./sass/style.scss"],"names":[],"mappings":"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","sourcesContent":["$background-color: #d0b49f;\n$background-color2: #f1e7dd;\n$text-color: #f6f2f0;\n\nheader{\n    display: flex;\n    height: 60px;\n    background-color: $background-color;\n    color: $text-color;\n    align-items: center;\n    h1{\n        margin-left: 0.5rem;\n    }\n    .toggle-menu{\n        position: relative;\n        width: 2rem;\n        height: 2rem;\n        margin: 0 0.5rem 0 auto;\n        cursor: pointer;\n        .menu-bar{\n            position: absolute;\n            width: 2rem;\n            height: 0.4rem;\n            top: 50%;\n            transform: translateY(-50%);\n            border-radius: 1px;\n            background-color: $background-color2;\n            &::before{\n                content: \"\";\n                position: absolute;\n                width: 2rem;\n                height: 0.4rem;\n                transform: translateY(-150%);\n                background-color: $background-color2;\n                border-radius: 1px;\n            }\n            &::after{\n                content: \"\";\n                position: absolute;\n                width: 2rem;\n                height: 0.4rem;\n                transform: translateY(150%);\n                background-color: $background-color2;\n                border-radius: 1px;\n            }\n        }\n    }\n}","$background-color3: #e7d1c9;\n$background-color4: #f3e7e4;\n$text-color: #011627;\n\nmain{\n    display: flex;\n    flex-direction: column;\n    color: $text-color;\n    .extended-menu{\n        background-color: $background-color3;\n        width: 100%;\n        p{\n            font-size: 1.2rem;\n            padding: 0.5rem;\n            margin: 0 1rem;\n            border-radius: 4px;\n            cursor: pointer;\n            &:hover{\n                background-color: $background-color4;\n            }\n        }\n        p:nth-child(1){\n            margin-top: 0.5rem;\n        }\n        p:nth-last-child(1){\n            margin-bottom: 0.5rem;\n        }\n        h2{\n            margin: 1rem 0 1rem 1rem;\n        }\n        ul{\n            list-style-type: none;\n            li{\n                display: flex;\n                padding: 0.5rem;\n                margin: 0 1rem;\n                border-radius: 4px;\n                cursor: pointer;\n                &:hover{\n                    background-color: $background-color4;\n                    svg{\n                        display: block;\n                    }\n                }\n                svg{\n                    display: hidden;\n                    margin-left: auto;\n                    transform: translateY(15%);\n                }\n            }\n            form{\n                margin: 0 1rem;\n                input[type=\"text\"] {\n                    display: block;\n                    width: 100%;\n                    max-width: 10rem;\n                    margin-bottom: 0.5rem;\n                }\n            }\n        }\n    }\n    .project-container{\n        h3{\n            margin: 1rem 0.5rem\n        }\n        .todo-container{\n            width: 90%;\n            margin: 0 auto 0.5rem auto;\n            display: flex;\n            .todo{\n                width: 100%;\n                background-color: $background-color3;\n                word-break: break-all;\n                .todo-title{\n                    font-size: 20px;\n                }\n                .todo-desc{\n                    background-color: $background-color4;\n                    max-height: 18px;\n                    overflow-y: hidden;\n                    &:hover{\n                        max-height: max-content;\n                        overflow-y: visible;\n                    }\n                }\n            }\n            .todo-option{\n                display: none;\n                align-items: center;\n                justify-content: center;\n                width: 3rem;\n                background-color: $background-color3;\n                cursor: pointer;\n            }\n            &:hover .todo-option{\n                display: grid;\n            }\n        }\n        .add-todo-container{\n            position: relative;\n            width: 95%;\n            margin: 1rem auto;\n            height: 2rem;\n            background-color: $background-color3;\n            cursor: pointer;\n            .add-todo-bar{\n                position: absolute;\n                width: 0.5rem;\n                height: 1.5rem;\n                background-color: $background-color4;\n                top: 50%;\n                right: 50%;\n                transform: translate(50%, -50%);\n                &::after{\n                    position: absolute;\n                    content: \"\";\n                    width: 0.5rem;\n                    height: 1.5rem;\n                    background-color: $background-color4;\n                    transform: rotate(90deg);\n                }\n            }\n        }\n    }\n}\n\n@media only screen and(min-width:768px) {\n    main{\n        display: flex;\n        flex-direction: row;\n        height: calc(100vh - 60px);\n        .extended-menu{\n            width: 25vw;\n            overflow-y: auto;\n        }\n        .project-container{\n            width: 100%;\n            overflow-y: auto;\n        }\n    }\n}","$background-color: #d0b49f;\n$background-color2: #f1e7dd;\n$text-color: #011627;\n\n.todo-form-container{\n    position: absolute;\n    display: grid;\n    place-items: center;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    backdrop-filter: blur(3px);\n    .todo-form{\n        display:grid;\n        justify-content: center;\n        grid-gap:5px;\n        width: 90%;\n        max-width: 300px;\n        background-color: $background-color;\n        padding: 1rem 0;\n        border-radius: 2px;\n        input{\n            width: 100%;\n        }\n    }\n}\n\n@media only screen and(min-width:768px) {\n    .todo-form-container .todo-form{\n        grid-template-columns: max-content max-content;\n    }\n}","@import \"header.scss\";\n@import \"main.scss\";\n@import \"todo.scss\";\n\n*{\n    padding: 0;\n    margin: 0;\n    box-sizing: border-box;\n}\n\n.active{\n    background-color: #f3e7e4 !important;\n    font-weight: bold;\n}\n\n.hidden{\n    display: none;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../../node_modules/css-loader/dist/runtime/api.js":
/*!*********************************************************!*\
  !*** ../../node_modules/css-loader/dist/runtime/api.js ***!
  \*********************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
/*!****************************************************************************!*\
  !*** ../../node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \****************************************************************************/
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./sass/style.scss":
/*!*************************!*\
  !*** ./sass/style.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../../node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "../../node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../../node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../../node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./style.scss */ "../../node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./sass/style.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__.default, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__.default && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__.default.locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__.default.locals : undefined);


/***/ }),

/***/ "../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!********************************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \********************************************************************************/
/***/ ((module) => {



var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "../../node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!************************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \************************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "../../node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**************************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var style = document.createElement("style");
  options.setAttributes(style, options.attributes);
  options.insert(style);
  return style;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**************************************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(style) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    style.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "../../node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \*******************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute("media", media);
  } else {
    style.removeAttribute("media");
  }

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, style);
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


function domAPI(options) {
  var style = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(style, options, obj);
    },
    remove: function remove() {
      removeStyleElement(style);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "../../node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*************************************************************************!*\
  !*** ../../node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*************************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, style) {
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sass_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sass/style.scss */ "./sass/style.scss");
/* harmony import */ var _UI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UI.js */ "./src/UI.js");



document.addEventListener('DOMContentLoaded', _UI_js__WEBPACK_IMPORTED_MODULE_1__.default.loadUI);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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by1kby8uL3NyYy9VSS5qcyIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9zdG9yYWdlLmpzIiwid2VicGFjazovL3RvLWRvLy4vc3JjL3RvZG8uanMiLCJ3ZWJwYWNrOi8vdG8tZG8vLi9zYXNzL3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vdG8tZG8vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly90by1kby8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvY3NzV2l0aE1hcHBpbmdUb1N0cmluZy5qcyIsIndlYnBhY2s6Ly90by1kby8uL3Nhc3Mvc3R5bGUuc2Nzcz8zNjUxIiwid2VicGFjazovL3RvLWRvLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly90by1kby8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3RvLWRvLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly90by1kby8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vdG8tZG8vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3RvcmFnZSBmcm9tICcuL3N0b3JhZ2UuanMnO1xuaW1wb3J0IFRvZG8gZnJvbSAnLi90b2RvLmpzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUkge1xuICAgIHN0YXRpYyBsb2FkVUkoKXtcbiAgICAgICAgVUkudG9nZ2xlTWVudSgpXG4gICAgICAgIFVJLnRvZ2dsZU1lbnVJdGVtKCk7XG4gICAgICAgIFVJLmFwcGVuZFByb2plY3QoKTtcbiAgICAgICAgVUkuYWRkUHJvamVjdEZvcm0oKTtcbiAgICAgICAgVUkuYWRkVG9kb0Zvcm1MaXN0ZW5lcigpO1xuICAgICAgICBVSS5yZW5kZXJIb21lKFN0b3JhZ2UuZ2V0QWxsKCksICdIb21lJyk7XG4gICAgfVxuXG4gICAgc3RhdGljIHRvZ2dsZU1lbnUoKXtcbiAgICAgICAgY29uc3QgdG9nZ2xlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZ2dsZS1tZW51Jyk7XG4gICAgICAgIHRvZ2dsZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5leHRlbmRlZC1tZW51JykuY2xhc3NMaXN0LnRvZ2dsZSgnaGlkZGVuJyk7XG4gICAgICAgIH0pXG4gICAgfVxuICAgIHN0YXRpYyB0b2dnbGVNZW51SXRlbSgpe1xuICAgICAgICBjb25zdCBtZW51SG9tZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51LWhvbWUnKTtcbiAgICAgICAgY29uc3QgbWVudVRvZGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUtdG9kYXknKTtcbiAgICAgICAgY29uc3QgbWVudVdlZWsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudS13ZWVrJyk7XG5cbiAgICAgICAgbWVudUhvbWUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgVUkudG9nZ2xlQWN0aXZlKGUpO1xuICAgICAgICAgICAgVUkucmVuZGVySG9tZShTdG9yYWdlLmdldEFsbCgpLCBlLnRhcmdldC50ZXh0Q29udGVudCk7XG4gICAgICAgIH0pXG4gICAgICAgIG1lbnVUb2RheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICBVSS50b2dnbGVBY3RpdmUoZSk7XG4gICAgICAgIH0pXG4gICAgICAgIG1lbnVXZWVrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIFVJLnRvZ2dsZUFjdGl2ZShlKTtcbiAgICAgICAgfSlcbiAgICB9XG4gICAgc3RhdGljIGFkZFByb2plY3RGb3JtKCl7XG4gICAgICAgIGNvbnN0IGFkZFByb2plY3RCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudS1hZGQtcHJvamVjdCcpO1xuICAgICAgICBhZGRQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdEZvcm1FeGlzdCA9ICEhZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUtYWRkLXByb2plY3QtZm9ybScpO1xuICAgICAgICAgICAgaWYoIXByb2plY3RGb3JtRXhpc3Qpe1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmV4dGVuZGVkLW1lbnUgPiB1bCcpO1xuICAgICAgICAgICAgICAgIHByb2plY3RMaXN0LmFwcGVuZChVSS5jcmVhdGVQcm9qZWN0Rm9ybSgpKTtcbiAgICAgICAgICAgICAgICBVSS5hZGRQcm9qZWN0Rm9ybUxpc3RlbmVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuICAgIHN0YXRpYyBjcmVhdGVQcm9qZWN0Rm9ybSgpe1xuICAgICAgICBjb25zdCBwcm9qZWN0Rm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICAgICAgcHJvamVjdEZvcm0uY2xhc3NMaXN0LmFkZCgnbWVudS1hZGQtcHJvamVjdC1mb3JtJyk7XG4gICAgICAgIHByb2plY3RGb3JtLmlubmVySFRNTCA9IGBcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+U3VibWl0PC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlLXByb2plY3RcIj5DbG9zZTwvYnV0dG9uPlxuICAgICAgICBgO1xuICAgICAgICByZXR1cm4gcHJvamVjdEZvcm07XG4gICAgfVxuICAgIHN0YXRpYyBhZGRQcm9qZWN0Rm9ybUxpc3RlbmVyKCl7XG4gICAgICAgIGNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmV4dGVuZGVkLW1lbnUgPiB1bCA+IGZvcm0nKTtcbiAgICAgICAgY29uc3QgcHJvamVjdENsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsb3NlLXByb2plY3QnKTtcblxuICAgICAgICBwcm9qZWN0Rm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RGb3JtSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZXh0ZW5kZWQtbWVudSA+IHVsID4gZm9ybSA+IGlucHV0Jyk7XG4gICAgICAgICAgICBpZihwcm9qZWN0Rm9ybUlucHV0LnZhbHVlLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1Byb2plY3QgPSBVSS5jcmVhdGVQcm9qZWN0KHByb2plY3RGb3JtSW5wdXQudmFsdWUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmV4dGVuZGVkLW1lbnUgPiB1bCcpO1xuICAgICAgICAgICAgICAgIHByb2plY3RMaXN0LmFwcGVuZENoaWxkKG5ld1Byb2plY3QpO1xuICAgICAgICAgICAgICAgIFN0b3JhZ2Uuc2V0SXRlbShwcm9qZWN0Rm9ybUlucHV0LnZhbHVlLCBKU09OLnN0cmluZ2lmeShbXSkpO1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LnJlbW92ZSgpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgYWxlcnQoJ0NhbnQgYWRkIHByb2plY3Qgd2l0aG91dCBhIG5hbWUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgcHJvamVjdENsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgIGUudGFyZ2V0LnBhcmVudE5vZGUucmVtb3ZlKCk7XG4gICAgICAgIH0pXG4gICAgfVxuICAgIHN0YXRpYyBjcmVhdGVQcm9qZWN0KG5hbWUpe1xuICAgICAgICBjb25zdCBuZXdQcm9qZWN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgY29uc3QgdHJhc2hJY29uID0gVUkuY3JlYXRlVHJhc2hJY29uKCdoaWRkZW4nKTtcbiAgICAgICAgbmV3UHJvamVjdC50ZXh0Q29udGVudCA9IG5hbWU7XG5cbiAgICAgICAgbmV3UHJvamVjdC5hcHBlbmQodHJhc2hJY29uKTtcbiAgICAgICAgbmV3UHJvamVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICBVSS50b2dnbGVBY3RpdmUoZSk7XG4gICAgICAgICAgICBVSS5zaG93VG9kbyhlLnRhcmdldC50ZXh0Q29udGVudCk7XG4gICAgICAgIH0pXG4gICAgICAgIHRyYXNoSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZS5yZW1vdmUoKTtcbiAgICAgICAgICAgIFN0b3JhZ2UucmVtb3ZlSXRlbShlLmN1cnJlbnRUYXJnZXQucGFyZW50Tm9kZS50ZXh0Q29udGVudCk7XG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIG5ld1Byb2plY3Q7XG4gICAgfVxuICAgIHN0YXRpYyBzaG93VG9kbyhjdXJyZW50Vmlldyl7XG4gICAgICAgIGNvbnN0IHByb2plY3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1jb250YWluZXInKTtcbiAgICAgICAgcHJvamVjdENvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgY29uc3QgcHJvamVjdFZpZXcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgICAgICBwcm9qZWN0Vmlldy5jbGFzc0xpc3QuYWRkKCdjdXJyZW50LXZpZXcnKTtcbiAgICAgICAgcHJvamVjdFZpZXcudGV4dENvbnRlbnQgPSBjdXJyZW50VmlldztcblxuICAgICAgICBwcm9qZWN0Q29udGFpbmVyLmFwcGVuZChwcm9qZWN0Vmlldyk7XG5cbiAgICAgICAgZm9yKGxldCBrZXkgb2YgSlNPTi5wYXJzZShTdG9yYWdlLmdldEl0ZW0oY3VycmVudFZpZXcpKSl7XG4gICAgICAgICAgICBjb25zdCB0b2RvID0gVUkucmVuZGVyVG9kbyhrZXkpO1xuICAgICAgICAgICAgcHJvamVjdENvbnRhaW5lci5hcHBlbmQodG9kbyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBhZGRUb2RvQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGFkZFRvZG9Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnYWRkLXRvZG8tY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IGFkZFRvZG9CYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYWRkVG9kb0Jhci5jbGFzc0xpc3QuYWRkKCdhZGQtdG9kby1iYXInKTtcblxuICAgICAgICBhZGRUb2RvQ29udGFpbmVyLmFwcGVuZChhZGRUb2RvQmFyKTtcbiAgICAgICAgcHJvamVjdENvbnRhaW5lci5hcHBlbmQoYWRkVG9kb0NvbnRhaW5lcik7XG5cbiAgICAgICAgVUkuYWRkVG9kb0xpc3RlbmVyKCk7XG4gICAgfVxuICAgIHN0YXRpYyBhZGRUb2RvTGlzdGVuZXIoKXtcbiAgICAgICAgY29uc3QgYWRkVG9kb0VsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXRvZG8tY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IGFkZFRvZG9Gb3JtQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tZm9ybS1jb250YWluZXInKTtcbiAgICAgICAgYWRkVG9kb0VsZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBhZGRUb2RvRm9ybUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICAgICAgfSlcbiAgICB9XG4gICAgc3RhdGljIGFkZFRvZG9Gb3JtTGlzdGVuZXIoKXtcbiAgICAgICAgY29uc3QgZm9ybUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1mb3JtJyk7XG4gICAgICAgIGNvbnN0IGNsb3NlRm9ybUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9kby1mb3JtID4gYnV0dG9uW3R5cGU9YnV0dG9uXScpO1xuICAgICAgICBmb3JtRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICAgICAgICAgICAgVUkuYWRkVG9kbyhlKTtcbiAgICAgICAgICAgIGUudGFyZ2V0LnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICAgICAgICBjb25zdCBnZXRBY3RpdmUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIGdldEFjdGl2ZVswXS5jbGljaygpO1xuICAgICAgICB9KVxuICAgICAgICBjbG9zZUZvcm1FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgZS50YXJnZXQucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgICAgICB9KSBcbiAgICB9XG4gICAgc3RhdGljIGFkZFRvZG8oZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc3QgbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuYW1lJyk7XG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rlc2NyaXB0aW9uJyk7XG4gICAgICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZHVlZGF0ZScpO1xuICAgICAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcmlvcml0eScpO1xuICAgICAgICBjb25zdCBjdXJyZW50QWN0aXZlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYWN0aXZlJyk7XG4gICAgICAgIFRvZG8uYWRkVG9kbyhuYW1lLnZhbHVlLCBkZXNjcmlwdGlvbi52YWx1ZSwgZHVlRGF0ZS52YWx1ZSwgcHJpb3JpdHkudmFsdWUgLCBjdXJyZW50QWN0aXZlWzBdLnRleHRDb250ZW50KTtcbiAgICAgICAgbmFtZS52YWx1ZSA9ICcnO1xuICAgICAgICBkZXNjcmlwdGlvbi52YWx1ZSA9ICcnO1xuICAgICAgICBkdWVEYXRlLnZhbHVlID0gJyc7XG4gICAgICAgIHByaW9yaXR5LnZhbHVlID0gIDE7XG4gICAgfVxuICAgIHN0YXRpYyB0b2dnbGVBY3RpdmUoZSl7XG4gICAgICAgIGNvbnN0IGFjdGl2ZUVsZW0gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhY3RpdmUnKTtcbiAgICAgICAgaWYoYWN0aXZlRWxlbS5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIGFjdGl2ZUVsZW1bMF0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBjb25zdCBob21lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUtaG9tZScpO1xuICAgICAgICAgICAgaG9tZS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIGhvbWUuY2xpY2soKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgcmVuZGVySG9tZSh0b2RvLCBtZW51TmFtZSl7XG4gICAgICAgIGNvbnN0IHByb2plY3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1jb250YWluZXInKTtcbiAgICAgICAgcHJvamVjdENvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgY29uc3QgcHJvamVjdFZpZXcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpO1xuICAgICAgICBwcm9qZWN0Vmlldy5jbGFzc0xpc3QuYWRkKCdjdXJyZW50LXZpZXcnKTtcbiAgICAgICAgcHJvamVjdFZpZXcudGV4dENvbnRlbnQgPSBtZW51TmFtZTtcblxuICAgICAgICBwcm9qZWN0Q29udGFpbmVyLmFwcGVuZChwcm9qZWN0Vmlldyk7XG5cbiAgICAgICAgZm9yKGxldCBrZXkgb2YgdG9kbyl7XG4gICAgICAgICAgICBmb3IobGV0IGl0ZW0gb2Yga2V5KXtcbiAgICAgICAgICAgICAgICBjb25zdCB0b2RvID0gVUkucmVuZGVyVG9kbyhpdGVtKTtcbiAgICAgICAgICAgICAgICBwcm9qZWN0Q29udGFpbmVyLmFwcGVuZCh0b2RvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgcmVuZGVyVG9kbyh0b2RvKXtcbiAgICAgICAgY29uc3QgbmV3VG9kb0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBuZXdUb2RvQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3RvZG8tY29udGFpbmVyJyk7XG4gICAgICAgIGNvbnN0IG5ld1RvZG8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbmV3VG9kby5jbGFzc0xpc3QuYWRkKCd0b2RvJyk7XG4gICAgICAgIG5ld1RvZG8uZGF0YXNldC5wcmlvcml0eSA9IHRvZG8ucHJpb3JpdHk7XG4gICAgICAgIG5ld1RvZG8uZGF0YXNldC5wcm9qZWN0ID0gdG9kby5jdXJyZW50UHJvamVjdDtcbiAgICAgICAgbmV3VG9kby5kYXRhc2V0LmlkID0gdG9kby5pZDtcbiAgICAgICAgbmV3VG9kby5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8cCBjbGFzcz1cInRvZG8tdGl0bGVcIj4ke3RvZG8udGl0bGV9PC9wPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJ0b2RvLWR1ZWRhdGVcIj4ke3RvZG8uZHVlRGF0ZX08L3A+XG4gICAgICAgICAgICA8cCBjbGFzcz1cInRvZG8tZGVzY1wiPiR7dG9kby5kZXNjcmlwdGlvbn08L3A+XG4gICAgICAgIGA7XG5cbiAgICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG9wdGlvbi5jbGFzc0xpc3QuYWRkKCd0b2RvLW9wdGlvbicpO1xuXG4gICAgICAgIGNvbnN0IHRyYXNoQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRyYXNoQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ29wdGlvbi1kZWxldGUnKTtcblxuICAgICAgICBvcHRpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgVG9kby5kZWxldGUoZS5jdXJyZW50VGFyZ2V0LnBhcmVudE5vZGUuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgICBjb25zdCBhY3RpdmVFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICBhY3RpdmVFbGVtWzBdLmNsaWNrKCk7XG4gICAgICAgIH0pXG5cbiAgICAgICAgdHJhc2hDb250YWluZXIuYXBwZW5kKFVJLmNyZWF0ZVRyYXNoSWNvbigpKTtcbiAgICAgICAgb3B0aW9uLmFwcGVuZCh0cmFzaENvbnRhaW5lcik7XG5cbiAgICAgICAgbmV3VG9kb0NvbnRhaW5lci5hcHBlbmQobmV3VG9kbywgb3B0aW9uKTtcbiAgICAgICAgcmV0dXJuIG5ld1RvZG9Db250YWluZXI7XG4gICAgfVxuICAgIHN0YXRpYyBhcHBlbmRQcm9qZWN0KCl7XG4gICAgICAgIGZvcihsZXQga2V5IG9mIE9iamVjdC5rZXlzKGxvY2FsU3RvcmFnZSkpe1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZXh0ZW5kZWQtbWVudSA+IHVsJyk7XG4gICAgICAgICAgICBjb25zdCBuZXdQcm9qZWN0ID0gVUkuY3JlYXRlUHJvamVjdChrZXkpO1xuICAgICAgICAgICAgcHJvamVjdExpc3QuYXBwZW5kQ2hpbGQobmV3UHJvamVjdCk7XG4gICAgICAgIH0gICBcbiAgICB9XG4gICAgc3RhdGljIGNyZWF0ZVRyYXNoSWNvbihjbGFzc05hbWUpe1xuICAgICAgICBjb25zdCB0cmFzaFN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCdzdmcnKTtcbiAgICAgICAgY29uc3QgdHJhc2hQYXRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKFxuICAgICAgICAgICAgJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICdwYXRoJ1xuICAgICAgICApO1xuICAgICAgICB0cmFzaFN2Zy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgY2xhc3NOYW1lID8gY2xhc3NOYW1lIDogJycpO1xuICAgICAgICB0cmFzaFN2Zy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzE1Jyk7XG4gICAgICAgIHRyYXNoU3ZnLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgJzE1Jyk7XG4gICAgICAgIHRyYXNoU3ZnLnNldEF0dHJpYnV0ZSgndmlld2JveCcsICcwIDAgMTUgMTUnKTtcbiAgICAgICAgdHJhc2hTdmcuc2V0QXR0cmlidXRlKCdmaWxsJywgJ25vbmUnKTtcblxuICAgICAgICB0cmFzaFBhdGguc2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgJ2QnLFxuICAgICAgICAgICAgJ001LjUgMUM1LjIyMzg2IDEgNSAxLjIyMzg2IDUgMS41QzUgMS43NzYxNCA1LjIyMzg2IDIgNS41IDJIOS41QzkuNzc2MTQgMiAxMCAxLjc3NjE0IDEwIDEuNUMxMCAxLjIyMzg2IDkuNzc2MTQgMSA5LjUgMUg1LjVaTTMgMy41QzMgMy4yMjM4NiAzLjIyMzg2IDMgMy41IDNINUgxMEgxMS41QzExLjc3NjEgMyAxMiAzLjIyMzg2IDEyIDMuNUMxMiAzLjc3NjE0IDExLjc3NjEgNCAxMS41IDRIMTFWMTJDMTEgMTIuNTUyMyAxMC41NTIzIDEzIDEwIDEzSDVDNC40NDc3MiAxMyA0IDEyLjU1MjMgNCAxMlY0TDMuNSA0QzMuMjIzODYgNCAzIDMuNzc2MTQgMyAzLjVaTTUgNEgxMFYxMkg1VjRaJ1xuICAgICAgICApO1xuICAgICAgICB0cmFzaFBhdGguc2V0QXR0cmlidXRlKCdmaWxsJywgJ2N1cnJlbnRDb2xvcicpO1xuICAgICAgICB0cmFzaFBhdGguc2V0QXR0cmlidXRlKCdmaWxsLXJ1bGUnLCAnZXZlbm9kZCcpO1xuICAgICAgICB0cmFzaFBhdGguc2V0QXR0cmlidXRlKCdjbGlwLXJ1bGUnLCAnZXZlbm9kZCcpO1xuXG4gICAgICAgIHRyYXNoU3ZnLmFwcGVuZCh0cmFzaFBhdGgpO1xuXG4gICAgICAgIHJldHVybiB0cmFzaFN2ZztcbiAgICB9XG59IiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RvcmFnZXtcbiAgICBzdGF0aWMgc2V0SXRlbShuYW1lLCB2YWx1ZSkge1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShuYW1lLCB2YWx1ZSk7XG4gICAgfVxuICAgIHN0YXRpYyBnZXRJdGVtKG5hbWUpe1xuICAgICAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0obmFtZSk7XG4gICAgfVxuICAgIHN0YXRpYyByZW1vdmVJdGVtKG5hbWUpe1xuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShuYW1lKTtcbiAgICB9XG4gICAgc3RhdGljIGNsZWFyKCl7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0QWxsKCl7XG4gICAgICAgIGNvbnN0IGFsbFRvZG8gPSBbXTtcbiAgICAgICAgZm9yKGxldCBrZXkgb2YgT2JqZWN0LmtleXMobG9jYWxTdG9yYWdlKSl7XG4gICAgICAgICAgICBhbGxUb2RvLnB1c2goSlNPTi5wYXJzZShTdG9yYWdlLmdldEl0ZW0oa2V5KSkpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFsbFRvZG87XG4gICAgfVxufSIsImltcG9ydCBTdG9yYWdlIGZyb20gJy4vc3RvcmFnZS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvZG97XG4gICAgc3RhdGljIGFkZFRvZG8odGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgY3VycmVudFByb2plY3Qpe1xuICAgICAgICBjb25zdCB0b2RvSXRlbXMgPSBKU09OLnBhcnNlKFN0b3JhZ2UuZ2V0SXRlbShjdXJyZW50UHJvamVjdCkpO1xuICAgICAgICBjb25zdCBuZXdUb2RvID0gVG9kby5jcmVhdGUodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgdG9kb0l0ZW1zLmxlbmd0aCArIDEsIGN1cnJlbnRQcm9qZWN0KTtcbiAgICAgICAgdG9kb0l0ZW1zLnB1c2gobmV3VG9kbyk7XG4gICAgICAgIFN0b3JhZ2Uuc2V0SXRlbShjdXJyZW50UHJvamVjdCwgSlNPTi5zdHJpbmdpZnkodG9kb0l0ZW1zKSk7XG4gICAgfVxuICAgIHN0YXRpYyBjcmVhdGUodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgaWQsIGN1cnJlbnRQcm9qZWN0KXtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRpdGxlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBkdWVEYXRlLFxuICAgICAgICAgICAgcHJpb3JpdHksXG4gICAgICAgICAgICBpZCxcbiAgICAgICAgICAgIGN1cnJlbnRQcm9qZWN0XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIGRlbGV0ZShlbGVtKXtcbiAgICAgICAgY29uc3QgaWQgPSBlbGVtLmRhdGFzZXQuaWQ7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRQcm9qZWN0ID0gZWxlbS5kYXRhc2V0LnByb2plY3Q7XG4gICAgICAgIGNvbnN0IHRvZG8gPSBKU09OLnBhcnNlKFN0b3JhZ2UuZ2V0SXRlbShjdXJyZW50UHJvamVjdCkpO1xuICAgICAgICBjb25zdCB1cGRhdGVkVG9kbyA9IHRvZG8uZmlsdGVyKCh2YWwpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB2YWwuaWQgIT0gaWQ7XG4gICAgICAgIH0pXG4gICAgICAgIFN0b3JhZ2Uuc2V0SXRlbShjdXJyZW50UHJvamVjdCwgSlNPTi5zdHJpbmdpZnkodXBkYXRlZFRvZG8pKTtcbiAgICB9XG59IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9jc3NXaXRoTWFwcGluZ1RvU3RyaW5nLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJoZWFkZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGhlaWdodDogNjBweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNkMGI0OWY7XFxuICBjb2xvcjogI2Y2ZjJmMDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7IH1cXG4gIGhlYWRlciBoMSB7XFxuICAgIG1hcmdpbi1sZWZ0OiAwLjVyZW07IH1cXG4gIGhlYWRlciAudG9nZ2xlLW1lbnUge1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIHdpZHRoOiAycmVtO1xcbiAgICBoZWlnaHQ6IDJyZW07XFxuICAgIG1hcmdpbjogMCAwLjVyZW0gMCBhdXRvO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7IH1cXG4gICAgaGVhZGVyIC50b2dnbGUtbWVudSAubWVudS1iYXIge1xcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICB3aWR0aDogMnJlbTtcXG4gICAgICBoZWlnaHQ6IDAuNHJlbTtcXG4gICAgICB0b3A6IDUwJTtcXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XFxuICAgICAgYm9yZGVyLXJhZGl1czogMXB4O1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmMWU3ZGQ7IH1cXG4gICAgICBoZWFkZXIgLnRvZ2dsZS1tZW51IC5tZW51LWJhcjo6YmVmb3JlIHtcXG4gICAgICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgICAgd2lkdGg6IDJyZW07XFxuICAgICAgICBoZWlnaHQ6IDAuNHJlbTtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMTUwJSk7XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjFlN2RkO1xcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMXB4OyB9XFxuICAgICAgaGVhZGVyIC50b2dnbGUtbWVudSAubWVudS1iYXI6OmFmdGVyIHtcXG4gICAgICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgICAgd2lkdGg6IDJyZW07XFxuICAgICAgICBoZWlnaHQ6IDAuNHJlbTtcXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxNTAlKTtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmMWU3ZGQ7XFxuICAgICAgICBib3JkZXItcmFkaXVzOiAxcHg7IH1cXG5cXG5tYWluIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgY29sb3I6ICMwMTE2Mjc7IH1cXG4gIG1haW4gLmV4dGVuZGVkLW1lbnUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTdkMWM5O1xcbiAgICB3aWR0aDogMTAwJTsgfVxcbiAgICBtYWluIC5leHRlbmRlZC1tZW51IHAge1xcbiAgICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xcbiAgICAgIHBhZGRpbmc6IDAuNXJlbTtcXG4gICAgICBtYXJnaW46IDAgMXJlbTtcXG4gICAgICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICAgICAgY3Vyc29yOiBwb2ludGVyOyB9XFxuICAgICAgbWFpbiAuZXh0ZW5kZWQtbWVudSBwOmhvdmVyIHtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmM2U3ZTQ7IH1cXG4gICAgbWFpbiAuZXh0ZW5kZWQtbWVudSBwOm50aC1jaGlsZCgxKSB7XFxuICAgICAgbWFyZ2luLXRvcDogMC41cmVtOyB9XFxuICAgIG1haW4gLmV4dGVuZGVkLW1lbnUgcDpudGgtbGFzdC1jaGlsZCgxKSB7XFxuICAgICAgbWFyZ2luLWJvdHRvbTogMC41cmVtOyB9XFxuICAgIG1haW4gLmV4dGVuZGVkLW1lbnUgaDIge1xcbiAgICAgIG1hcmdpbjogMXJlbSAwIDFyZW0gMXJlbTsgfVxcbiAgICBtYWluIC5leHRlbmRlZC1tZW51IHVsIHtcXG4gICAgICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7IH1cXG4gICAgICBtYWluIC5leHRlbmRlZC1tZW51IHVsIGxpIHtcXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgICAgICBwYWRkaW5nOiAwLjVyZW07XFxuICAgICAgICBtYXJnaW46IDAgMXJlbTtcXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjsgfVxcbiAgICAgICAgbWFpbiAuZXh0ZW5kZWQtbWVudSB1bCBsaTpob3ZlciB7XFxuICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmM2U3ZTQ7IH1cXG4gICAgICAgICAgbWFpbiAuZXh0ZW5kZWQtbWVudSB1bCBsaTpob3ZlciBzdmcge1xcbiAgICAgICAgICAgIGRpc3BsYXk6IGJsb2NrOyB9XFxuICAgICAgICBtYWluIC5leHRlbmRlZC1tZW51IHVsIGxpIHN2ZyB7XFxuICAgICAgICAgIGRpc3BsYXk6IGhpZGRlbjtcXG4gICAgICAgICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxNSUpOyB9XFxuICAgICAgbWFpbiAuZXh0ZW5kZWQtbWVudSB1bCBmb3JtIHtcXG4gICAgICAgIG1hcmdpbjogMCAxcmVtOyB9XFxuICAgICAgICBtYWluIC5leHRlbmRlZC1tZW51IHVsIGZvcm0gaW5wdXRbdHlwZT1cXFwidGV4dFxcXCJdIHtcXG4gICAgICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICAgICAgICBtYXgtd2lkdGg6IDEwcmVtO1xcbiAgICAgICAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07IH1cXG4gIG1haW4gLnByb2plY3QtY29udGFpbmVyIGgzIHtcXG4gICAgbWFyZ2luOiAxcmVtIDAuNXJlbTsgfVxcbiAgbWFpbiAucHJvamVjdC1jb250YWluZXIgLnRvZG8tY29udGFpbmVyIHtcXG4gICAgd2lkdGg6IDkwJTtcXG4gICAgbWFyZ2luOiAwIGF1dG8gMC41cmVtIGF1dG87XFxuICAgIGRpc3BsYXk6IGZsZXg7IH1cXG4gICAgbWFpbiAucHJvamVjdC1jb250YWluZXIgLnRvZG8tY29udGFpbmVyIC50b2RvIHtcXG4gICAgICB3aWR0aDogMTAwJTtcXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTdkMWM5O1xcbiAgICAgIHdvcmQtYnJlYWs6IGJyZWFrLWFsbDsgfVxcbiAgICAgIG1haW4gLnByb2plY3QtY29udGFpbmVyIC50b2RvLWNvbnRhaW5lciAudG9kbyAudG9kby10aXRsZSB7XFxuICAgICAgICBmb250LXNpemU6IDIwcHg7IH1cXG4gICAgICBtYWluIC5wcm9qZWN0LWNvbnRhaW5lciAudG9kby1jb250YWluZXIgLnRvZG8gLnRvZG8tZGVzYyB7XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjNlN2U0O1xcbiAgICAgICAgbWF4LWhlaWdodDogMThweDtcXG4gICAgICAgIG92ZXJmbG93LXk6IGhpZGRlbjsgfVxcbiAgICAgICAgbWFpbiAucHJvamVjdC1jb250YWluZXIgLnRvZG8tY29udGFpbmVyIC50b2RvIC50b2RvLWRlc2M6aG92ZXIge1xcbiAgICAgICAgICBtYXgtaGVpZ2h0OiBtYXgtY29udGVudDtcXG4gICAgICAgICAgb3ZlcmZsb3cteTogdmlzaWJsZTsgfVxcbiAgICBtYWluIC5wcm9qZWN0LWNvbnRhaW5lciAudG9kby1jb250YWluZXIgLnRvZG8tb3B0aW9uIHtcXG4gICAgICBkaXNwbGF5OiBub25lO1xcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgICAgd2lkdGg6IDNyZW07XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2U3ZDFjOTtcXG4gICAgICBjdXJzb3I6IHBvaW50ZXI7IH1cXG4gICAgbWFpbiAucHJvamVjdC1jb250YWluZXIgLnRvZG8tY29udGFpbmVyOmhvdmVyIC50b2RvLW9wdGlvbiB7XFxuICAgICAgZGlzcGxheTogZ3JpZDsgfVxcbiAgbWFpbiAucHJvamVjdC1jb250YWluZXIgLmFkZC10b2RvLWNvbnRhaW5lciB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgd2lkdGg6IDk1JTtcXG4gICAgbWFyZ2luOiAxcmVtIGF1dG87XFxuICAgIGhlaWdodDogMnJlbTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2U3ZDFjOTtcXG4gICAgY3Vyc29yOiBwb2ludGVyOyB9XFxuICAgIG1haW4gLnByb2plY3QtY29udGFpbmVyIC5hZGQtdG9kby1jb250YWluZXIgLmFkZC10b2RvLWJhciB7XFxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgIHdpZHRoOiAwLjVyZW07XFxuICAgICAgaGVpZ2h0OiAxLjVyZW07XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2YzZTdlNDtcXG4gICAgICB0b3A6IDUwJTtcXG4gICAgICByaWdodDogNTAlO1xcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDUwJSwgLTUwJSk7IH1cXG4gICAgICBtYWluIC5wcm9qZWN0LWNvbnRhaW5lciAuYWRkLXRvZG8tY29udGFpbmVyIC5hZGQtdG9kby1iYXI6OmFmdGVyIHtcXG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICAgICAgd2lkdGg6IDAuNXJlbTtcXG4gICAgICAgIGhlaWdodDogMS41cmVtO1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2YzZTdlNDtcXG4gICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTsgfVxcblxcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzY4cHgpIHtcXG4gIG1haW4ge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICBoZWlnaHQ6IGNhbGMoMTAwdmggLSA2MHB4KTsgfVxcbiAgICBtYWluIC5leHRlbmRlZC1tZW51IHtcXG4gICAgICB3aWR0aDogMjV2dztcXG4gICAgICBvdmVyZmxvdy15OiBhdXRvOyB9XFxuICAgIG1haW4gLnByb2plY3QtY29udGFpbmVyIHtcXG4gICAgICB3aWR0aDogMTAwJTtcXG4gICAgICBvdmVyZmxvdy15OiBhdXRvOyB9IH1cXG5cXG4udG9kby1mb3JtLWNvbnRhaW5lciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcXG4gIHRvcDogMDtcXG4gIHJpZ2h0OiAwO1xcbiAgYm90dG9tOiAwO1xcbiAgbGVmdDogMDtcXG4gIGJhY2tkcm9wLWZpbHRlcjogYmx1cigzcHgpOyB9XFxuICAudG9kby1mb3JtLWNvbnRhaW5lciAudG9kby1mb3JtIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGdyaWQtZ2FwOiA1cHg7XFxuICAgIHdpZHRoOiA5MCU7XFxuICAgIG1heC13aWR0aDogMzAwcHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNkMGI0OWY7XFxuICAgIHBhZGRpbmc6IDFyZW0gMDtcXG4gICAgYm9yZGVyLXJhZGl1czogMnB4OyB9XFxuICAgIC50b2RvLWZvcm0tY29udGFpbmVyIC50b2RvLWZvcm0gaW5wdXQge1xcbiAgICAgIHdpZHRoOiAxMDAlOyB9XFxuXFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3NjhweCkge1xcbiAgLnRvZG8tZm9ybS1jb250YWluZXIgLnRvZG8tZm9ybSB7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWF4LWNvbnRlbnQgbWF4LWNvbnRlbnQ7IH0gfVxcblxcbioge1xcbiAgcGFkZGluZzogMDtcXG4gIG1hcmdpbjogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7IH1cXG5cXG4uYWN0aXZlIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmM2U3ZTQgIWltcG9ydGFudDtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkOyB9XFxuXFxuLmhpZGRlbiB7XFxuICBkaXNwbGF5OiBub25lOyB9XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc2Fzcy9oZWFkZXIuc2Nzc1wiLFwid2VicGFjazovLy4vc2Fzcy9tYWluLnNjc3NcIixcIndlYnBhY2s6Ly8uL3Nhc3MvdG9kby5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zYXNzL3N0eWxlLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBSUE7RUFDSSxhQUFhO0VBQ2IsWUFBWTtFQUNaLHlCQVBzQjtFQVF0QixjQU5nQjtFQU9oQixtQkFBbUIsRUFBQTtFQUx2QjtJQU9RLG1CQUFtQixFQUFBO0VBUDNCO0lBVVEsa0JBQWtCO0lBQ2xCLFdBQVc7SUFDWCxZQUFZO0lBQ1osdUJBQXVCO0lBQ3ZCLGVBQWUsRUFBQTtJQWR2QjtNQWdCWSxrQkFBa0I7TUFDbEIsV0FBVztNQUNYLGNBQWM7TUFDZCxRQUFRO01BQ1IsMkJBQTJCO01BQzNCLGtCQUFrQjtNQUNsQix5QkF6QmUsRUFBQTtNQUczQjtRQXdCZ0IsV0FBVztRQUNYLGtCQUFrQjtRQUNsQixXQUFXO1FBQ1gsY0FB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YWNrZ3JvdW5kLWNvbG9yMjogI2YxZTdkZDtcXG4kdGV4dC1jb2xvcjogI2Y2ZjJmMDtcXG5cXG5oZWFkZXJ7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGhlaWdodDogNjBweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGJhY2tncm91bmQtY29sb3I7XFxuICAgIGNvbG9yOiAkdGV4dC1jb2xvcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgaDF7XFxuICAgICAgICBtYXJnaW4tbGVmdDogMC41cmVtO1xcbiAgICB9XFxuICAgIC50b2dnbGUtbWVudXtcXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgICAgIHdpZHRoOiAycmVtO1xcbiAgICAgICAgaGVpZ2h0OiAycmVtO1xcbiAgICAgICAgbWFyZ2luOiAwIDAuNXJlbSAwIGF1dG87XFxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgICAgICAubWVudS1iYXJ7XFxuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgICAgICAgIHdpZHRoOiAycmVtO1xcbiAgICAgICAgICAgIGhlaWdodDogMC40cmVtO1xcbiAgICAgICAgICAgIHRvcDogNTAlO1xcbiAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcXG4gICAgICAgICAgICBib3JkZXItcmFkaXVzOiAxcHg7XFxuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGJhY2tncm91bmQtY29sb3IyO1xcbiAgICAgICAgICAgICY6OmJlZm9yZXtcXG4gICAgICAgICAgICAgICAgY29udGVudDogXFxcIlxcXCI7XFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgICAgICAgICAgd2lkdGg6IDJyZW07XFxuICAgICAgICAgICAgICAgIGhlaWdodDogMC40cmVtO1xcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTE1MCUpO1xcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmFja2dyb3VuZC1jb2xvcjI7XFxuICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDFweDtcXG4gICAgICAgICAgICB9XFxuICAgICAgICAgICAgJjo6YWZ0ZXJ7XFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFxcXCJcXFwiO1xcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgICAgICAgICAgIHdpZHRoOiAycmVtO1xcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDAuNHJlbTtcXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDE1MCUpO1xcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmFja2dyb3VuZC1jb2xvcjI7XFxuICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDFweDtcXG4gICAgICAgICAgICB9XFxuICAgICAgICB9XFxuICAgIH1cXG59XCIsXCIkYmFja2dyb3VuZC1jb2xvcjM6ICNlN2QxYzk7XFxuJGJhY2tncm91bmQtY29sb3I0OiAjZjNlN2U0O1xcbiR0ZXh0LWNvbG9yOiAjMDExNjI3O1xcblxcbm1haW57XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGNvbG9yOiAkdGV4dC1jb2xvcjtcXG4gICAgLmV4dGVuZGVkLW1lbnV7XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmFja2dyb3VuZC1jb2xvcjM7XFxuICAgICAgICB3aWR0aDogMTAwJTtcXG4gICAgICAgIHB7XFxuICAgICAgICAgICAgZm9udC1zaXplOiAxLjJyZW07XFxuICAgICAgICAgICAgcGFkZGluZzogMC41cmVtO1xcbiAgICAgICAgICAgIG1hcmdpbjogMCAxcmVtO1xcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcXG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgICAgICAgICAgJjpob3ZlcntcXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGJhY2tncm91bmQtY29sb3I0O1xcbiAgICAgICAgICAgIH1cXG4gICAgICAgIH1cXG4gICAgICAgIHA6bnRoLWNoaWxkKDEpe1xcbiAgICAgICAgICAgIG1hcmdpbi10b3A6IDAuNXJlbTtcXG4gICAgICAgIH1cXG4gICAgICAgIHA6bnRoLWxhc3QtY2hpbGQoMSl7XFxuICAgICAgICAgICAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xcbiAgICAgICAgfVxcbiAgICAgICAgaDJ7XFxuICAgICAgICAgICAgbWFyZ2luOiAxcmVtIDAgMXJlbSAxcmVtO1xcbiAgICAgICAgfVxcbiAgICAgICAgdWx7XFxuICAgICAgICAgICAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xcbiAgICAgICAgICAgIGxpe1xcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAwLjVyZW07XFxuICAgICAgICAgICAgICAgIG1hcmdpbjogMCAxcmVtO1xcbiAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7XFxuICAgICAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgICAgICAgICAgICAgJjpob3ZlcntcXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRiYWNrZ3JvdW5kLWNvbG9yNDtcXG4gICAgICAgICAgICAgICAgICAgIHN2Z3tcXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICAgICAgICAgICAgICAgIH1cXG4gICAgICAgICAgICAgICAgfVxcbiAgICAgICAgICAgICAgICBzdmd7XFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBoaWRkZW47XFxuICAgICAgICAgICAgICAgICAgICBtYXJnaW4tbGVmdDogYXV0bztcXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxNSUpO1xcbiAgICAgICAgICAgICAgICB9XFxuICAgICAgICAgICAgfVxcbiAgICAgICAgICAgIGZvcm17XFxuICAgICAgICAgICAgICAgIG1hcmdpbjogMCAxcmVtO1xcbiAgICAgICAgICAgICAgICBpbnB1dFt0eXBlPVxcXCJ0ZXh0XFxcIl0ge1xcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMTAwJTtcXG4gICAgICAgICAgICAgICAgICAgIG1heC13aWR0aDogMTByZW07XFxuICAgICAgICAgICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XFxuICAgICAgICAgICAgICAgIH1cXG4gICAgICAgICAgICB9XFxuICAgICAgICB9XFxuICAgIH1cXG4gICAgLnByb2plY3QtY29udGFpbmVye1xcbiAgICAgICAgaDN7XFxuICAgICAgICAgICAgbWFyZ2luOiAxcmVtIDAuNXJlbVxcbiAgICAgICAgfVxcbiAgICAgICAgLnRvZG8tY29udGFpbmVye1xcbiAgICAgICAgICAgIHdpZHRoOiA5MCU7XFxuICAgICAgICAgICAgbWFyZ2luOiAwIGF1dG8gMC41cmVtIGF1dG87XFxuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICAgICAgICAudG9kb3tcXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRiYWNrZ3JvdW5kLWNvbG9yMztcXG4gICAgICAgICAgICAgICAgd29yZC1icmVhazogYnJlYWstYWxsO1xcbiAgICAgICAgICAgICAgICAudG9kby10aXRsZXtcXG4gICAgICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMjBweDtcXG4gICAgICAgICAgICAgICAgfVxcbiAgICAgICAgICAgICAgICAudG9kby1kZXNje1xcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGJhY2tncm91bmQtY29sb3I0O1xcbiAgICAgICAgICAgICAgICAgICAgbWF4LWhlaWdodDogMThweDtcXG4gICAgICAgICAgICAgICAgICAgIG92ZXJmbG93LXk6IGhpZGRlbjtcXG4gICAgICAgICAgICAgICAgICAgICY6aG92ZXJ7XFxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4LWhlaWdodDogbWF4LWNvbnRlbnQ7XFxuICAgICAgICAgICAgICAgICAgICAgICAgb3ZlcmZsb3cteTogdmlzaWJsZTtcXG4gICAgICAgICAgICAgICAgICAgIH1cXG4gICAgICAgICAgICAgICAgfVxcbiAgICAgICAgICAgIH1cXG4gICAgICAgICAgICAudG9kby1vcHRpb257XFxuICAgICAgICAgICAgICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgICAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICAgICAgICAgICAgICB3aWR0aDogM3JlbTtcXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGJhY2tncm91bmQtY29sb3IzO1xcbiAgICAgICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgICAgICAgICAgfVxcbiAgICAgICAgICAgICY6aG92ZXIgLnRvZG8tb3B0aW9ue1xcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBncmlkO1xcbiAgICAgICAgICAgIH1cXG4gICAgICAgIH1cXG4gICAgICAgIC5hZGQtdG9kby1jb250YWluZXJ7XFxuICAgICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICAgICAgICAgIHdpZHRoOiA5NSU7XFxuICAgICAgICAgICAgbWFyZ2luOiAxcmVtIGF1dG87XFxuICAgICAgICAgICAgaGVpZ2h0OiAycmVtO1xcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRiYWNrZ3JvdW5kLWNvbG9yMztcXG4gICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgICAgICAgICAgLmFkZC10b2RvLWJhcntcXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICAgICAgICAgICAgICB3aWR0aDogMC41cmVtO1xcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDEuNXJlbTtcXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGJhY2tncm91bmQtY29sb3I0O1xcbiAgICAgICAgICAgICAgICB0b3A6IDUwJTtcXG4gICAgICAgICAgICAgICAgcmlnaHQ6IDUwJTtcXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoNTAlLCAtNTAlKTtcXG4gICAgICAgICAgICAgICAgJjo6YWZ0ZXJ7XFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBcXFwiXFxcIjtcXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAwLjVyZW07XFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IDEuNXJlbTtcXG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRiYWNrZ3JvdW5kLWNvbG9yNDtcXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDkwZGVnKTtcXG4gICAgICAgICAgICAgICAgfVxcbiAgICAgICAgICAgIH1cXG4gICAgICAgIH1cXG4gICAgfVxcbn1cXG5cXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kKG1pbi13aWR0aDo3NjhweCkge1xcbiAgICBtYWlue1xcbiAgICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgICAgICBoZWlnaHQ6IGNhbGMoMTAwdmggLSA2MHB4KTtcXG4gICAgICAgIC5leHRlbmRlZC1tZW51e1xcbiAgICAgICAgICAgIHdpZHRoOiAyNXZ3O1xcbiAgICAgICAgICAgIG92ZXJmbG93LXk6IGF1dG87XFxuICAgICAgICB9XFxuICAgICAgICAucHJvamVjdC1jb250YWluZXJ7XFxuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgICAgICAgb3ZlcmZsb3cteTogYXV0bztcXG4gICAgICAgIH1cXG4gICAgfVxcbn1cIixcIiRiYWNrZ3JvdW5kLWNvbG9yOiAjZDBiNDlmO1xcbiRiYWNrZ3JvdW5kLWNvbG9yMjogI2YxZTdkZDtcXG4kdGV4dC1jb2xvcjogIzAxMTYyNztcXG5cXG4udG9kby1mb3JtLWNvbnRhaW5lcntcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBwbGFjZS1pdGVtczogY2VudGVyO1xcbiAgICB0b3A6IDA7XFxuICAgIHJpZ2h0OiAwO1xcbiAgICBib3R0b206IDA7XFxuICAgIGxlZnQ6IDA7XFxuICAgIGJhY2tkcm9wLWZpbHRlcjogYmx1cigzcHgpO1xcbiAgICAudG9kby1mb3Jte1xcbiAgICAgICAgZGlzcGxheTpncmlkO1xcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgICAgICBncmlkLWdhcDo1cHg7XFxuICAgICAgICB3aWR0aDogOTAlO1xcbiAgICAgICAgbWF4LXdpZHRoOiAzMDBweDtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRiYWNrZ3JvdW5kLWNvbG9yO1xcbiAgICAgICAgcGFkZGluZzogMXJlbSAwO1xcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMnB4O1xcbiAgICAgICAgaW5wdXR7XFxuICAgICAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgICB9XFxuICAgIH1cXG59XFxuXFxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZChtaW4td2lkdGg6NzY4cHgpIHtcXG4gICAgLnRvZG8tZm9ybS1jb250YWluZXIgLnRvZG8tZm9ybXtcXG4gICAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogbWF4LWNvbnRlbnQgbWF4LWNvbnRlbnQ7XFxuICAgIH1cXG59XCIsXCJAaW1wb3J0IFxcXCJoZWFkZXIuc2Nzc1xcXCI7XFxuQGltcG9ydCBcXFwibWFpbi5zY3NzXFxcIjtcXG5AaW1wb3J0IFxcXCJ0b2RvLnNjc3NcXFwiO1xcblxcbip7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuLmFjdGl2ZXtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2YzZTdlNCAhaW1wb3J0YW50O1xcbiAgICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuXFxuLmhpZGRlbntcXG4gICAgZGlzcGxheTogbm9uZTtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIHJldHVybiBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoY29udGVudCwgXCJ9XCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gKG1vZHVsZXMsIG1lZGlhUXVlcnksIGRlZHVwZSkge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLWRlc3RydWN0dXJpbmdcbiAgICAgICAgdmFyIGlkID0gdGhpc1tpXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBtb2R1bGVzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfaV0pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnRpbnVlXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWFRdWVyeSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWFRdWVyeTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzJdID0gXCJcIi5jb25jYXQobWVkaWFRdWVyeSwgXCIgYW5kIFwiKS5jb25jYXQoaXRlbVsyXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIF9zbGljZWRUb0FycmF5KGFyciwgaSkgeyByZXR1cm4gX2FycmF5V2l0aEhvbGVzKGFycikgfHwgX2l0ZXJhYmxlVG9BcnJheUxpbWl0KGFyciwgaSkgfHwgX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KGFyciwgaSkgfHwgX25vbkl0ZXJhYmxlUmVzdCgpOyB9XG5cbmZ1bmN0aW9uIF9ub25JdGVyYWJsZVJlc3QoKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlLlxcbkluIG9yZGVyIHRvIGJlIGl0ZXJhYmxlLCBub24tYXJyYXkgb2JqZWN0cyBtdXN0IGhhdmUgYSBbU3ltYm9sLml0ZXJhdG9yXSgpIG1ldGhvZC5cIik7IH1cblxuZnVuY3Rpb24gX3Vuc3VwcG9ydGVkSXRlcmFibGVUb0FycmF5KG8sIG1pbkxlbikgeyBpZiAoIW8pIHJldHVybjsgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSByZXR1cm4gX2FycmF5TGlrZVRvQXJyYXkobywgbWluTGVuKTsgdmFyIG4gPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpOyBpZiAobiA9PT0gXCJPYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yKSBuID0gby5jb25zdHJ1Y3Rvci5uYW1lOyBpZiAobiA9PT0gXCJNYXBcIiB8fCBuID09PSBcIlNldFwiKSByZXR1cm4gQXJyYXkuZnJvbShvKTsgaWYgKG4gPT09IFwiQXJndW1lbnRzXCIgfHwgL14oPzpVaXxJKW50KD86OHwxNnwzMikoPzpDbGFtcGVkKT9BcnJheSQvLnRlc3QobikpIHJldHVybiBfYXJyYXlMaWtlVG9BcnJheShvLCBtaW5MZW4pOyB9XG5cbmZ1bmN0aW9uIF9hcnJheUxpa2VUb0FycmF5KGFyciwgbGVuKSB7IGlmIChsZW4gPT0gbnVsbCB8fCBsZW4gPiBhcnIubGVuZ3RoKSBsZW4gPSBhcnIubGVuZ3RoOyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IG5ldyBBcnJheShsZW4pOyBpIDwgbGVuOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfVxuXG5mdW5jdGlvbiBfaXRlcmFibGVUb0FycmF5TGltaXQoYXJyLCBpKSB7IHZhciBfaSA9IGFyciA9PSBudWxsID8gbnVsbCA6IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgYXJyW1N5bWJvbC5pdGVyYXRvcl0gfHwgYXJyW1wiQEBpdGVyYXRvclwiXTsgaWYgKF9pID09IG51bGwpIHJldHVybjsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfcywgX2U7IHRyeSB7IGZvciAoX2kgPSBfaS5jYWxsKGFycik7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdICE9IG51bGwpIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfVxuXG5mdW5jdGlvbiBfYXJyYXlXaXRoSG9sZXMoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHJldHVybiBhcnI7IH1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pIHtcbiAgdmFyIF9pdGVtID0gX3NsaWNlZFRvQXJyYXkoaXRlbSwgNCksXG4gICAgICBjb250ZW50ID0gX2l0ZW1bMV0sXG4gICAgICBjc3NNYXBwaW5nID0gX2l0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLnNjc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5zY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRvbSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRG9tLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRG9tW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM11cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5Eb21baW5kZXhdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRG9tW2luZGV4XS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0eWxlc0luRG9tLnB1c2goe1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiBhZGRTdHlsZShvYmosIG9wdGlvbnMpLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZShuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRG9tW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5Eb21bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRG9tW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRG9tLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhzdHlsZSwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoc3R5bGUpO1xuICByZXR1cm4gc3R5bGU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZSkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGUuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlLCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IG9iai5jc3M7XG4gIHZhciBtZWRpYSA9IG9iai5tZWRpYTtcbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKG1lZGlhKSB7XG4gICAgc3R5bGUuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpO1xuICB9IGVsc2Uge1xuICAgIHN0eWxlLnJlbW92ZUF0dHJpYnV0ZShcIm1lZGlhXCIpO1xuICB9XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGUpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZS5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGUgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlLCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZSkge1xuICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlLnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGUuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGUucmVtb3ZlQ2hpbGQoc3R5bGUuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuLi9zYXNzL3N0eWxlLnNjc3MnO1xuaW1wb3J0IFVJIGZyb20gJy4vVUkuanMnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgVUkubG9hZFVJKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=