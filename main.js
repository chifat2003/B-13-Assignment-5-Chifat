const cardContainer = document.getElementById('card-container');

async function loadIssues() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    displayIssues(data.data);
}

function displayIssues(issues) {
    issues.forEach(issue => {
        const isOpen = issue.status === 'open';


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
                    <h2>${issue.title}</h2>
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