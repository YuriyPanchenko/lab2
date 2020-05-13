'use strict'

const soldTicketModel = new SoldTicket() // eslint-disable-line no-undef

function initAddForm () {
    const form = window.document.querySelector('#soldTicket-add-form')
    form.addEventListener('submit', function (e) {
        e.preventDefault()

        const formData = new FormData(e.target)
        const soldTicketData = {}
        formData.forEach((value, key) => {
            soldTicketData[key] = value
        })

        let hiddenInput = document.getElementById('update-item');
        if(hiddenInput.value) {
            soldTicketModel.Update(soldTicketData);
            let createButton = document.getElementById('btn-create');
            let updateButton = document.getElementById('btn-update');
            createButton.classList.remove('btn-hidden');
            updateButton.classList.add('btn-hidden');
            let hiddenInput = document.getElementById('update-item');
            hiddenInput.value = '';
        }
        else {
            soldTicketModel.Create(soldTicketData);
        }

        e.target.reset()
    })
}

function initList () {
    window.jQuery('#soldTicket-list').DataTable({
        data: soldTicketModel.Select(),
        columns: [
            { title: 'ID', data: 'id' },
            { title: 'train', data: 'train' },
            { title: 'passenger', data: 'passenger' },
            { title: 'ticket', data: 'ticket' },
            { title: 'date', data: 'date' },
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
                "targets": 6
            }
        ]
    })
}

function initListEvents () {
    document.addEventListener('soldTicketsListDataChanged', function (e) {
        const dataTable = window.jQuery('#soldTicket-list').DataTable()

        dataTable.clear()
        dataTable.rows.add(e.detail)
        dataTable.draw()
    }, false)
}

function deleteItem(e) {
    let row = e.parentNode.parentNode;
    let id = row.getElementsByTagName('td')[0].innerText;
    row.remove();
    soldTicketModel.Delete(id);
}

function updateItem(e) {
    let row = e.parentNode.parentNode;
    let id = row.getElementsByTagName('td')[0].innerText;
    let obj = soldTicketModel.FindById(parseInt(id));
    document.getElementById('train').value = obj.train;
    document.getElementById('passenger').value = obj.passenger;
    document.getElementById('ticket').value = obj.ticket;
    document.getElementById('date').value = obj.date;
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
