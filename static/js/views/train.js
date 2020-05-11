'use strict'

const trainModel = new Train() // eslint-disable-line no-undef

function initAddForm () {
    const form = window.document.querySelector('#train-add-form')
    form.addEventListener('submit', function (e) {
        e.preventDefault()

        const formData = new FormData(e.target)
        const trainData = {}
        formData.forEach((value, key) => {
            trainData[key] = value
        })

        trainModel.Create(trainData)

        e.target.reset()
    })
}

function initList () {
    window.jQuery('#train-list').DataTable({
        data: trainModel.Select(),
        columns: [
            { title: 'ID', data: 'id' },
            { title: 'Direction', data: 'direction' },
            { title: 'Departure time', data: 'departureTime' },
            { title: 'Arrival time', data: 'arrivalTime'},
            { title: 'Delete', data: '' }
        ],
        columnDefs: [
            {
                "render": function(data, type, row) {
                    return '<button type="button" value="delete" onclick="deleteItem(this)">Delete</button>';
                },
                "targets": 4
            }
        ]
    })
}

function initListEvents () {
    document.addEventListener('trainsListDataChanged', function (e) {
        const dataTable = window.jQuery('#train-list').DataTable()

        dataTable.clear()
        dataTable.rows.add(e.detail)
        dataTable.draw()
    }, false)
}

function deleteItem(e) {
    let row = e.parentNode.parentNode;
    let id = row.getElementsByTagName('td')[0].innerText;
    row.remove();
    trainModel.Delete(id);
}

window.addEventListener('DOMContentLoaded', e => {
    initAddForm()
    initList()
    initListEvents()
})
