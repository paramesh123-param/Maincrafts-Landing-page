// =========================
// Contact Form Validation
// =========================

const form = document.getElementById("contactForm");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let message = document.getElementById("message").value.trim();

        if (name === "" || email === "" || message === "") {
            alert("Please fill in all fields.");
            return;
        }

        let submissions = JSON.parse(localStorage.getItem("submissions")) || [];

        let data = {
            name: name,
            email: email,
            message: message,
            date: new Date().toLocaleString()
        };

        submissions.push(data);

        localStorage.setItem("submissions", JSON.stringify(submissions));

        alert("Message Submitted Successfully!");

        form.reset();

        window.location.href = "submissions.html";

    });

}

// =========================
// Display Submissions
// =========================

function loadSubmissions() {

    let container = document.getElementById("submissionList");

    if (!container) return;

    let submissions = JSON.parse(localStorage.getItem("submissions")) || [];

    if (submissions.length === 0) {

        container.innerHTML =
        "<p style='text-align:center;'>No submissions available.</p>";

        return;
    }

    container.innerHTML = "";

    submissions.forEach(function(item, index){

        container.innerHTML += `

        <div class="submission-card">

            <h3>${item.name}</h3>

            <p><strong>Email:</strong> ${item.email}</p>

            <p><strong>Message:</strong> ${item.message}</p>

            <p><strong>Date:</strong> ${item.date}</p>

            <button onclick="deleteSubmission(${index})">
                Delete
            </button>

        </div>

        `;

    });

}

loadSubmissions();

// =========================
// Delete One Submission
// =========================

function deleteSubmission(index){

    let submissions = JSON.parse(localStorage.getItem("submissions")) || [];

    submissions.splice(index,1);

    localStorage.setItem("submissions",JSON.stringify(submissions));

    loadSubmissions();

}

// =========================
// Clear All Submissions
// =========================

function clearAll(){

    if(confirm("Are you sure you want to delete all submissions?")){

        localStorage.removeItem("submissions");

        loadSubmissions();

    }

}
