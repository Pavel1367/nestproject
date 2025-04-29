import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products,
}

export class Advantage {
	@Prop()
	title: string;

	@Prop()
	description: string;
}

export class HHData {
	@Prop()
	count: number;

	@Prop()
	juniorSalary: number;

	@Prop()
	middleSalary: number;

	@Prop()
	seniorSalary: number;
}

@Schema({ timestamps: true, _id: false })
export class TopPageModel {
	@Prop({ enum: TopLevelCategory, type: Number })
	firstCategory: TopLevelCategory;

	@Prop()
	secondCategory: string;

	@Prop()
	alias: string;

	@Prop()
	title: string;

	@Prop()
	category: string;

	@Prop({ type: () => [HHData] })
	hh?: HHData;

	@Prop({ type: () => [Advantage] })
	advantages: Array<Advantage>;

	@Prop()
	seoText: string;

	@Prop({ type: () => [String] })
	tags: Array<string>;
}
export const TopPageSchema = SchemaFactory.createForClass(TopPageModel);
