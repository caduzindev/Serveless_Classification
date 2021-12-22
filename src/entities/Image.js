class Image {
    _table = 'images';
    constructor(dbConnector) {
        this.dbConnector = dbConnector
    }
    save(objImage) {
        this.dbConnector.insert(objImage).into(this._table).then(() => { })
    }
}

module.exports = Image