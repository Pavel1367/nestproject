import { ModuleMetadata } from '@nestjs/common';

export interface TelegrafOptions {
	chatId: string;
	token: string;
}
export interface TelegramModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
	useFactory: (...args: any[]) => Promise<TelegrafOptions> | TelegrafOptions;
	inject?: any[];
}
