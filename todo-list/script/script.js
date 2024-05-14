const localStorageKey = "tarefa-key";

document.addEventListener("DOMContentLoaded", () => {
    initializeLocalStorage();

    const form = document.getElementById('form');
    const listaTarefas = document.getElementById('tarefas');

    function addTarefa(tituloTarefa, descTarefa) {
        const tarefa = {
            titulo: tituloTarefa,
            desc: descTarefa
        };

        let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
        tarefas.push(tarefa);
        localStorage.setItem('tarefas', JSON.stringify(tarefas));

        displayTarefa();
    }

    function displayTarefa() {
        listaTarefas.innerHTML = '';

        const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

        tarefas.forEach(tarefa => {
            const li = document.createElement('li');
            const titulo = document.createElement('h3');
            titulo.textContent = `${tarefa.titulo}`;
            
            const descri = document.createElement('p');
            descri.textContent = `${tarefa.desc}`;
            li.appendChild(titulo);
            li.appendChild(descri);
            listaTarefas.appendChild(li);
        });
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const tituloTarefa = document.getElementById('tituloTarefa').value;
        const descTarefa = document.getElementById('texto').value;

        addTarefa(tituloTarefa, descTarefa);
        form.reset();
    });
});

function formatDate(date) {
    const formattedDate = new Intl.DateTimeFormat("pt-BR", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    }).format(date);

    return formattedDate;
}

function initializeLocalStorage() {
    const localStorageValue = localStorage.getItem(localStorageKey);
    const currentDate = new Date();
    if (!localStorageValue) {
        const newValue = {
            count: 1,
            lastVisit: formatDate(currentDate)
        };

        const stringedValue = JSON.stringify(newValue);
        localStorage.setItem(localStorageKey, stringedValue);
    }

    const lsValueObj = JSON.parse(localStorageValue);

    lsValueObj.count++;
    lsValueObj.lastVisit = formatDate(currentDate);

    localStorage.setItem(localStorageKey, JSON.stringify(lsValueObj));

    const footer = document.querySelector('footer');
    const p = document.createElement('p');

    p.textContent = `Esta página foi visitada ${lsValueObj.count} vezes. A última visita foi: ${lsValueObj.lastVisit}`;
    footer.appendChild(p);
}
