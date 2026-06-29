const addNote = document.querySelector(".add-note-btn"); //Новая заметка
const sidebar = document.querySelector(".sidebar"); //Левый блок
const noteEditor = document.querySelector(".note-editor"); //Правый блок
const deleteBtn = document.querySelector(".delete-note-btn")

let notes = []; // массив заметок

let currentNoteId = null; //ID текущей заметки

addNote.addEventListener("click", function () {
  //Клик по кнопке новая заметка
  const note = {
    // заметка-объект
    id: Date.now(),
    title: "Заметка " + (notes.length + 1),
    text: "",
  };
  currentNoteId = note.id; //переопределяем данный ID
  notes.push(note); // отправляем объект в массив
  const newButton = document.createElement("button"); //создание кнопки
  newButton.textContent = "Без названия"; // название каждой отдельной кнопки
  sidebar.appendChild(newButton); // добавить кнопку в сайдбар
  newButton.classList.add("new-button"); // присвоение класса кнопке
  noteEditor.classList.remove("hidden");
  deleteBtn.classList.remove("hidden");// удаление класса текстового поля
  noteEditor.value = ""; // обнуление текста в текстовом поле
  newButton.id = note.id; //просваиваем кнопке id равный id объекта

  newButton.addEventListener("click", function () {//клик по кнопке заметка...
    const buttonId = this.id; //узнаем id кнопки
    const note = notes.find((n) => n.id == buttonId);//поиск объкта в масcиве с таким же id
    currentNoteId = buttonId; 
    console.log(note);
    noteEditor.value = note.text; //обновление текста в поле
    noteEditor.classList.remove("hidden");
  deleteBtn.classList.remove("hidden");
  });
  localStorage.setItem('notes', JSON.stringify(notes))
  console.log(currentNoteId);
});

noteEditor.addEventListener("input", function () {//прослушка на ввод
  const text = this.value; //узнаем введеный текст
  const note = notes.find((n) => n.id == currentNoteId);//поиск с таким же ID
  if (note) note.text = text; //проверка найденного текста
  const newButton = document.getElementById(currentNoteId);
  newButton.textContent = note.text;
  localStorage.setItem('notes', JSON.stringify(notes))

  console.log(note)
});

deleteBtn.addEventListener("click", function () {
  const newButton = document.getElementById(currentNoteId);
  console.log(newButton)
  newButton.remove();
  const index = notes.findIndex(n => n.id == currentNoteId);

// Если объект найден — удаляем
if (index !== -1) {
    notes.splice(index, 1); // удаляем 1 элемент по индексу
}
  console.log(notes)
  noteEditor.classList.add("hidden");
  deleteBtn.classList.add("hidden");
  localStorage.setItem('notes', JSON.stringify(notes));
})
const saved = localStorage.getItem('notes');
if (saved !== null) {
  notes = JSON.parse(saved);
}

console.log(notes);

if (notes.length > 0) {
  noteEditor.classList.remove("hidden");
  deleteBtn.classList.remove("hidden");
  notes.forEach(note => {
      const newButton = document.createElement("button");
      newButton.textContent = note.text;
      newButton.id = note.id; // привязываем ID
      newButton.classList.add("new-button");
      sidebar.appendChild(newButton);
      newButton.addEventListener("click", function () {//клик по кнопке заметка...
        const buttonId = this.id; //узнаем id кнопки
        const note = notes.find((n) => n.id == buttonId);//поиск объкта в масcиве с таким же id
        currentNoteId = buttonId; 
        console.log(note);
        noteEditor.value = note.text; //обновление текста в поле
        noteEditor.classList.remove("hidden");
      deleteBtn.classList.remove("hidden");
      });
      noteEditor.addEventListener("input", function () {//прослушка на ввод
  const text = this.value; //узнаем введеный текст
  const note = notes.find((n) => n.id == currentNoteId);//поиск с таким же ID
  if (note) note.text = text; //проверка найденного текста
  const newButton = document.getElementById(currentNoteId);
  newButton.textContent = note.text;
  console.log(note)
});
  });
}
