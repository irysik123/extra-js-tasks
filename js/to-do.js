const save = (key, value) => {
    try {
      const serializedState = JSON.stringify(value);
      localStorage.setItem(key, serializedState);
    } catch (error) {
      console.error('Set state error: ', error.message);
    }
  };
  
  const load = (key) => {
    try {
      const serializedState = localStorage.getItem(key);
      return serializedState === null ? undefined : JSON.parse(serializedState);
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  };
  
  const remove = (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.log('Remove item error: ', error.message);
    }
  };
  
refs = {
    form: document.querySelector('form'),
    list: document.querySelector('ul')
};

const LOCAL_KEY = 'todos-items';
let items = load(LOCAL_KEY) || [];



refs.form.addEventListener('submit', onSubmitClick);
refs.list.addEventListener('click', onDeleteBtnClick);

function onSubmitClick(event) {
    event.preventDefault();

    const input = event.currentTarget.elements['user-todos']; /* !!!!!! якщо нема -, то звертаємось через крапку [.todos] */

    const todos = input.value.trim();/* !!!!!! щоб обрізати пробіли + переваірка на пустий инпут */

    if(todos === "") {
       return alert('!!!!')
    }

    if(todos !== "") {
        const dublicate = items.find((el) => el.text === todos)
        if(dublicate) {
            return alert("already exists!")
        }
    }

    const item = {id: Date.now(), text: todos};

    items.push(item);

    input.value = '';
    /* console.log(items); */
    save(LOCAL_KEY,items)

    console.log(items);

    renderList()
}

function renderList () {
    const markup = items
    .map((item) => {
      return `
      <li>
      <span class="text">${item.text}</span>
      <div>
        <button type="button" data-id="${
          item.id
        }" class="delete">Видалити</button>
      </div>
      </li>
    `;
    })
    .join('');

    refs.list.innerHTML = markup;

}

 renderList();

 function onDeleteBtnClick(event) {
    if(event.target.nodeName !== 'BUTTON') {
        return;
    }
    const todosId = parseInt(event.target.dataset.id);

    items = items.filter((el) => el.id !== todosId);

    save(LOCAL_KEY, items);

    renderList();
 }


