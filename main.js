function fetchTask () {
    var tasks = JSON.parse(localStorage.getItem('tasks')); //retrive tasks from local storage and parse string results into JSON object
    var tasksList = document.getElementById('tasksList'); //retrive the reference to div with id tasksList
        tasksList.innerHTML = ''; //access div id tasksList's content by property innerHTML and set it to an empty string
        //for loop over the tasks elements and add the HTML output to tasksList.innerHTML 
        for ( var i = 0; i < tasks.length; i++ )  {
            var id = tasks[i].id;
            var desc = tasks[i].description;
            var priority = tasks[i].prioprity;
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