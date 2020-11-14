/**
 * Monitoring result model
 */
class MonitoringResult {
    /**
     * Constructor
     * @param website Associated website
     * @param data Initialization data
     */
    constructor(website, data) {
        this._website = website;
        this._id = 0;
        this._obtainedStatusCode = 0;
        this._sslStatus = false;
        this._firstMonitoring = new Date();
        this._lastMonitoring = new Date();
        this.fromArray(data);
    }
    get id() { return this._id; }
    get website() { return this._website; }
    get obtainedStatusCode() { return this._obtainedStatusCode; }
    get sslStatus() { return this._sslStatus; }
    get firstMonitoring() { return this._firstMonitoring; }
    get lastMonitoring() { return this._lastMonitoring; }
    /**
     * Imports data from JS object
     * @param data
     */
    fromArray(data) {
        var _a, _b, _c;
        this._id = (_a = data === null || data === void 0 ? void 0 : data.id) !== null && _a !== void 0 ? _a : this._id;
        this._obtainedStatusCode = (_b = data === null || data === void 0 ? void 0 : data.obtainedStatusCode) !== null && _b !== void 0 ? _b : this._obtainedStatusCode;
        this._sslStatus = (_c = data === null || data === void 0 ? void 0 : data.sslStatus) !== null && _c !== void 0 ? _c : this._sslStatus;
        if (data === null || data === void 0 ? void 0 : data.firstMonitoring)
            this._firstMonitoring = new Date(data === null || data === void 0 ? void 0 : data.firstMonitoring);
        if (data === null || data === void 0 ? void 0 : data.lastMonitoring)
            this._lastMonitoring = new Date(data === null || data === void 0 ? void 0 : data.lastMonitoring);
    }
    /**
     * Exports data to JS object
     */
    toArray() {
        return {
            id: this.id,
            obtainedStatusCode: this.obtainedStatusCode,
            sslStatus: this.sslStatus,
            firstMonitoring: this.firstMonitoring,
            lastMonitoring: this.lastMonitoring
        };
    }
    /**
     * Rturn the status of the website for this periode
     */
    getStatus() {
        return this.website.expectedStatusCode === this.obtainedStatusCode && (!this.website.checkSSL || this.sslStatus);
    }
}
//# sourceMappingURL=monitoring-result.js.map