import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop()
  date: string;

  @Prop()
  email: string;

  @Prop()
  executed: string;

  @Prop()
  lastName: string;

  @Prop()
  message: string;

  @Prop()
  name: string;

  @Prop()
  phone: string;

  @Prop()
  position: Array<object>;

  @Prop()
  provider: string;

  @Prop()
  status: string;

  @Prop()
  type: string;
}

export const ProductsSchema = SchemaFactory.createForClass(Product);
