//Fetching Task Data from Local Storage Function
function fetchTasks () {
    var tasks = JSON.parse(localStorage.getItem('tasks')); //retrive tasks from local storage and parse string results into JSON object
    var tasksList = document.getElementById('tasksList'); //retrive the reference to div with id tasksList
        tasksList.innerHTML = ''; //access div id tasksList's content by property innerHTML and set it to an empty string
        //for loop over the tasks elements and add the HTML output to tasksList.innerHTML 
        for ( var i = 0; i < tasks.length; i++ )  {
            var id = tasks[i].id;
            var desc = tasks[i].description;
            var priority = tasks[i].priority;
            var assignedTo = tasks[i].assignedTo;
            var status = tasks[i].status;

            tasksList.innerHTML +=  '<div class="well">'+
                                    '<h6> Tasks ID: ' + id + '</h6>'+
                                    '<p><span class="label label-info">' + status + '</span></p>'
                                    '<h3>' + desc + '</h3>' +
                                    '<p><span class="glyphicon glyphicon-time"></span> ' + priority +
                                    '<span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>' +
                                    '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\''+id+'\')">Close</a> ' + // Close button to set the task statu to closed and attaching the click event to the event handler method setStatusClosed
                                    '<a href="#" class="btn btn-danger" onclick="deleteTask(\''+id+'\')">Delete</a>' + //delete the current task item from local storage by bounding the click event to deletetask event handler function
                                    '</div>';
        }
}

//Attach an event handler to the submit event of the form 
document.getElementById('taskInputForm').addEventListener('submit', saveTask);

//Saving Task Data to Local Storage After Form Submit Function 
function saveTasks (e) {
    var taskId = chance.guid();//generate taskId by calling the function chance.guid() 
    
    //the input values from the form controls are retrived and stored in local variable  
    var taskDesc = document.getElementById('taskDescInput').value;
    var taskPriority = document.getElementById('taskPriInput').value;
    var taskAssigedTo = document.getElementById('taskAssigedToInput').value;
    var taskStatus = 'Open' 
    //new task object
    var task = {
        id: taskId,
        description: taskDesc,
        priority: taskPriority,
        assignedTo: taskAssignedTo,
        status: taskStatus
    }
    //the new task object is inserted into the task object in Local Storage
    if (localStorage.getItem('tasks') === null) {
        var tasks = [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
        var tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(task);
        localStorage.setItem('tasks'.JSON.stringify(tasks));
    }
    
    document.getElementById('taskInputForm').reset();//empty the form by using the reset()
    
    fetchTasks();//call it again to make sure the list output is re-generated and the new task item will be visible

    e.preventDefault();//execute it to avoid the default submission of the form is taking place
}

//Implementation of the setStatusClosed method function
function setStatusClosed (id) { //pass the current task id as a parameter
    var tasks = JSON.parse(localStorage.getItem('tasks')); //retrive the task items in JSON format and passing the result to JSON.parse() method

    for (var i; i < tasks.length; i++) {
        if (tasks[i].id == id) {
            tasks[i].status = "Closed";
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks)); //store the tasks items in tasks

    fetchTasks(); //Update the list output
}

//Implementation of the deleteTask event handler function
function deleteTask (id) { //pass the current task id as a parameter
    var tasks = JSON.parse(localStorage.getItem('tasks')); //retrive the task items in JSON format and passing the result yo JSON.parse() method

    for (var i; i < tasks.length; i++) {
        if (tasks[i].id == id) {
            tasks.splice(i, 1); //use splice method to delete the current item from the array tasks
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks)); //store the tasks items in tasks

    fetchTasks(); //Update the list output
}