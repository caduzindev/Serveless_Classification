const { Storage } = require('@google-cloud/storage');
const vision = require('@google-cloud/vision');
const db = require('./database')

exports.ServelessClassification = async ({ name: filename, bucket }, _) => {
    const filePath = `gs://${bucket}/${filename}`

    const violence = await classification_violence_image(filePath)
    const violenceStatus = get_status_violence(violence)

    const publicURI = public_path_image_gcp(bucket, filename)

    db('images').insert(
        {
            image_url: publicURI,
            classification: violenceStatus
        }
    )
}
const classification_violence_image = async (pathFile) => {
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
const public_path_image_gcp = (bucket, filename) => {
    const storage = new Storage();

    return storage
        .bucket(bucket)
        .file(filename)
        .publicUrl()
}