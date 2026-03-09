// const { createElement } = require("react")

let interviewCountDashboard = []
let rejectedCountDashboard = []
let currentStatus = 'all'

let totalCount = document.querySelector("#total-count")
let interviewCount = document.querySelector("#interview-count")
let rejectedCount = document.querySelector("#rejected-count")
let cardContainer = document.querySelector("#card-container")
let countNumber = document.querySelector("#count-number")
let allFilter = document.querySelector("#all-filter")
let interviewFilter = document.querySelector("#interview-filter")
let rejectedFilter = document.querySelector("#rejected-filter")
let main = document.querySelector("#main")
let filteredCard = document.querySelector("#filtered-card")

main

function calculateCount() {
    totalCount.innerText = cardContainer.children.length;
    countNumber.innerText = cardContainer.children.length;
    interviewCount.innerText = interviewCountDashboard.length;
    rejectedCount.innerText = rejectedCountDashboard.length;

}
calculateCount()

function toggleBtn(id) {

    currentStatus = id;

    allFilter.classList.remove('bg-blue-500', 'text-white')
    interviewFilter.classList.remove('bg-blue-500', 'text-white')
    rejectedFilter.classList.remove('bg-blue-500', 'text-white')

    allFilter.classList.add('bg-gray-300', 'text-gray-700')
    interviewFilter.classList.add('bg-gray-300', 'text-gray-700')
    rejectedFilter.classList.add('bg-gray-300', 'text-gray-700')

    let selected = document.getElementById(id)
    selected.classList.remove('bg-gray-300', 'text-gray-700')
    selected.classList.add('bg-blue-500', 'text-white')

    countNumber.innerText = interviewCountDashboard.length;

    // if(id == 'interview-filter'){
    //     cardContainer.classList.add('hidden')
    //     filteredCard.classList.remove('hidden')
    //     countNumber.innerText = interviewCountDashboard.length;
    // }
    
    if(id == 'interview-filter'){
    cardContainer.classList.add('hidden')
    filteredCard.classList.remove('hidden')
    countNumber.innerText = interviewCountDashboard.length;
    showingInterview()
    }
    else if(id == 'all-filter'){
            cardContainer.classList.remove('hidden')
            filteredCard.classList.add('hidden')
            countNumber.innerText = cardContainer.children.length;
        }
    else if(id == 'rejected-filter'){
        cardContainer.classList.add('hidden')
        filteredCard.classList.remove('hidden')
        countNumber.innerText = rejectedCountDashboard.length;
        showingRejected()
    }


}


main.addEventListener('click', function (event) {

    if(event.target.classList.contains('button-interview')) {
        const parenNode = event.target.parentNode.parentNode.parentNode;
        let cardHeader = parenNode.querySelector('.card-header').innerText
        let cardSubHeader = parenNode.querySelector('.card-sub-title').innerText
        let jobLocation = parenNode.querySelector('.job-location').innerText
        let jobTiming = parenNode.querySelector('.job-timing').innerText
        let jobPayment = parenNode.querySelector('.job-payment').innerText
        let cardStatus = parenNode.querySelector('.card-status').innerText
        let cardDescription = parenNode.querySelector('.card-description').innerText
                parenNode.querySelector('.card-status').innerText = 'interview'


        let cardInfo = {
            cardHeader,
            cardSubHeader,
            jobLocation,
            jobTiming,
            jobPayment,
            cardStatus: 'interview',
            cardDescription
        }


        let cardExist = interviewCountDashboard.find(item => item.cardHeader == cardInfo.cardHeader)

        if (!cardExist) {
            interviewCountDashboard.push(cardInfo)
        }

        rejectedCountDashboard = rejectedCountDashboard.filter(item => item.cardHeader != cardInfo.cardHeader)
        if(currentStatus == 'interview-filter'){
            showingInterview() 
        } else if(currentStatus == 'rejected-filter'){
            showingRejected()
        }
        // showingInterview()
        calculateCount()
    }

        else if(event.target.classList.contains('button-rejected')) {
        const parenNode = event.target.parentNode.parentNode.parentNode;
        let cardHeader = parenNode.querySelector('.card-header').innerText
        let cardSubHeader = parenNode.querySelector('.card-sub-title').innerText
        let jobLocation = parenNode.querySelector('.job-location').innerText
        let jobTiming = parenNode.querySelector('.job-timing').innerText
        let jobPayment = parenNode.querySelector('.job-payment').innerText
        let cardStatus = parenNode.querySelector('.card-status').innerText
        let cardDescription = parenNode.querySelector('.card-description').innerText
        parenNode.querySelector('.card-status').innerText = 'rejected'


        let cardInfo = {
            cardHeader,
            cardSubHeader,
            jobLocation,
            jobTiming,
            jobPayment,
            cardStatus: 'rejected',
            cardDescription
        }


        let cardExist = rejectedCountDashboard.find(item => item.cardHeader == cardInfo.cardHeader)

        if (!cardExist) {
            rejectedCountDashboard.push(cardInfo)
        }
        interviewCountDashboard = interviewCountDashboard.filter(item => item.cardHeader != cardInfo.cardHeader)

        if(currentStatus == 'interview-filter'){
            showingInterview()
        } else if(currentStatus == 'rejected-filter'){
            showingRejected()
        }
        // showingRejected()
        calculateCount()
    }

})

