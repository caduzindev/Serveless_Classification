import { Container } from 'inversify';
import { Storage } from '@google-cloud/storage';
import { ImageAnnotatorClient } from '@google-cloud/vision';
import { Knex } from 'knex';
import { Action } from '../action/Action';
import ClassificationImages from '../action/ClassificationImages';
import Entity from '../entities/Entity';
import Image from '../entities/Image';
import ImageVision from '../helpers/ImageVision';
import StorageGCP from '../helpers/StorageGCP';
import types from './types';
import ConnectionKnex from '../database';

const container = new Container();

// Action
container.bind<Action>(types.ClassificationImages).to(ClassificationImages);

// Entities
container.bind<Entity>(types.Entity).to(Image);

// Database
container.bind<Knex>(types.DB).toFactory<Knex>(() => () => ConnectionKnex);

// Storage
container.bind<StorageGCP>(types.StorageGCP).toFactory<StorageGCP>(() => () => new StorageGCP(new Storage()));

// Others
container.bind<ImageVision>(types.ImageVision).toFactory<ImageVision>(() => () => new ImageVision(new ImageAnnotatorClient()));

export { container };
