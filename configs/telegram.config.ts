import { ConfigService } from '@nestjs/config';
import { TelegrafOptions } from '../src/telegraf/telegraf.interface';

export const getTelegramConfig = (configService: ConfigService): TelegrafOptions => {
	const token = configService.get<string>('TG_TOKEN');
	if (!token) {
		throw new Error('No token');
	}
	const chatId = configService.get<string>('TG_CHAT_ID') || '';
	return {
		token,
		chatId,
	};
};
