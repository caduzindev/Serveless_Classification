import "reflect-metadata";
import ImageVision from "../../../helpers/ImageVision"

function createInstace(vision) {
    return new ImageVision(new vision)
}

describe("Testando se o ImageVison retona o status de violencia corretos", () => {
    test("Testando retorno de status", async () => {
        const mockVision = jest.fn().mockImplementation(() => ({
            safeSearchDetection: jest.fn().mockImplementation(() => {
                return [
                    {
                        safeSearchAnnotation: {
                            violence: 'VERY_UNLIKELY'
                        }
                    }
                ]
            })
        }))
        const instance = createInstace(mockVision)
        const fakePath = 'caminho/fake/da/silva'

        const result = await instance.image_classification_violence(fakePath)

        expect(result).toBe('BAIXO')
    })
})