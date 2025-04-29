import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, HydratedDocument, Types, DeleteResult } from 'mongoose';
import { ReviewModel } from './review.model';
import { CreateReviewDto } from './dto/create-review.dto';

class Leak {}
const leaks = [];
@Injectable()
export class ReviewService {
	constructor(@InjectModel(ReviewModel.name) private readonly reviewModel: Model<ReviewModel>) {}

	async create(dto: CreateReviewDto): Promise<HydratedDocument<ReviewModel>> {
		const productId = new Types.ObjectId(dto.productId);
		return this.reviewModel.create({ ...dto, productId });
	}

	async delete(id: string): Promise<HydratedDocument<ReviewModel> | null> {
		return this.reviewModel.findByIdAndDelete(id).exec();
	}

	async findByProductId(productId: string): Promise<HydratedDocument<ReviewModel>[]> {
		return this.reviewModel.find({ productId: new Types.ObjectId(productId) }).exec();
	}

	async deleteByProductId(productId: string): Promise<DeleteResult> {
		return this.reviewModel.deleteMany({ productId: new Types.ObjectId(productId) }).exec();
	}
}
