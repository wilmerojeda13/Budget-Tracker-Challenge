let db;
const request = indexedDB.open('budget_tracker', 1);

// this event will avoid if the database version changes
request.onupgradeneeded = function(event) {
    //save reference to the database
    const db = event.target.result;
    db.createObjectStore('new_budget', {autoIncrement: true});
};

request.onsuccess = function (event) {
    db = event.target.result;

    //check if the app is online
    if(navigator.onLine) {
        uploadBudget();
    }
};

request.onerror = function (event) {
    console.log('Error' + event.target.errorCode);
};

// this function will be executed attempting new budget event even with not internet connection
function saveRecord(record) {
    const transaction = db.transaction(['new_budget'], "readwrite");

    //accesing  the object store to new_budget
    const store = transaction.objectStore('new_budget');

    // add record to store with add method
    store.add(record);
}

function uploadBudget() {
    //open a transaction on db for the new_budget
    const transaction = db.transaction(["new_budget"], "readwrite");

    //accessing to an object store
    const store = transaction.objectStore("new_budget");

    //get all records from the store
    const getAll = store.getAll = store.getAll();

    getAll.onsuccess = function() {
        if (getAll.result.length > 0) {
            fetch('/api/transaction/bulk', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain, */*,',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(() => {
                //delete records
                const transaction = db.transaction(['new_budget'], 'readwrite');
                const store = transaction.objectStore('new_budget');
                store.clear();
            })
        }
    };
}
function deleteTransaction() {
    const transaction = db.transaction(['new_budget'], 'readwrite');
    const store = transaction.objectStore('new_budget');
    store.clear();
}

//Listen to app online
window.addEventListener('online', uploadBudget);