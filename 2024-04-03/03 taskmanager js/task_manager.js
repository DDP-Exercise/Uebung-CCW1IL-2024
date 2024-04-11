class Task {
    constructor(description, author, completeStatus) {
    // Define description in class
        this.description = description;
        this.author = author;
        this.completeStatus = completeStatus;
    }
}

// Function to add a task to the list
function addTaskToList(task) {
    // Get the task list element
    const taskList = document.getElementById('taskList');

    // Create a new list item element
    const taskItem = document.createElement('li');

    // Create the outer div container for the checkbox and text
    const inputGroupDiv = document.createElement('div');
    inputGroupDiv.classList.add('input-group', 'mb-3');

    // Create the div container for the checkbox
    const inputGroupTextDiv = document.createElement('div');
    inputGroupTextDiv.classList.add('input-group-text');

    // Create the checkbox element
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('form-check-input', 'mt-0');

    // Add event listener to toggle text color on checkbox change
    checkbox.addEventListener('change', function () {
        this.parentNode.nextElementSibling.classList.toggle('text-success');
        console.info(this, this.parentNode, this.parentNode.nextElementSibling, this.parentNode.nextSibling)
    })

    // Add the checkbox to the div container
    inputGroupTextDiv.appendChild(checkbox);

    // Create the text input field
    const descriptionInput = document.createElement('input');
    descriptionInput.type = 'text';
    descriptionInput.classList.add('form-control');
    descriptionInput.value = task.description; // Set the task description

    // Add the text input field to the outer div container
    console.info('inputGroupDiv', inputGroupDiv)
    console.info('descriptionInput', descriptionInput)
    inputGroupDiv.appendChild(inputGroupTextDiv);
    inputGroupDiv.appendChild(descriptionInput);


    // Add the outer div container to the task list
    console.info('taskItem', taskItem)
    console.info('taskList', taskList)
    taskItem.appendChild(inputGroupDiv)
    taskList.appendChild(taskItem)
}

// Add event listener to the form submission event
document.getElementById("taskForm").addEventListener("submit", function(event) {
     // Prevent form submission
    event.preventDefault();

    // Get the task input element and trim the value
    const taskInput = document.getElementById('taskInput');
    console.info('taskInput', taskInput)
    const taskDescription = taskInput.value.trim();
    console.info('taskDescription', taskDescription)

    // Check if the task description is not empty
    if(taskDescription !== "") {
        // Create a new Task object with the task description
        const newTask = new Task(taskDescription, 'Rebecca', false);
        console.info('newTask', newTask)
        // Add the task to the list
        addTaskToList(newTask);
        // Clear the task input field
        taskInput.value = "";
    }
});
