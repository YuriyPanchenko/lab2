class SoldTicket extends BaseModel { // eslint-disable-line no-unused-vars, no-undef
    constructor () {
        super('soldTickets')
        this.fields = this.fields.concat(['train', 'ticket', 'passenger', 'date'])
    }
}
