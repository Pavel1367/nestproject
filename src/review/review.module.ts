import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewModel, ReviewSchema } from './review.model';
import { ReviewService } from './review.service';
import { TelegrafModule } from '../telegraf/telegraf.module';

@Module({
	controllers: [ReviewController],
	imports: [
		TelegrafModule,
		MongooseModule.forFeature([{ name: ReviewModel.name, schema: ReviewSchema }]),
	],
	providers: [ReviewService],
})
export class ReviewModule {}
