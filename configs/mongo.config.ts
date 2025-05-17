import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose/dist/interfaces/mongoose-options.interface';

export const getMongoConfig = (configService: ConfigService): MongooseModuleOptions => {
	return {
		uri: getMongoString(configService),
		autoIndex: true,
	};
};

const getMongoString = (configService: ConfigService) => {
	const USER = configService.get('MONGO_USER');
	const PASSWORD = configService.get('MONGO_PASSWORD');
	const HOST = configService.get('MONGO_HOST', 'localhost');
	const PORT = configService.get('MONGO_PORT', '27018');
	const DB = configService.get('MONGO_DB', 'top-api');
	const AUTH_SOURCE = configService.get('MONGO_AUTH_SOURCE', 'admin');
	const AUTH_MECHANISM = configService.get('MONGO_AUTH_MECHANISM', 'SCRAM-SHA-1');

	return `mongodb://${USER}:${PASSWORD}@${HOST}:${PORT}/${DB}?authSource=${AUTH_SOURCE}&authMechanism=${AUTH_MECHANISM}`;
};
