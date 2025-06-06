import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ProductModel } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { ReviewModel } from '../review/review.model';

@Injectable()
export class ProductService {
	constructor(
		@InjectModel(ProductModel.name)
		private readonly productModel: Model<ProductModel>,
	) {}
	async create(dto: CreateProductDto) {
		return this.productModel.create(dto);
	}

	async findById(id: string) {
		return this.productModel.findById(id).exec();
	}

	async deleteById(id: string) {
		return this.productModel.findByIdAndDelete(id).exec();
	}

	async updateById(id: string, dto: CreateProductDto) {
		return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();
	}

	async findWithReviews(dto: FindProductDto) {
		return (await this.productModel
			.aggregate([
				{
					$match: {
						categories: dto.category,
					},
				},
				{
					$sort: {
						_id: 1,
					},
				},
				{
					$limit: dto.limit,
				},
				{
					$lookup: {
						from: 'reviewmodels',
						localField: '_id',
						foreignField: 'productId',
						as: 'reviews',
					},
				},
				{
					$addFields: {
						reviewCount: { $size: '$reviews' },
						reviewAvg: { $avg: '$review.rating' },
						reviews: {
							$function: {
								body: `function (reviews) {
									reviews.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
									return reviews;
								}`,
								args: ['$reviews'],
								lang: 'js',
							},
						},
					},
				},
			])
			.exec()) as (ProductModel & {
			review: ReviewModel[];
			reviewCount: number;
			reviewAvg: number;
		})[];
	}
}
