window.onload = () => {
    let inputText = document.getElementById('todo-input').value;
    let items = document.querySelectorAll('.todo-item');
    let removeButton = document.querySelectorAll('.todo-remove');

    changeBackgroundColors(items, removeButton);
    removeTodoItem(removeButton);
    changeFontStyle(items);
    enterKeyFunction(inputText);

    document.getElementById('todo-button').onclick = () => {
        addTodoItem();

        items = document.querySelectorAll('.todo-item');
        removeButton = document.querySelectorAll('.todo-remove');

        changeBackgroundColors(items, removeButton);
        removeTodoItem(removeButton);
        changeFontStyle(items);
    }
}

// ============ FUNCTIONS BELOW ============

const changeBackgroundColors = (items, removeButton) => {
    for (let i = 0; i < items.length; i++) {
        i % 2 === 0 ?
            items[i].style.backgroundColor = '#DEDEDE' :
            items[i].style.backgroundColor = '#CECECE';

        i % 2 === 0 ?
            removeButton[i].style.backgroundColor = '#DEDEDE' :
            removeButton[i].style.backgroundColor = '#CECECE';
    }
}

const changeFontStyle = (items) => {
    for (let i = 0; i < items.length; i++) {
        items[i].onclick = () => {
            let item = items[i].children.item(0);
            if (item.style.textDecoration === 'line-through') {
                item.style.color = '#000000';
                item.style.textDecoration = 'none';
            } else {
                item.style.color = '#FF0000';
                item.style.textDecoration = 'line-through';
            }
        }
    }
}

const removeTodoItem = (removeButton) => {
    for (let i = 0; i < removeButton.length; i++) {
        removeButton[i].onclick = () => {
            removeButton[i].parentNode.remove();

            //Trying to remove from database
            $.ajax({
                type: "POST",
                url: "removeFromDb.php",
                data: { data: removeButton[i].parentNode.children.item(0).innerHTML}
            });
        }
    }
}

const addTodoItem = () => {
    inputText = document.getElementById('todo-input').value;

    if (inputText.trim() === '') {
        alert('You must enter a todo item!');
        return;
    }

    //Trying to add to database
    $.ajax({
        type: "POST",
        url: "addToDb.php",
        data: { data: inputText}
    });

    let article = document.createElement('article');
    article.classList.add('todo-item');
    let p = document.createElement('p');
    p.innerText = inputText;
    let input = document.createElement('input');
    input.type = 'button';
    input.classList.add('todo-remove');
    input.value = 'X';

    article.append(p);
    article.append(input);

    document.querySelector('section')
        .appendChild(article);
    document.getElementById('todo-input').value = '';
}

const enterKeyFunction = (inputText) => {
    document.getElementById('todo-input').onkeyup = (event) => {
        inputText = document.getElementById('todo-input').value;
        if(event.key === 'Enter') { //Enter key
            document.getElementById('todo-button').click();
            document.getElementById('todo-input').value = '';
        }
    }
}
