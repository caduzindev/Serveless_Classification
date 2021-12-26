import { ImageAnnotatorClient } from '@google-cloud/vision'
import { injectable } from 'inversify';

@injectable()
class ImageVision {
    private vision: ImageAnnotatorClient;

    constructor(vision: ImageAnnotatorClient) {
        this.vision = vision
    }

    public async image_classification_violence(filePath: string) {
        const [result] = await this.vision.safeSearchDetection(filePath)
        const { violence } = result.safeSearchAnnotation;

        return this.get_status_violence(violence)
    }

    private get_status_violence(violenceResult: any) {
        switch (violenceResult) {
            case 'UNKNOWN':
            case 'VERY_UNLIKELY':
                return 'BAIXO'

            case 'UNLIKELY':
            case 'POSSIBLE':
                return 'MEDIO'

            case 'LIKELY':
            case 'VERY_LIKELY':
                return 'ALTO'
            default:
                throw new Error('Classificação desconhecida')
        }
    }
}

export default ImageVision