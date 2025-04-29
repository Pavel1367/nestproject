import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class ProductCharacteristic {
	@Prop()
	name: string;

	@Prop()
	value: string;
}

@Schema({ _id: true, timestamps: true })
export class ProductModel extends Document {
	@Prop()
	image: string;

	@Prop()
	title: string;

	@Prop()
	price: number;

	@Prop()
	oldPrice: number;

	@Prop()
	credit: number;

	@Prop()
	calculatedRating: number;

	@Prop()
	description: string;

	@Prop()
	advantages: string;

	@Prop()
	disAdvantages: string;

	@Prop({ type: () => [String] })
	categories: string[];

	@Prop({ type: () => [String] })
	tags: string[];

	@Prop({ type: () => [String], _id: false })
	characteristics: Array<ProductCharacteristic>;
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel);
