import { injectable } from 'inversify';
import { Storage } from '@google-cloud/storage';

@injectable()
class StorageGCP {
  private storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  public_path_image_gcp(bucket: string, filename: string) {
    return this.storage
      .bucket(bucket)
      .file(filename)
      .publicUrl();
  }
}

export default StorageGCP;
