class Task {
    constructor(description) {
        this.description = description;
    }
}

// Function to add a task to the list
function addTaskToList(task) {
    // Get the task list element
    const taskList = document.getElementById("taskList");

    // Create a new list item element
    const taskItem = document.createElement("li");

    // Create the outer div container for the checkbox and text
    const inputGroupDiv = document.createElement("div");
    inputGroupDiv.classList.add("input-group", "mb-3");

    // Create the div container for the checkbox
    const inputGroupTextDiv = document.createElement("div");
    inputGroupTextDiv.classList.add("input-group-text");

    // Create the checkbox element
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("form-check-input", "mt-0");

    // Add event listener to toggle text color on checkbox change
    checkbox.addEventListener("change", function(event) {
        this.parentNode.nextElementSibling.classList.toggle('text-success');
    });

    // Add the checkbox to the div container
    inputGroupTextDiv.appendChild(checkbox);

    // Create the text input field
    const textInput = document.createElement("input");
    textInput.type = "text";
    textInput.classList.add("form-control");
    textInput.value = task.description; // Set the task description

    // Add the text input field to the outer div container
    inputGroupDiv.appendChild(inputGroupTextDiv);
    inputGroupDiv.appendChild(textInput);

    // Add the outer div container to the task list
    taskItem.appendChild(inputGroupDiv);
    taskList.appendChild(taskItem);
}

// Add event listener to the form submission event
document.getElementById("taskForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    // Get the task input element and trim the value
    const taskInput = document.getElementById("taskInput");
    const taskDescription = taskInput.value.trim();

    // Check if the task description is not empty
    if (taskDescription !== "") {
        // Create a new Task object with the task description
        const newTask = new Task(taskDescription);

        // Add the task to the list
        addTaskToList(newTask);

        // Clear the task input field
        taskInput.value = "";
    }
});
