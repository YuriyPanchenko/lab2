'use strict'

const ticketModel = new Ticket() // eslint-disable-line no-undef

function initAddForm () {
    const form = window.document.querySelector('#ticket-add-form')
    form.addEventListener('submit', function (e) {
        e.preventDefault()

        const formData = new FormData(e.target)
        const ticketData = {}
        formData.forEach((value, key) => {
            ticketData[key] = value
        })

        let hiddenInput = document.getElementById('update-item');
        if(hiddenInput.value) {
            ticketModel.Update(ticketData);
            let createButton = document.getElementById('btn-create');
            let updateButton = document.getElementById('btn-update');
            createButton.classList.remove('btn-hidden');
            updateButton.classList.add('btn-hidden');
            let hiddenInput = document.getElementById('update-item');
            hiddenInput.value = '';
        }
        else {
            ticketModel.Create(ticketData);
        }

        e.target.reset()
    })
}

function initList () {
    window.jQuery('#ticket-list').DataTable({
        data: ticketModel.Select(),
        columns: [
            { title: 'ID', data: 'id' },
            { title: 'number', data: 'number' },
            { title: 'price', data: 'price' },
            { title: 'Action', data: '' }
        ],
        columnDefs: [
            {
                "render": function(data, type, row) {
                    return ''
                        + '<button type="button" value="delete" onclick="deleteItem(this)">Delete</button>'
                        + "\n"
                        + '<button type="button" value="update" onclick="updateItem(this)">Update</button>';
                },
                "targets": 3
            }
        ]
    })
}

function initListEvents () {
    document.addEventListener('ticketsListDataChanged', function (e) {
        const dataTable = window.jQuery('#ticket-list').DataTable()

        dataTable.clear()
        dataTable.rows.add(e.detail)
        dataTable.draw()
    }, false)
}

function deleteItem(e) {
    let row = e.parentNode.parentNode;
    let id = row.getElementsByTagName('td')[0].innerText;
    row.remove();
    ticketModel.Delete(id);
}

function updateItem(e) {
    let row = e.parentNode.parentNode;
    let id = row.getElementsByTagName('td')[0].innerText;
    let obj = ticketModel.FindById(parseInt(id));
    document.getElementById('number').value = obj.number;
    document.getElementById('price').value = obj.price;
    let createButton = document.getElementById('btn-create');
    let updateButton = document.getElementById('btn-update');
    createButton.classList.add('btn-hidden');
    updateButton.classList.remove('btn-hidden');
    let hiddenInput = document.getElementById('update-item');
    hiddenInput.value = obj.id;
}

window.addEventListener('DOMContentLoaded', e => {
    initAddForm()
    initList()
    initListEvents()
})
