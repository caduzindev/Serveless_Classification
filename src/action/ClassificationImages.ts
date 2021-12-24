import { injectable, inject } from 'inversify'
import types from '../config/types'
import Image from '../entities/Image'
import ImageVision from '../helpers/ImageVision'
import StorageGCP from '../helpers/StorageGCP'
import { Action } from './Action'

@injectable()
class ClassificationImages implements Action {
    private processImage: ImageVision
    private storage: StorageGCP
    private entityImage: Image

    constructor(
        @inject(types.ImageVision) processImage: () => ImageVision,
        @inject(types.StorageGCP) storage: () => StorageGCP,
        @inject(types.Entity) entityImage: Image
    ) {
        this.processImage = processImage()
        this.storage = storage()
        this.entityImage = entityImage
    }
    public async execute(event: any) {
        const { name: filename, bucket } = event

        const filePath = `gs://${bucket}/${filename}`

        const violenceStatus = await this.processImage.image_classification_violence(filePath)

        const publicURI = this.storage.public_path_image_gcp(bucket, filename)

        this.entityImage.save({ image_url: publicURI, classification: violenceStatus })
    }
}

export default ClassificationImages