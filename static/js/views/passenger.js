'use strict'

const passengerModel = new Passenger() // eslint-disable-line no-undef

function initAddForm () {
    const form = window.document.querySelector('#passenger-add-form')
    form.addEventListener('submit', function (e) {
        e.preventDefault()

        const formData = new FormData(e.target)
        const passangerData = {}
        formData.forEach((value, key) => {
            passangerData[key] = value
        })

        passengerModel.Create(passangerData)

        e.target.reset()
    })
}

function initList () {
    window.jQuery('#passenger-list').DataTable({
        data: passengerModel.Select(),
        columns: [
            { title: 'ID', data: 'id' },
            { title: 'Name', data: 'name' },
            { title: 'Surname', data: 'surname' },
            { title: 'Passport number', data: 'passportNumber'}
        ]
    })
}

function initListEvents () {
    document.addEventListener('passengersListDataChanged', function (e) {
        const dataTable = window.jQuery('#passenger-list').DataTable()

        dataTable.clear()
        dataTable.rows.add(e.detail)
        dataTable.draw()
    }, false)
}

window.addEventListener('DOMContentLoaded', e => {
    initAddForm()
    initList()
    initListEvents()
})
