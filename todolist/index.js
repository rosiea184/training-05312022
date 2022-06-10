const APIs = (() => {
  const URL = "http://localhost:3000/todos";

  const addTodo = (newTodos) => {
    return fetch(URL, {
      method: "POST",
      body: JSON.stringify(newTodos),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return res.json();
    });
  };

  const deleteTodo = (id) => {
    return fetch(`${URL}/${id}`, {
      method: "DELETE",
    }).then((res) => {
      return res.json();
    });
  };
  const updateTodo = (id, updateTodo) => {
    return fetch(`${URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(updateTodo),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return res.json();
    });
  };
  const getTodos = () => {
    return fetch(`${URL}`).then((res) => {
      return res.json();
    });
  };

  return {
    getTodos,
    deleteTodo,
    addTodo,
    updateTodo,
  };
})();

const Model = (() => {
  class State {
    #todos;
    #onChangeCb;
    constructor() {
      this.#todos = [];
      this.#onChangeCb = () => {};
    }
    get todos() {
      return this.#todos;
    }
    set todos(newTodos) {
      this.#todos = newTodos;
      this.#onChangeCb();
    }

    subscirbe = (cb) => {
      this.#onChangeCb = cb;
    };
  }
  return {
    State,
  };
})();

const View = (() => {
  const formEl = document.querySelector(".todo__form");
  const todoListEl = document.querySelector(".todo__list");
  const renderTodolist = (todos) => {
    let template = "";
    todos
      .sort((a, b) => b.id - a.id)
      .forEach((todo) => {
        template += `<li id=${todo.id}>`;
        template += todo.complete
          ? `<input type="checkbox" checked><s>${todo.content}</s>`
          : `<input type="checkbox"><span contenteditable=true class="editable">${todo.content}</span>`;
        template += '<button class="btn--delete">Delete</button></li>';
      });
    todoListEl.innerHTML = template;
  };
  return {
    formEl,
    renderTodolist,
    todoListEl,
  };
})();

const ViewModel = ((Model, View) => {
  const state = new Model.State();

  const addTodo = () => {
    View.formEl.addEventListener("submit", (event) => {
      event.preventDefault();
      const content = event.target[0].value;
      if (content.trim() === "") return;
      const newTodo = { content };
      APIs.addTodo(newTodo).then((res) => {
        console.log("Res", res);
        state.todos = [res, ...state.todos]; //anti-pattern
      });
    });
  };

  const deleteTodo = () => {
    View.todoListEl.addEventListener("click", (event) => {
      // console.log(event.currentTarget, event.target);
      const id = event.target.parentElement.id;
      if (event.target.className === "btn--delete") {
        APIs.deleteTodo(id).then((res) => {
          // console.log("Res", res);
          state.todos = state.todos.filter((todo) => {
            return +todo.id !== +id;
          });
        });
      }
    });
  };

  const editTodo = () => {
    View.todoListEl.addEventListener("focusout", (event) => {
      const id = event.target.parentElement.id;
      if (event.target.className === "editable") {
        const content = event.target.textContent;
        const updateTodo = { id, content, complete: false };
        APIs.updateTodo(id, updateTodo).then((res) => {
          state.todos = state.todos.map((todo) => {
            return todo.id === id ? { ...todo, content: content } : todo;
          });
        });
      }
    });
  };

  const toggleTodo = () => {
    View.todoListEl.addEventListener("change", (event) => {
      const id = event.target.parentElement.id;
      if (event.target.type === "checkbox") {
        const content = event.target.parentElement.children[1].textContent;
        const updateTodo = { id, content, complete: event.target.checked };
        APIs.updateTodo(id, updateTodo).then((res) => {
          state.todos = state.todos.map((todo) => {
            return todo.id === id
              ? { ...todo, complete: !todo.complete }
              : todo;
          });
        });
        state.todos = state.todos.map((todo) => {
          return +todo.id === +id
            ? { ...todo, complete: !todo.complete }
            : todo;
        });
      }
    });
  };

  const getTodos = () => {
    APIs.getTodos().then((res) => {
      state.todos = res;
    });
  };

  const bootstrap = () => {
    addTodo();
    deleteTodo();
    toggleTodo();
    editTodo();
    getTodos();
    state.subscirbe(() => {
      View.renderTodolist(state.todos);
    });
  };
  return {
    bootstrap,
  };
})(Model, View);

ViewModel.bootstrap();
