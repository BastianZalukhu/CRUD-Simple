var selectedRow = null;


// Clear fields 
function ClearFields() {
    document.querySelector("#firstName").value = "";
    document.querySelector("#lastName").value = "";
    document.querySelector("#rolNo").value = "";
}

// Add data 
document.querySelector("#student-form").addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form values 
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const rolNo = document.querySelector("#rolNo").value;

    // Validate 
    if (firstName == "" || lastName == "" || rolNo == "") {
        showAlert("Please fill all the fields", "danger");
    } else {
        if (selectedRow == null) {
            const list = document.querySelector("#student-list");
            const row = document.querySelector("tr");

            row.innerHTML = `
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${rolNo}</td>
                <td>
                <a href="#" class="btn btn-warning btn-sm edit" style="text-decoration: none;">Edit</a>
                <a href="#" class="btn btn-danger btn-sm delete" style="text-decoration: none;">Delete</a>
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlert("Student Added", "success");
        }
        else {
            selectedRow.children[0].textContent = firstName;
            selectedRow.children[1].textContent = lastName;
            selectedRow.children[2].textContent = rolNo;
            selectedRow = null;
            showAlert("Student info edited", "info");
        }
        ClearFields();

    }
});

// Edit data 
document.querySelector("#student-list").addEventListener("click", (e) => {
    target = e.target;
    if(target.classList.contains("edit")) {
        selectedRow = target.parentElement.parentElement
        document.querySelector("#firstName").value = selectedRow.children[0].textContent;
        document.querySelector("#lastName").value = selectedRow.children[1].textContent;
        document.querySelector("#rolNo").value = selectedRow.children[2].textContent; 
    };
});


// Show Alert 
function showAlert(message, className) {
    console.log("showAlert called with message:", message); // Debug
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");

    // Ensure the container exists and insert the alert at the top of the container
    if (container) {
        container.insertBefore(div, container.firstChild);
        console.log("Alert inserted into DOM"); // Debug
    } else {
        console.log("Container element not found"); // Debug
    }

    setTimeout(() => {
        const alert = document.querySelector(".alert");
        if (alert) {
            alert.remove();
            console.log("Alert removed from DOM"); // Debug
        }
    }, 3000);
}

// Delete Data 
document.querySelector("#student-list").addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("delete")) {
        console.log("Delete button clicked"); // Debug
        target.parentElement.parentElement.remove();
        showAlert("Student Data Deleted", "danger");
    }
});
