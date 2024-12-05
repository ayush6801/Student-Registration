function addStudent()
{
    const studentName = document.getElementById('sname').value;
    const studentId = document.getElementById('sid').value;
    const studentEmail = document.getElementById('semail').value;
    const contactNumber = document.getElementById('cnumber').value;

    if (studentName && studentId && studentEmail && contactNumber) {
        const tableBody = document.getElementById('tbody');
        const newRow = document.createElement('tr');

        newRow.innerHTML = `
            <td class="border border-gray-300 px-4 py-2">${studentName}</td>
            <td class="border border-gray-300  px-4 py-2">${studentId}</td>
            <td class="border border-gray-300 px-4 py-2">${studentEmail}</td>
            <td class="border border-gray-300 px-4 py-2">${contactNumber}</td>
            <td class="border border-gray-300 px-4 py-2">
                <button onclick="editRow(this)" class="edit">Edit</button>
                <button onclick="deleteRow(this)" class="delete">Delete</button>
            </td>
        `;

        tableBody.appendChild(newRow);
        addtoLocalstorage();
        document.getElementById('studentform').reset();

    } else {
        alert("Please fill in all fields.");
    }
}
function addtoLocalstorage()
{
    const tableRows = document.querySelectorAll("#tbody tr");
            const tableData = [];

            tableRows.forEach(row => {
                const rowData = {
                    name: row.cells[0].textContent,
                    id: row.cells[1].textContent,
                    class: row.cells[2].textContent,
                    roll: row.cells[3].textContent,
                };
                tableData.push(rowData);
            });

            localStorage.setItem('studentData', JSON.stringify(tableData));

}
function loadDataFromLocalStorage() {
    const storedData = localStorage.getItem('studentData');
    if (storedData) {
        const tableData = JSON.parse(storedData);
        const tableBody = document.getElementById('tbody');
        
        tableData.forEach(data => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td class="border border-gray-300 px-4 py-2">${data.name}</td>
                <td class="border border-gray-300 px-4 py-2">${data.id}</td>
                <td class="border border-gray-300 px-4 py-2">${data.class}</td>
                <td class="border border-gray-300 px-4 py-2">${data.roll}</td>
                <td class="border border-gray-300 px-4 py-2">
                    <button onclick="editRow(this)" class="edit">Edit</button>
                    <button onclick="deleteRow(this)" class="delete">Delete</button>
                </td>
            `;
            tableBody.appendChild(newRow);
        });
    }
}
function editRow(button) {
    const row = button.parentElement.parentElement;
    const cells = row.cells;

    document.getElementById('sname').value = cells[0].textContent;
    document.getElementById('sid').value = cells[1].textContent;
    document.getElementById('semail').value = cells[2].textContent;
    document.getElementById('cnumber').value = cells[3].textContent;

    row.remove();
}

function deleteRow(button) {
    const row = button.parentElement.parentElement;
    row.remove();
    addtoLocalstorage();
}

window.onload = function() {
    loadDataFromLocalStorage();
};

