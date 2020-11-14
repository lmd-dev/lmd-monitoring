/**
 * Website model
 */
class Website {
    /**
     * Constructor
     * @param data Iintialization data
     */
    constructor(data) {
        this._id = 0;
        this._name = "";
        this._url = "";
        this._expectedStatusCode = 0;
        this._checkSSL = false;
        this._results = new Array();
        this.fromArray(data);
    }
    get id() { return this._id; }
    get name() { return this._name; }
    set name(value) { this._name = value; }
    get url() { return this._url; }
    set url(value) { this._url = value; }
    get expectedStatusCode() { return this._expectedStatusCode; }
    set expectedStatusCode(value) { this._expectedStatusCode = value; }
    get checkSSL() { return this._checkSSL; }
    set checkSSL(value) { this._checkSSL = value; }
    get results() { return this._results; }
    set results(value) { this._results = value; }
    /**
     * Imports data from JS object
     * @param data
     */
    fromArray(data) {
        var _a, _b, _c, _d, _e, _f, _g;
        this._id = (_a = data === null || data === void 0 ? void 0 : data.id) !== null && _a !== void 0 ? _a : this._id;
        this._name = (_b = data === null || data === void 0 ? void 0 : data.name) !== null && _b !== void 0 ? _b : this._name;
        this._url = (_c = data === null || data === void 0 ? void 0 : data.url) !== null && _c !== void 0 ? _c : this._url;
        this._expectedStatusCode = (_d = data === null || data === void 0 ? void 0 : data.expectedStatusCode) !== null && _d !== void 0 ? _d : this._expectedStatusCode;
        this._checkSSL = (_e = data === null || data === void 0 ? void 0 : data.checkSSL) !== null && _e !== void 0 ? _e : this._checkSSL;
        this._results = (_g = (_f = data === null || data === void 0 ? void 0 : data.results) === null || _f === void 0 ? void 0 : _f.map((result) => { return new MonitoringResult(this, result); })) !== null && _g !== void 0 ? _g : this._results;
    }
    /**
     * Exports data to JS object
     */
    toArray() {
        return {
            id: this.id,
            name: this.name,
            url: this.url,
            expectedStatusCode: this.expectedStatusCode,
            checkSSL: this.checkSSL,
            results: this._results.map((result) => { return result.toArray(); })
        };
    }
    /**
     * Was the last monitoring able to access to the URL ?
     */
    isURLAvailable() {
        let result = true;
        if (this.results.length) {
            result = this.results[this.results.length - 1].obtainedStatusCode == this.expectedStatusCode;
        }
        return result;
    }
    /**
     * Is the SSL certificat valid ?
     */
    isSSLOK() {
        let result = true;
        if (this.checkSSL && this.results.length) {
            result = this.results[this.results.length - 1].sslStatus;
        }
        return result;
    }
    /**
     * Has the website any problem ?
     */
    hasProblem() {
        return !this.isURLAvailable() || !this.isSSLOK();
    }
    /**
     * Browses monitoring result and returns statuses for each "seed" period of time
     * @param maxStatuses Max statuses accespted
     * @param seed Time periode duration
     */
    getLastStatuses(maxStatuses, seed = 900000) {
        let statuses = [];
        for (let index = this.results.length - 1; index >= 0; --index) {
            const result = this.results[index];
            let lastDate = result.lastMonitoring.getTime();
            const firstDate = result.firstMonitoring.getTime();
            let lastStatus = null;
            let state = result.getStatus();
            while (lastDate > firstDate && statuses.length < maxStatuses) {
                const statusDate = new Date(lastDate);
                if (!lastStatus || lastStatus.date !== statusDate) {
                    lastStatus = new Status(statusDate, state);
                    statuses.push(lastStatus);
                }
                else if (lastStatus.state == true && state == false) {
                    lastStatus.state = false;
                }
                lastDate -= seed;
            }
        }
        return statuses;
    }
}
//# sourceMappingURL=website.js.map