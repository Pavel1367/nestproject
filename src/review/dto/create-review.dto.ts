import { IsNumber, IsString, Max, Min } from 'class-validator';
export class CreateReviewDto {
	@IsString()
	name: string;

	@IsString()
	title: string;

	@IsString()
	description: string;

	@Max(5)
	@Min(1, { message: 'Rating cant be less than 1' })
	@IsNumber()
	rating: number;

	@IsString()
	productId: string;
}
