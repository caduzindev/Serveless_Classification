import { injectable } from 'inversify';
import Entity from './Entity';

@injectable()
class Image extends Entity {
  private table = 'images';

  save(objImage: any): void {
    this.dbConnector.insert(objImage).into(this.table).then(() => { });
  }
}

export default Image;
