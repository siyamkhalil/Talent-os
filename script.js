document.addEventListener("DOMContentLoaded", () => {
  const candidateForm = document.getElementById("candidateForm");
  const candidateRows = document.getElementById("candidateRows");
  const searchBar = document.getElementById("searchBar");

  // Default Mock Data for Portfolio Presentation
  let applicants = [
    {
      id: 1,
      name: "Arsalan Khan",
      role: "Frontend Developer",
      score: 85,
      status: "Shortlisted",
    },
    {
      id: 2,
      name: "Ayesha Ahmed",
      role: "UI/UX Designer",
      score: 57,
      status: "Under Review",
    },
    {
      id: 3,
      name: "Zain Kabir",
      role: "Product Manager",
      score: 20,
      status: "Under Review",
    },
  ];

  // Core ATS Skillsets for Algorithm Simulation
  const keywords = {
    "Frontend Developer": [
      "javascript",
      "react",
      "css",
      "html",
      "git",
      "responsive",
      "typescript",
    ],
    "UI/UX Designer": [
      "figma",
      "wireframe",
      "prototype",
      "user research",
      "ui",
      "ux",
      "design system",
    ],
    "Product Manager": [
      "agile",
      "scrum",
      "roadmap",
      "product strategy",
      "metrics",
      "user stories",
    ],
  };

  // Render Function to Draw Table Rows Dynamically
  function renderTable(dataToRender) {
    candidateRows.innerHTML = "";

    if (dataToRender.length === 0) {
      candidateRows.innerHTML = `<tr><td colspan="5" style="text-align:center; color: var(--text-muted); padding: 20px;">No applicants found matching criteria.</td></tr>`;
      return;
    }

    dataToRender.forEach((applicant) => {
      // Pick color according to score range
      let scoreClass = "score-low";
      if (applicant.score >= 75) scoreClass = "score-high";
      else if (applicant.score >= 45) scoreClass = "score-mid";

      let statusClass =
        applicant.status === "Shortlisted"
          ? "status-shortlist"
          : "status-review";

      const row = document.createElement("tr");
      row.innerHTML = `
                <td><strong>${applicant.name}</strong></td>
                <td>${applicant.role}</td>
                <td><span class="score-indicator ${scoreClass}">${applicant.score}%</span></td>
                <td><span class="status-pill ${statusClass}">${applicant.status}</span></td>
                <td><button class="btn-delete" data-id="${applicant.id}">Remove</button></td>
            `;
      candidateRows.appendChild(row);
    });
  }

  // Form Event Listener to Process & Add New Candidates
  candidateForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("fullName").value.trim();
    const role = document.getElementById("jobRole").value;
    const resumeText = document
      .getElementById("resumePaste")
      .value.toLowerCase();

    // simulated ATS parsing algoritm
    const targetKeywords = keywords[role];
    let matchedCount = 0;

    targetKeywords.forEach((kw) => {
      if (resumeText.includes(kw)) {
        matchedCount++;
      }
    });

    const calculatedScore = Math.round(
      (matchedCount / targetKeywords.length) * 100,
    );
    const status = calculatedScore >= 70 ? "Shortlisted" : "Under Review";

    const newApplicant = {
      id: Date.now(), // Unique Timestamp ID
      name: name,
      role: role,
      score: calculatedScore,
      status: status,
    };

    applicants.push(newApplicant);
    renderTable(applicants);

    // Reset inputs smoothly
    candidateForm.reset();
  });

  // Live Client-Side Searching Event
  searchBar.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = applicants.filter((app) =>
      app.name.toLowerCase().includes(searchTerm),
    );
    renderTable(filtered);
  });

  // Event Delegation to Delete Candidate Record
  candidateRows.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-delete")) {
      const targetId = parseInt(e.target.getAttribute("data-id"), 10);
      applicants = applicants.filter((app) => app.id !== targetId);
      renderTable(applicants);
    }
  });

  // Boot execution
  renderTable(applicants);
});
