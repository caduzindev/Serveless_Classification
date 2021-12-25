import "reflect-metadata";
import { Action } from "./action/Action";
import { container } from "./config/container";
import types from "./config/types";

export const ServelessClassification = (event: any) => {
    const app = container.get<Action>(types.ClassificationImages)

    app.execute(event)
}