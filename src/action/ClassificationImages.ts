import { injectable } from 'inversify'

@injectable()
class ClassificationImages {
    constructor(processImage, storage, entityImage) {
        this.processImage = processImage
        this.storage = storage
        this.entityImage = entityImage
    }
    public async execute(event: any) {
        const { name: filename, bucket } = event

        const filePath = `gs://${bucket}/${filename}`

        const violence = await this.processImage.classification_violence_image(filePath)
        const violenceStatus = this.processImage.get_status_violence(violence)

        const publicURI = this.storage.public_path_image_gcp(bucket, filename)

        this.entityImage.save({ image_url: publicURI, classification: violenceStatus })
    }
}

export default ClassificationImages