function showingInterview(){
    filteredCard.innerHTML = ''

    for(let interView of interviewCountDashboard){             

        let div = document.createElement('div')
        div.className = 'bg-gray-100 p-4 rounded flex justify-between my-6'
        div.innerHTML = `
                            <div id="card-main">
                        <p class="card-header font-bold text-xl">${interView.cardHeader}</p>
                        <p class="card-sub-title text-gray-500 mb-2">${interView.cardSubHeader}</p>
                        <ul class="meta-description text-gray-500 my2 flex gap-3 ">
                            <li class="job-location">${interView.jobLocation}</li>
                            <li class="job-timing">${interView.jobTiming}</li>
                            <li class="job-payment">${interView.jobPayment}</li>
                        </ul>
                        <div class="card-status bg-gray-400 my-4 text-gray-800 py-2 px-4 w-30 rounded">${interView.cardStatus}</div>
                        <p class="card-description">${interView.cardDescription}</p>

                        <div id="card-buttons">
                            <button
                                class="button-interview mr-8 mt-4 bg-transparent text-green-500 font-semibold py-2 w-24 border border-green-500 rounded">interview</button>
                            <button
                                class="button-rejected bg-transparent text-red-500 font-semibold py-2 w-24 border border-red-500 rounded">rejected</button>
                        </div>

                    </div>
                    <div id="delete-btn">
                        <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
                    </div>
        `
        filteredCard.appendChild(div)
    }

}

function showingRejected(){
    filteredCard.innerHTML = ''

    for(let reject of rejectedCountDashboard){

        // console.log(interView)${interView.}
                


        let div = document.createElement('div')
        div.className = 'bg-gray-100 p-4 rounded flex justify-between my-6'
        div.innerHTML = `
                            <div id="card-main">
                        <p class="card-header font-bold text-xl">${reject.cardHeader}</p>
                        <p class="card-sub-title text-gray-500 mb-2">${reject.cardSubHeader}</p>
                        <ul class="meta-description text-gray-500 my2 flex gap-3 ">
                            <li class="job-location">${reject.jobLocation}</li>
                            <li class="job-timing">${reject.jobTiming}</li>
                            <li class="job-payment">${reject.jobPayment}</li>
                        </ul>
                        <div class="card-status bg-gray-400 my-4 text-gray-800 py-2 px-4 w-30 rounded">${reject.cardStatus}</div>
                        <p class="card-description">${reject.cardDescription}</p>

                        <div id="card-buttons">
                            <button
                                class="button-interview mr-8 mt-4 bg-transparent text-green-500 font-semibold py-2 w-24 border border-green-500 rounded">interview</button>
                            <button
                                class="button-rejected bg-transparent text-red-500 font-semibold py-2 w-24 border border-red-500 rounded">rejected</button>
                        </div>

                    </div>
                    <div id="delete-btn">
                        <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
                    </div>
        `
        filteredCard.appendChild(div)
    }

}