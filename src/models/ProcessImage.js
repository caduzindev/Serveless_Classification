class ProcessImage {
    constructor(vision) {
        this.vision = vision
    }
    classification_violence_image(filePath) {
        // const client = new vision.ImageAnnotatorClient()
        const [result] = await this.vision.client.safeSearchDetection(filePath)
        const { violence } = result.safeSearchAnnotation;

        return violence
    }
    get_status_violence(violenceResult) {
        switch (violenceResult) {
            case 'UNKNOWN' || 'VERY_UNLIKELY':
                return 'BAIXO'
            case 'UNLIKELY' || 'POSSIBLE':
                return 'MEDIO'
            case 'LIKELY' || 'VERY_LIKELY':
                return 'ALTO'
            default:
                throw new Error('Classificação desconhecida')
        }
    }
}

module.exports = ProcessImage