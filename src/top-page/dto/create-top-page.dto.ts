import { Prop } from '@nestjs/mongoose';
import { TopLevelCategory } from '../top-page.model';
import { IsArray, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class AdvantageDto {
	@IsString()
	title: string;

	@IsString()
	description: string;
}

class HHDataDto {
	@IsNumber()
	count: number;

	@IsNumber()
	juniorSalary: number;

	@IsNumber()
	middleSalary: number;

	@IsNumber()
	seniorSalary: number;
}

export class CreateTopPageDto {
	@IsEnum(TopLevelCategory)
	firstCategory: TopLevelCategory;

	@IsString()
	secondCategory: string;

	@IsString()
	alias: string;

	@IsString()
	title: string;

	@IsString()
	category: string;

	@IsOptional()
	@Type(() => HHDataDto)
	hh?: HHDataDto;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => AdvantageDto)
	advantages: Array<AdvantageDto>;

	@Prop()
	seoText: string;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => String)
	tags: Array<string>;
}
