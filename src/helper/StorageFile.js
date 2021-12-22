class StorageFile {
    constructor(storage) {
        this.storage = storage
    }
    public_path_image_gcp(bucket, filename) {
        return this.storage
            .bucket(bucket)
            .file(filename)
            .publicUrl()
    }
}

module.exports = StorageFile