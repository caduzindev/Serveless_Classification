const { Storage } = require('@google-cloud/storage');
const vision = require('@google-cloud/vision');
const storage = new Storage();

exports.ServelessClassification = async ({ name: filename, bucket }, _) => {
    const filePath = `gs://${bucket}/${filename}`

    const violence = classification_violence_image(filePath)
    const violenceStatus = get_status_violence(violence)

    const publicURI = storage
        .bucket(bucket)
        .file(filename)
        .publicUrl()
}

const classification_violence_image = (pathFile) => {
    const client = new vision.ImageAnnotatorClient()
    const [result] = await client.safeSearchDetection(pathFile)
    const { violence } = result.safeSearchAnnotation;

    return violence
}
const get_status_violence = (violenceResult) => {
    switch (violenceResult) {
        case 'UNKNOWN' || 'VERY_UNLIKELY':
            return 'BAIXO'
        case 'UNLIKELY' || 'POSSIBLE':
            return 'MEDIO'
        case 'LIKELY' || 'VERY_LIKELY':
            return 'ALTO'
        default:
            console.log(violence)
            throw new Error('Classificação desconhecida')
    }
}