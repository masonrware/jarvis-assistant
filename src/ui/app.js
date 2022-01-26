const myform = document.getElementById('taskForm')
const title = document.getElementById('taskName')
const body = document.getElementById('taskDescription')

const articles = document.getElementById('articles')

const insertData = (newData) => {
    fetch('http://localhost:5000/add', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body:JSON.stringify(newData)
    })
    .then(resp => resp.json())
    .then((data) => {
        console.log(data)
    })
    .catch(error => console.log(error))
}

const getAllData = () => {
    fetch('http://localhost:5000/get', {
        method:'GET',
        headers: {
            'Content-Type':'application/json'
        }
    })
    .then(resp => resp.json())
    .then(data => renderArticles(data))
    .catch(error => console.log(error))
}

function renderArticles(mydata) {
    articles.innerHTML = '';
    mydata.forEach(data => {
        articles.innerHTML +=  `
        <div class="card mb-3">
            <h3 class="card-header">${data.title}</h3>
            <div class="card-body">
                <h5 class="card-title">DUE DATE</h5>
                <h6 class="card-subtitle text-muted">TIME LEFT</h6>
            </div>
            <div class="card-body">
                <p class="card-text">${data.body}</p>
            </div>
            <div class="card-body">
                <a href="#" class="card-link">OPTIONAL LINK</a>
            </div>
            <div class="card-footer text-muted">
                REPLACE WITH TIME DIF
            </div>
            <button type="button" class="btn btn-outline-primary" class="btn btn-primary">UPDATE TASK</button>
            <button type="button" class="btn btn-outline-dark" class="btn btn-primary">DELETE TASK</button>
        </div>
        `
    })
}


myform.addEventListener('submit', (e) => {
    if(title.value!=''&&body.value!=''){
        e.preventDefault()
        const newData = {
            title:title.value,
            body:body.value
        }
        insertData(newData);
    } else {
        alert('Please enter a title or description')
    }
})

getAllData()