/**
 * Website model
 */
class Website
{
    //Id of the website
    private _id: number;
    public get id(): number { return this._id; }

    //Name of the website
    private _name: string;
    public get name(): string { return this._name; }
    public set name(value: string) { this._name = value; }

    //URL of the website
    private _url: string;
    public get url(): string { return this._url; }
    public set url(value: string) { this._url = value; }

    //Expected status code for the website
    private _expectedStatusCode: number;
    public get expectedStatusCode(): number { return this._expectedStatusCode; }
    public set expectedStatusCode(value: number) { this._expectedStatusCode = value; }

    //Does the SSL certificat need to be checked
    private _checkSSL: boolean;
    public get checkSSL(): boolean { return this._checkSSL; }
    public set checkSSL(value: boolean) { this._checkSSL = value; }

    //Monitoring results for the website
    private _results: Array<MonitoringResult>;
    public get results(): Array<MonitoringResult> { return this._results; }
    public set results(value: Array<MonitoringResult>) { this._results = value; }

    /**
     * Constructor
     * @param data Iintialization data
     */
    constructor(data: any)
    {
        this._id = 0;
        this._name = "";
        this._url = "";
        this._expectedStatusCode = 0;
        this._checkSSL = false;
        this._results = new Array<MonitoringResult>();

        this.fromArray(data);
    }

    /**
     * Imports data from JS object
     * @param data
     */
    fromArray(data: any)
    {
        this._id = data?.id ?? this._id;
        this._name = data?.name ?? this._name;
        this._url = data?.url ?? this._url;
        this._expectedStatusCode = data?.expectedStatusCode ?? this._expectedStatusCode;
        this._checkSSL = data?.checkSSL ?? this._checkSSL;
        this._results = data?.results?.map((result) => { return new MonitoringResult(this, result); }) ?? this._results;
    }

    /**
     * Exports data to JS object
     */
    toArray(): any
    {
        return {
            id: this.id,
            name: this.name,
            url: this.url,
            expectedStatusCode: this.expectedStatusCode,
            checkSSL: this.checkSSL,
            results: this._results.map((result) => { return result.toArray(); })
        }
    }

    /**
     * Was the last monitoring able to access to the URL ?
     */
    isURLAvailable(): boolean
    {
        let result = true;

        if (this.results.length)
        {
            result = this.results[this.results.length - 1].obtainedStatusCode == this.expectedStatusCode;
        }

        return result;
    }

    /**
     * Is the SSL certificat valid ?
     */
    isSSLOK(): boolean
    {
        let result = true;

        if (this.checkSSL && this.results.length)
        {
            result = this.results[this.results.length - 1].sslStatus;
        }

        return result;
    }

    /**
     * Has the website any problem ?
     */
    hasProblem(): boolean
    {
        return !this.isURLAvailable() || !this.isSSLOK();
    }

    /**
     * Browses monitoring result and returns statuses for each "seed" period of time
     * @param maxStatuses Max statuses accespted
     * @param seed Time periode duration
     */
    getLastStatuses(maxStatuses: number, seed: number = 900000): Status[]
    {
        let statuses: Status[] = [];

        for (let index = this.results.length - 1; index >= 0; --index)
        {
            const result = this.results[index];

            let lastDate = result.lastMonitoring.getTime();
            const firstDate = result.firstMonitoring.getTime();

            let lastStatus = null;
            let state = result.getStatus();

            while (lastDate > firstDate && statuses.length < maxStatuses)
            {
                const statusDate = new Date(lastDate);

                if (!lastStatus || lastStatus.date !== statusDate)
                {
                    lastStatus = new Status(statusDate, state);

                    statuses.push(lastStatus);
                }
                else if (lastStatus.state == true && state == false)
                {
                    lastStatus.state = false;
                }

                lastDate -= seed;
            }
        }

        return statuses;
    }
}