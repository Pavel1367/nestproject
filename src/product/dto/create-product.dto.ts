import { IsArray, IsNumber, IsOptional, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';
class ProductCharacteristicDto {
	@IsString()
	name: string;
	@IsString()
	value: string;
}
export class CreateProductDto {
	@IsString()
	image: string;

	@IsString()
	title: string;

	@IsNumber()
	price: number;

	@IsNumber()
	@IsOptional()
	oldPrice?: number;

	@IsNumber()
	credit: number;

	@IsNumber()
	calculatedRating: number;

	@IsString()
	description: string;

	@IsString()
	advantages: string;

	@IsString()
	disAdvantages: string;

	@IsArray()
	@IsString({ each: true })
	categories: string[];

	@IsArray()
	@IsString({ each: true })
	tags: string[];

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => ProductCharacteristicDto)
	characteristics: Array<ProductCharacteristicDto>;
}
