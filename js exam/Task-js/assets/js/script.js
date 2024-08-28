// Function to add a new task
function addbtn() {
    let addedtext = document.getElementById('addedtext').value.trim(); // Trim whitespace
    let date = document.getElementById('date').value; // Get date value

    if (addedtext === '' || date === '') {
        alert('PLEASE ADD A TASK AND DATE!');
    } else {
        alert('YOUR TASK IS SUCCESSFULLY SAVED');

        // Get existing tasks or initialize an empty array
        let alltask = JSON.parse(localStorage.getItem("task")) || [];
        // Add new task with text and date
        alltask.push({ text: addedtext, date: date });
        localStorage.setItem("task", JSON.stringify(alltask));

        // Clear input fields
        document.getElementById('addedtext').value = '';
        document.getElementById('date').value = '';

        viewtask(); // Refresh tasks display
    }
}

// Function to view all tasks
function viewtask() {
    let alltask = JSON.parse(localStorage.getItem("task")) || [];
    let taskContainer = document.getElementById('task');
    taskContainer.innerHTML = ''; // Clear previous content

    alltask.forEach((task, id) => {
        let taskCard = document.createElement('div');
        taskCard.className = 'card m-2 taskcard';
        taskCard.style.width = '18rem';

        taskCard.innerHTML = `
            <div class="card-body" style="border:2px solid #7dcea0; border-radius: 2px; ">
                <h5 class="card-title">Task ${id + 1}</h5>
                <p class="card-text">${task.text}</p>
                <p class="card-text">${task.date}</p> 
                <a href="#" class="btn text-white" style="background-color:red;" onclick="deletetask(${id})"><i class="fa-solid fa-trash"></i> Delete</a>
                <a href="#" class="btn btn-primary text-white" onclick="edittask(${id})"><i class="fa-solid fa-pen"></i> Edit</a>
            </div>
        `;

        taskContainer.appendChild(taskCard);
    });
}

// Function to delete a task
function deletetask(id) {
    alert('YOUR TASK IS DELETED!');

    let alltask = JSON.parse(localStorage.getItem("task"));
    alltask.splice(id, 1);
    localStorage.setItem("task", JSON.stringify(alltask));
    viewtask(); // Refresh tasks display after deletion
}

// Function to edit a task
function edittask(id) {
    let alltask = JSON.parse(localStorage.getItem("task")) || [];
    let editedText = prompt("Edit your task:", alltask[id].text);

    if (editedText !== null) {
        alltask[id].text = editedText.trim();
        localStorage.setItem("task", JSON.stringify(alltask));
        viewtask(); // Refresh tasks display after editing
    }
}

// Initial call to display existing tasks on page load
viewtask();
