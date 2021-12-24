import { injectable } from 'inversify'
import Entity from './Entity';

@injectable()
class Image extends Entity {
    _table = 'images';
    save(objImage: any): void {
        this.dbConnector.insert(objImage).into(this._table).then(() => { })
    }
}

export default Image