import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, _id: true })
export class UserModel extends Document {
	@Prop({ required: true, unique: true })
	email: string;

	@Prop({ required: true })
	passwordHash: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
