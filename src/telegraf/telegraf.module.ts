import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { TelegrafService } from './telegraf.service';
import { TelegramModuleAsyncOptions } from './telegraf.interface';
import { TELEGRAM_MODULE_OPTIONS } from './telegram.constants';

@Global()
@Module({})
export class TelegrafModule {
	static forRootAsync(options: TelegramModuleAsyncOptions): DynamicModule {
		const asyncOptions = this.createAsyncOptionsProvider(options);
		return {
			module: TelegrafModule,
			imports: options.imports,
			providers: [asyncOptions, TelegrafService],
			exports: [TelegrafService],
		};
	}

	private static createAsyncOptionsProvider(options: TelegramModuleAsyncOptions): Provider {
		return {
			provide: TELEGRAM_MODULE_OPTIONS,
			useFactory: async (...args: any[]) => {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				return options.useFactory(...args);
			},
			inject: options.inject || [],
		};
	}
}
