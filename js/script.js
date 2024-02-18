//Select elements
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector(".todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");

//Variavel que armazena os valores antigos das tarefas
let oldInputValue;

//Function

const saveTodo = (text) => { // Ela espera receber um texto

    //Criando as tarefas na tela após o envio
    const todo = document.createElement("div") // Cria o elemento  div
    todo.classList.add("todo") //Adiciona uma class a essa div

    const todoTitle = document.createElement("h3") //Cria o titulo da tarefa
    todoTitle.innerText = text //recebe o texto da função saveTodo
    todo.appendChild(todoTitle) //Adiciona o titulo dentro da div ( elemento filho no pai)

    const doneBtn = document.createElement("button") //Cria o elemento button
    doneBtn.classList.add("finish-todo") //Adiciona uma class ao button 
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>' //Adicona o icone ao botão
    todo.appendChild(doneBtn) // diciona o botão dentro da div ( elemento filho no pai)

    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn)

    const deletBtn = document.createElement("button")
    deletBtn.classList.add("remove-todo")
    deletBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deletBtn)

    todoList.appendChild(todo);

    todoInput.value = ""; //limpa o texto após adicionar a tarefa
    todoInput.focus(); //Faz o cursor permanecer no input
};

//Tela de edição
const toggleForms = () => {
    editForm.classList.toggle("hide") // faz com que se o menu de edição for exibido ele esconde e se estiver escondido exibe
    todoForm.classList.toggle("hide")
    todoList.classList.toggle("hide")
};

// Atualização do nome da tarefa
const updateTodo = (text) => {  // Ela espera receber um texto
    const todos = document.querySelectorAll(".todo") //seleciona todos os todo

    todos.forEach((todo) =>{ //Pecorre todos os todo e seleciona o qual será editado (loop)
        let todoTitle = todo.querySelector("h3") //seleciona todos os h3 

        console.log(todoTitle, text);

        if(todoTitle.innerText === oldInputValue){ //valida se o nome atual é igual ao que está salvo na memoria
            todoTitle.innerText = text; //Localizou o todo certo e realizou a alteração
        };
    });
};

//Função do campo pesquisar
const getSearchTodos = (search) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) =>{
        let todoTitle = todo.querySelector("h3").innerText.toLowerCase(); //identifica a tarefa mesmo com o capslock ligado

        const normalizedSearch = search.toLowerCase(); // padronizar o search com o lower case

        todo.style.display = "flex"; // até que se prove o contrario ( até que a tarefa que eu esteja procurando não seja exibilida,mostre as opções)

        if (!todoTitle.includes(normalizedSearch)) { //uma negação, pegar somente os todos que não possuem o search
            todo.style.display = "none";
        };
    });
};

//função do campo de filtro
const filterTodos = (filterValue) => {
    const todos = document.querySelectorAll(".todo");

    // o switch compara o valor de todos os cases abaixo (melhor forma de fazer varias comparações e não ter varios IF/ELSE)
    switch(filterValue){
        case "all":
            todos.forEach((todo) => (todo.style.display = "flex")); // caso do filtro de todos, vai me apresentar todas as tarefas registradas
            break;
            
        case "done":
            todos.forEach((todo) => todo.classList.contains("done") ? (todo.style.display = "flex") : (todo.style.display = "none"));
            break;

        case "todo":
            todos.forEach((todo) => !todo.classList.contains("done") ? (todo.style.display = "flex") : (todo.style.display = "none"));
            break;

        default:
            break
    };
};

//Events

// Adicionando tarefas
todoForm.addEventListener("submit", (e)=>{ //adicona um evento de envio ao botão
    e.preventDefault(); //Previne que o formulario seja enviado ao precionar o botão

    const inputValue = todoInput.value //Armazena o valor inserido no input na veriavel inputValue

    //validação de armazdenamento na variavel e que o usuario não armazene tarefas sem titulo
    if(inputValue){
        saveTodo(inputValue)
    }
})

// funcionamento dos botões
document.addEventListener("click", (e)=>{ //Adiciona um evento de click em todo o documento
    const targetEl = e.target //identifica o elemento que foi clicado
    const parentEl = targetEl.closest("div") // Aplica no elemento pai, seleciona a div mais proxima
    
    //identifica o titulo
    let todoTitle; 

    if(parentEl && parentEl.querySelector("h3")) // se o parentEl existir e se tiver um titulo
    todoTitle = parentEl.querySelector("h3").innerHTML

    //config. botões
    if(targetEl.classList.contains("finish-todo")){ //Expecifica o botão e a ação que ele irá realizar
        parentEl.classList.toggle("done") // adiciona o efeito done ao botão.
    }
    if(targetEl.classList.contains("remove-todo")){
        parentEl.remove() // Adiciona o eveno remove ao botão
    }
    if(targetEl.classList.contains("edit-todo")){
        toggleForms() // executa a função toggleForms
        
        editInput.value = todoTitle; // muda o valor do input
        oldInputValue = todoTitle; // armazena o valor antigo do input na variavel
    };
});

// Botão de cancelar a edição da tarefa
cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();

    toggleForms();
});

//Botão de confirmar a edição da tarefa
editForm.addEventListener("submit", (e) => { // Adiciona um evento de submit ao botão
    e.preventDefault(); //Previne que o formulario seja enviado ao precionar o botão

    const editInputValue = editInput.value // Pega o valor atual do input

    if(editInputValue){ 
        updateTodo(editInputValue) //Atualiza o valor do input
    };

    toggleForms();
});

//Config. de pesquisar
searchInput.addEventListener("keyup", (e) => { // Adiciona um evento no botão
    const search = e.target.value // variavel que pega o valor do input

    getSearchTodos(search); // Variavel que executa ao buscar o valor do input
});

eraseBtn.addEventListener("click", (e) =>{ // adiciona um evendo de click no botão
    e.preventDefault(); //Previne que o formulario seja enviado ao precionar o botão

    searchInput.dispatchEvent(new Event("keyup"));
});

// Config. de filtro
filterBtn.addEventListener("change", (e) =>{
    const filterValue = e.target.value;

    filterTodos(filterValue);
    
});
