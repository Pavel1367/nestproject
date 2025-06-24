import { Inject, Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { TelegrafOptions } from './telegraf.interface';
import { getTelegramConfig } from '../../configs/telegram.config';
import { TELEGRAM_MODULE_OPTIONS } from './telegram.constants';

@Injectable()
export class TelegrafService {
	bot: Telegraf;
	options: TelegrafOptions;
	constructor(@Inject(TELEGRAM_MODULE_OPTIONS) options: TelegrafOptions) {
		this.options = options;
		this.bot = new Telegraf(this.options.token);
	}

	async sendMessage(message: string, chatId = this.options.chatId) {
		await this.bot.telegram.sendMessage(chatId, message);
	}
}
