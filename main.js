
const cardContainer = document.getElementById('card-container');
const totalCount = document.getElementById('total-count');
let loadingSpinner = document.querySelector("#loading")


let allFilterBtn = document.querySelector("#all-filter-btn")
let openFilterBtn = document.querySelector("#open-filter-btn")
let closedFilterBtn = document.querySelector("#closed-filter-btn")
let filteredCard = document.querySelector("#filtered-card")


let issueModal = document.querySelector("#issueModal");
let modalTitle = document.querySelector("#modalTitle");
let modalAuthor = document.querySelector("#modalAuthor");
let modalDate = document.querySelector("#modalDate");
let modalDescription = document.querySelector("#modalDescription");
let modalAssignee = document.querySelector("#modalAssignee");
let modalPriority = document.querySelector("#modalPriority");
let label1 = document.querySelector("#label1");
let label2 = document.querySelector("#label2");

let allIssues = [];





function toggleBtn(id) {

    currentStatus = id;

    allFilterBtn.classList.remove('btn-primary')
    openFilterBtn.classList.remove('btn-primary')
    closedFilterBtn.classList.remove('btn-primary')

    allFilterBtn.classList.add('btn-soft')
    openFilterBtn.classList.add('btn-soft')
    closedFilterBtn.classList.add('btn-soft')

    let selected = document.getElementById(id)
    selected.classList.remove('btn-soft')
    selected.classList.add('btn-primary')

    // countNumber.innerText = interviewCountDashboard.length;

    
    
    if (id == 'open-filter-btn') {
        const filtered = allIssues.filter(issue => issue.status === 'open');
        displayIssues(filtered);
    }
    else if (id == 'all-filter-btn') {
        displayIssues(allIssues);
    }
    else if (id == 'closed-filter-btn') {
        const filtered = allIssues.filter(issue => issue.status === 'closed');
        displayIssues(filtered);
    }
}


async function loadIssues() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    // displayIssues(data.data);
    allIssues = data.data;
    displayIssues(allIssues);
    loadingSpinner.classList.add('hidden');
    

}

function displayIssues(issues) {
    cardContainer.innerHTML = '';
    totalCount.textContent = issues.length;
    issues.forEach(issue => {
        const isOpen = issue.status === 'open';
        // console.log(issues.length);

        let borderColor;
        let iconClass;

        if (isOpen) {
            borderColor = 'border-green-600';
            iconClass = 'fa-regular fa-circle text-green-600';
        } else {
            borderColor = 'border-purple-800';
            iconClass = 'fa-regular fa-circle-check text-purple-800';
        }



        let priorityClass;
        if (issue.priority === 'high') {
            priorityClass = 'bg-red-300 text-gray-600';
        } else if (issue.priority === 'medium') {
            priorityClass = 'bg-yellow-200 text-gray-600';
        } else if (issue.priority === 'low') {
            priorityClass = 'bg-purple-300 text-gray-600';
        } else {
            priorityClass = 'bg-gray-200 text-gray-600';
        }



        const labelsHTML = (issue.labels || []).map(label =>
            `<span class="bg-blue-200 text-blue-800 text-xs font-medium px-2 py-1 rounded-3xl">${label}</span>`
        ).join('');

        const date = new Date(issue.createdAt).toLocaleDateString();

        const card = document.createElement('div');
        card.className = `card border-t-3 ${borderColor} rounded-lg shadow-sm bg-white`;

        card.innerHTML = `
            <div class="m-4 space-y-2">
                <div class="flex justify-between">
                    <i class="${iconClass}"></i>
                    <span class="${priorityClass} rounded-3xl px-4 text-sm">${issue.priority}</span>
                </div>

                <div class="font-semibold text-lg mt-2 space-y-2">
                    <h2 onclick="openModal(${issue.id})">${issue.title}</h2>
                    <p class="font-normal text-sm line-clamp-2">${issue.description || ''}</p>
                </div>

                <div class="flex gap-2 mt-2 flex-wrap">
                    ${labelsHTML}
                </div>
            </div>
            <hr class="opacity-20">
            <div class="m-4 text-sm text-gray-500 space-y-3">
                <p>#${issue.id} by ${issue.author}</p>
                <p>${date}</p>
            </div>
        `;

        cardContainer.appendChild(card);
    });
}


loadIssues();


async function openModal(id) {
    issueModal.showModal();
    // console.log("Modal opened for issue:", id);

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const data = await res.json();
    const modalData = data.data;
    // console.log(modalData);


    modalTitle.textContent = modalData.title;
    modalAuthor.textContent = `Opened by ${modalData.author}`;
    modalDate.textContent = new Date(modalData.createdAt).toLocaleDateString();
    modalDescription.textContent = modalData.description;
    modalAssignee.textContent = modalData.assignee;
    modalPriority.textContent = modalData.priority;

    label1.textContent = modalData.labels?.[0] ?? '';
    label2.textContent = modalData.labels?.[1] ?? '';
}