class Website {
    constructor(data) {
        this._id = 0;
        this._name = "";
        this._url = "";
        this._expectedStatusCode = 0;
        this._checkSSL = false;
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
    fromArray(data) {
        var _a, _b, _c, _d, _e;
        this._id = (_a = data === null || data === void 0 ? void 0 : data.id) !== null && _a !== void 0 ? _a : this._id;
        this._name = (_b = data === null || data === void 0 ? void 0 : data.name) !== null && _b !== void 0 ? _b : this._name;
        this._url = (_c = data === null || data === void 0 ? void 0 : data.url) !== null && _c !== void 0 ? _c : this._url;
        this._expectedStatusCode = (_d = data === null || data === void 0 ? void 0 : data.expectedStatusCode) !== null && _d !== void 0 ? _d : this._expectedStatusCode;
        this._checkSSL = (_e = data === null || data === void 0 ? void 0 : data.checkSSL) !== null && _e !== void 0 ? _e : this._checkSSL;
    }
    toArray() {
        return {
            id: this.id,
            name: this.name,
            url: this.url,
            expectedStatusCode: this.expectedStatusCode,
            checkSSL: this.checkSSL
        };
    }
}
//# sourceMappingURL=website.js.map