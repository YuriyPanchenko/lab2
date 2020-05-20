'use strict'

const trainModel = new Train();
const ticketModel = new Ticket();
const passengerModel = new Passenger();
const soldTicketModel = new SoldTicket();


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
                "render": function (data, type, row) {
                    let trains = trainModel.Select();
                    let newTrains = trains.filter(train => train.id == data)
                    return newTrains[0].direction;
                },
                "targets": 1
            },
            {
                "render": function (data, type, row) {
                    let passangers = passengerModel.Select();
                    let newPassengers = passangers.filter(pass => pass.id == data)
                    return newPassengers[0].name + ' ' + newPassengers[0].surname;
                },
                "targets": 2
            },
            {
                "render": function (data, type, row) {
                    let tickets = ticketModel.Select();
                    let newTickets = tickets.filter(tick => tick.id == data)
                    return newTickets[0].number;
                },
                "targets": 3
            },
            {
                "render": function(data, type, row) {
                    return ''
                        + '<button type="button" value="delete" onclick="deleteItem(this)">Delete</button>'
                        + "\n"
                        + '<button type="button" value="update" onclick="updateItem(this)">Update</button>';
                },
                "targets": 5
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
