const { stat } = require("original-fs")

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
    .then(data => renderCalendar(data))
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

    mydata.forEach(data => {
        name_ = mydata.name
        days_ = mydata.days
        startTime_ = mydata.start_time
        endTime_ = mydata.end_time

        //formula for number of divs needed:
        //end-start = ?XXX
        //separate ?XXX into ?X and XX (potential ten thousandths and thousands place vales / tenth and hundreths place values)
        //total_divs = 2(?X) + {1 if XX > 0}
        

        time_diff = endTime_ - startTime_
        var digits = time_diff.toString().split('');
        var realDigits = digits.map(Number)
        
        time_diff = endTime_ - startTime_
        var digits = time_diff.toString().split('');
        var realDigits = digits.map(Number)


        if (realDigits.length == 3) {
            var hrs = realDigits.splice(0,1);
            var mins = realDigits.splice(0,3);
        } else if (realDigits.length == 4) {
            var hrs = realDigits.splice(0,2);
            var mins = realDigits.splice(0,4);
        }

        var numBoxes = 2*(hrs.join(""));
        if(mins[0] != 0) {
            numBoxes += 1;
        }

        console.log(numBoxes);
        console.log(startTime);

        //using the starttime, there will be two for each loops: one that maps through the days and one that maps through the numBoxes:
        //for each day and for each box, increment by 30 on starttime and create a document id from the day and time.
        days.forEach(day => {
            var parsedCurTime = parseInt(startTime.replace(':', ''));
            var parsedEndTime = parseInt(endTime.replace(':', ''));

            while(parsedCurTime!=parsedEndTime){
                var res = `${day}${parsedCurTime}`;  
                console.log(res);
                break;
            }
        })
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