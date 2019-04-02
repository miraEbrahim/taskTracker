//Fetching Task Data from Local Storage Function
function fetchTask () {
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
                                    '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\''+id+'\')">Close</a> ' +
                                    '<a href="#" class="btn btn-danger" onclick="deleteTask(\''+id+'\')">Delete</a>' +
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