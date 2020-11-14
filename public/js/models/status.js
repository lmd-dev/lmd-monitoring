/**
 * Status model
 */
class Status {
    /**
     * Cosntructor
     * @param date
     * @param status
     */
    constructor(date = new Date(), status = true) {
        this._date = date;
        this._state = status;
    }
    get date() { return this._date; }
    set date(value) { this._date = value; }
    get state() { return this._state; }
    set state(value) { this._state = value; }
}
//# sourceMappingURL=status.js.map