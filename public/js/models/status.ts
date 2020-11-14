/**
 * Status model
 */
class Status
{
    //Date of the status
    private _date: Date;
    public get date(): Date { return this._date; }
    public set date(value: Date) { this._date = value; }

    //State of the status (8o)
    private _state: boolean;
    public get state(): boolean { return this._state; }
    public set state(value: boolean) { this._state = value; }

    /**
     * Cosntructor
     * @param date
     * @param status
     */
    constructor(date: Date = new Date(), status: boolean = true)
    {
        this._date = date;
        this._state = status;
    }
}