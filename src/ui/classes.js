const myform = document.getElementById('taskForm')
const className = document.getElementById('className')
const classDays = document.getElementById('classDays')
classDays.value = []
const startTime = document.getElementById('classStart')
const endTime = document.getElementById('classEnd')

const insertTask = (newData) => {
    fetch('http://localhost:5000/addCourse/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body:JSON.stringify(newData)
    })
    .then(resp => resp.json())
    .then(() => {
        getAllTaskData();
    })
    .catch(error => console.log(error))
}

const getAllTaskData = () => {
    fetch('http://localhost:5000/getCourse/', {
        method:'GET',
        headers: {
            'Content-Type':'application/json'
        }
    })
    .then(resp => resp.json())
    .then(data => renderArticles(data))
    .catch(error => console.log(error))
}

const deleteTaskData = (id) => {
    fetch(`http://localhost:5000/deleteCourse/${id}/`, {
        method: 'DELETE',
        headers: {
            'Content-Type':'application/json'
        }
    })
    getAllTaskData();
}

const getTestDataById = (id) => {
    fetch(`http://localhost:5000/getCourse/${id}/`, {
        method:'GET',  
        headers: {
            'Content-Type':'application/json'
        }      
    })
    .then(resp => resp.json())
    .then(data => {
        console.log(data['name'])
    })
}

function renderCalendar(mydata){
    const sunday700 = document.getElementById('sunday700')
    const monday700 = document.getElementById('monday700')
    const tuesday700 = document.getElementById('tuesday700')
    const wednesday700 = document.getElementById('wednesday700')
    const thursday700 = document.getElementById('thursday700')
    const friday700 = document.getElementById('friday700')
    const saturday700 = document.getElementById('saturday700')

    mydata.forEach(data => {
        name_ = mydata.name
        days_ = mydata.days
        console.log(days)
        startTime_ = mydata.start_time
        endTime_ = mydata.end_time

        //formula for number of divs needed:
        //end-start = ?XXX
        //separate ?XXX into ?X and XX (potential ten thousandths and thousands place vales / tenth and hundreths place values)
        //total_divs = 2(?X) + {1 if XX > 0}
        

        time_diff = endTime_ - startTime_


        var i, holder = {};
        for(i=0; i<time_diff; i++) {
            holder [n[i]] = '';//TODO
        }


    })
}

// function renderArticles(mydata) {
//     articles.innerHTML = '';
//     mydata.forEach(data => {
//         articles.innerHTML +=  `
//         <div class="card mb-3">
//             <h3 class="card-header">${data.name}</h3>
//             <div class="card-body">
//                 <h5 class="card-subtitle">${data.start_time} - ${data.end_time}</h5>
//                 <h6 class="card-subtitle text-muted">TIME LEFT</h6>
//             </div>
//             <div class="card-body">
//                 <p class="card-text">${data.days}</p>
//             </div>
//             <div class="card-body">
//                 <a href="#" class="card-link">OPTIONAL LINK</a>
//             </div>
//             <div class="card-footer text-muted">
//                 REPLACE WITH TIME DIF
//             </div>
//             <button type="button" class="btn btn-outline-primary" class="btn btn-primary" style='width:20%' onclick="getTestDataById(${data.id})">UPDATE TASK</button>
//             <button type="button" class="btn btn-outline-dark" class="btn btn-primary" style='width:20%' onclick="deleteTaskData(${data.id})">DELETE TASK</button>
//         </div>
//         `
//     })
// }

myform.addEventListener('submit', (e) => {
    if(className.value!=''&&startTime!=''&&endTime!=''&&classDays.value.length!=0){
        e.preventDefault();
        const newClass = {
            name:className.value,
            days:classDays.value,
            start_time:startTime.value,
            end_time:endTime.value
        }
        console.log(newClass);
        insertTask(newClass);
        myform.reset();
    } else {
        alert('Please enter all required information.');
    }
    
})

function dayPress(day) {
    if(!classDays.value.includes(day)){
       classDays.value.push(day) 
    } else {
        const index = classDays.value.indexOf(day);
        if (index > -1) {
            classDays.value.splice(index, 1);
        }               
    }
}


getAllTaskData()