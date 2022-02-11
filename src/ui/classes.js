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
        parsedStartTime = parseInt(data.start_time.replace(':', ''));
        parsedEndTime = parseInt(data.end_time.replace(':', ''));

        //TODO:
        //so first calc the literal difference between end and start
        //smooth both values
        //if parsedCurTime[:secondHalf] > 00:    
        //save the difference between it and the nearest 100 up in a variable and copy the parsedCurTime and round it up
        //if parsedEndTime[:secondHalf] > 00:
        //save the difference between it and the nearest 100 down in a separate varaiable and copy the parsedEndTimen and round it down

        //use the below to get that smoothed space defined
        days_.forEach(day => {
            parsedCurTime = parseInt(data.start_time.replace(':', ''));
            while(parsedCurTime!=parsedEndTime){
                var res = `${day}${parsedCurTime}`;
                document.getElementById(res).style.backgroundColor = 'red';
                if (String(parsedCurTime).slice(-2) == 30){
                    parsedCurTime+=70;
                } else{
                    parsedCurTime+=30;   
                }
            }
        })     
        //once the smoothed space is defined, calculate the before box

        //get the og parsedCurTime and look for the box for the 100 rounded down
        //figure out what percentage of 100 the minutes difference equates to (out of 60 to 100 formula)

        //replace the prior element with a new element using `` in js that has a height of that percentage
        //      ** might make the new border clear, so if thats the case either make it black or make all others clear when i switch them

        //repeat for the end time       
    })
}

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