/**
 * Monitoring result model
 */
class MonitoringResult
{
    //Id of the monitoring result
    private _id: number;
    public get id(): number { return this._id; }

    //Website associated with this result
    private _website: Website;
    public get website(): Website { return this._website; }

    //Obtained status code
    private _obtainedStatusCode: number;
    public get obtainedStatusCode(): number { return this._obtainedStatusCode; }

    //SSL status
    private _sslStatus: boolean;
    public get sslStatus(): boolean { return this._sslStatus; }

    //First nomitoring date 
    private _firstMonitoring: Date;
    public get firstMonitoring(): Date { return this._firstMonitoring; }

    //LAst monitoring date
    private _lastMonitoring: Date;
    public get lastMonitoring(): Date { return this._lastMonitoring; }

    /**
     * Constructor
     * @param website Associated website
     * @param data Initialization data
     */
    constructor(website: Website, data: any)
    {
        this._website = website;

        this._id = 0;
        this._obtainedStatusCode = 0;
        this._sslStatus = false;
        this._firstMonitoring = new Date();
        this._lastMonitoring = new Date();

        this.fromArray(data);
    }

    /**
     * Imports data from JS object
     * @param data
     */
    fromArray(data: any)
    {
        this._id = data?.id ?? this._id;
        this._obtainedStatusCode = data?.obtainedStatusCode ?? this._obtainedStatusCode;
        this._sslStatus = data?.sslStatus ?? this._sslStatus;

        if (data?.firstMonitoring)
            this._firstMonitoring = new Date(data?.firstMonitoring);

        if (data?.lastMonitoring)
            this._lastMonitoring = new Date(data?.lastMonitoring);
    }

    /**
     * Exports data to JS object
     */
    toArray(): any
    {
        return {
            id: this.id,
            obtainedStatusCode: this.obtainedStatusCode,
            sslStatus: this.sslStatus,
            firstMonitoring: this.firstMonitoring,
            lastMonitoring: this.lastMonitoring
        }
    }

    /**
     * Rturn the status of the website for this periode
     */
    getStatus(): boolean
    {
        return this.website.expectedStatusCode === this.obtainedStatusCode && (!this.website.checkSSL || this.sslStatus);
    }
}