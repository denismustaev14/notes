const addNote = document.querySelector(".add-note-btn") //Новая заметка
const sidebar = document.querySelector('.sidebar') //Левый блок
const noteEditor = document.querySelector('.note-editor') //Правый блок

let notes = []// массив заметок

let currentNoteId = null; //ID текущей заметки

addNote.addEventListener("click", function(){ //Клик по кнопке новая заметка
    const note = { // заметка-объект
        id: Date.now(), 
        title: "Заметка " + (notes.length + 1),
        text: "",
    }
    currentNoteId = note.id //переопределяем данный ID
    notes.push(note); // отправляем объект в массив
    const newButton = document.createElement("button") //создание кнопки
    newButton.textContent = note.title;// название каждой отдельной кнопки 
    sidebar.appendChild(newButton);// добавить кнопку в сайдбар
    newButton.classList.add("new-button")// присвоение класса кнопке
    noteEditor.classList.remove("hidden")// удаление класса текстового поля
    noteEditor.value = ""// обнуление текста в текстовом поле 
    newButton.id = note.id; //просваиваем кнопке id равный id объекта  
    console.log(notes)

    newButton.addEventListener("click", function(){//клик по кнопке заметка...
        const buttonId = this.id;//узнаем id кнопки
        const note = notes.find(n => n.id == buttonId);
        currentNoteId = buttonId; //поиск объкта в масcиве с таким же id
        console.log(note)
        noteEditor.value = note.text //обновление текста в поле
        console.log(currentNoteId)
        
    })
    console.log(currentNoteId)
})

noteEditor.addEventListener("input", function() {//прослушка на ввод
    const text = this.value;//узнаем введеный текст
    const note = notes.find(n => n.id == currentNoteId);//поиск с таким же ID
    if (note) note.text = text; //проверка найденного текста 
});