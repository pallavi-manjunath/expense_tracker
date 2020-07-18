// Initiliazation

// source of truth
const list = [
    {list_date:"2020-03-19T08:40:55.292Z",list_type:"cash",list_amount:2000},
];

// Mutable Data
let cash = 0;
let totalamt = 0;
let calc = 0;
let monthExpense = 0;

// Logic Defeinitions 
function getFormattedDate(isoDateString) {
    const some_date = new Date(isoDateString);
    const months =["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Nov","Dec"];
    const month=months[some_date.getMonth()];
    const day = some_date.getDate();
    const year = some_date.getFullYear();
    const hour =  some_date.getHours(), minutes = some_date.getMinutes();
    return day + "."+ month + "." + year + " " + hour + ":" + minutes;
}

function itemize(){
    
    const row_data = { 
        list_date: (new Date()).toISOString(),
        list_type: (document.getElementById("item_list").value).toLowerCase(),
        list_amount: parseInt(document.getElementById("inputAmt").value),
    }
    if(document.getElementById("inputAmt").value == ""){
        alert("Please enter amount");
    }
    else{
    list.push(row_data);
    updateHistoryListUI();
    updateOverviewUI();
    }
}

function updateHistoryListUI() {
    const history_list_ui = document.getElementById("history_list_items");
    
    // removing the complete list
    history_list_ui.innerHTML = "";

    // recreating the list here
    for(let i = 0; i < list.length; i++) {
        const row = history_list_ui.insertRow(i);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        cell1.innerHTML = getFormattedDate(list[i].list_date);
        cell2.innerHTML = list[i].list_type;
        if(list[i].list_type == "cash"){
            cell3.innerHTML = "+" + list[i].list_amount;
        }
        else{
            cell3.innerHTML = "-" + list[i].list_amount;
        }
    }
}

const getTodaysExpenditure = () => {
    const today = new Date();
    let total_expense = 0;
    const date = today.getDate().toString(), month = today.getMonth().toString();

    for(let i = 0; i < list.length; i++) {
        const some_day = new Date(list[i].list_date);
        const some_date = some_day.getDate().toString(), some_month = some_day.getMonth().toString();
        if(list[i].list_type !== 'cash' && (date+month === some_date+some_month)) {
            total_expense = total_expense + list[i].list_amount;
        }  
    }      
        return total_expense;
}; // return a integer

const getTotalCashAvailable = () => {
    let total_cash = 0;
    for(let i = 0; i < list.length; i++){
        if(list[i].list_type == 'cash'){
            total_cash = total_cash + list[i].list_amount;
        }
        else{
           total_cash = total_cash - list[i].list_amount; 
        }
    }
    return total_cash;
};


const getMonthlyExpenditure = () => {
    let total_month = 0;
    const today = new Date();
    const month = today.getMonth().toString();
    const year = today.getFullYear().toString();
    for(let i = 0; i < list.length; i++){
        const array_month = new Date(list[i].list_date);
        const some_month = array_month.getMonth().toString();
        const some_year = array_month.getFullYear().toString();
        if(list[i].list_type !== 'cash' && (month+year === some_month+some_year)){
            total_month = total_month + list[i].list_amount;
        }
    }
    return total_month;
};


function updateOverviewUI(){
    getTodaysExpenditure();
    document.getElementById("todays_expense").textContent = "Rs " + getTodaysExpenditure();
    document.getElementById("monthly_expense").textContent = "Rs " + getMonthlyExpenditure();
    document.getElementById("cash_available").textContent = "Rs " + getTotalCashAvailable();
};


// Starting of the UI render
updateOverviewUI();
updateHistoryListUI();

