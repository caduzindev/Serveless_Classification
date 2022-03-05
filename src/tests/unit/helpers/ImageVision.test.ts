import "reflect-metadata";
import ImageVision from "../../../helpers/ImageVision"

function createInstace(vision) {
    return new ImageVision(vision)
}

describe("Testando se o ImageVison retona o status de violencia correto", () => {
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
        const mock = new mockVision()

        const instance = createInstace(mock)

        const fakePath = 'caminho/fake/da/silva'

        const result = await instance.image_classification_violence(fakePath)

        expect(mock.safeSearchDetection).toHaveBeenCalledWith(fakePath)
        expect(result).toBe('BAIXO')
    })
})