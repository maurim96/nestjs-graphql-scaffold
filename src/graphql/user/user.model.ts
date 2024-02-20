import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  createdAt?: string;

  @Field()
  updatedAt?: string;

  @Field({ nullable: true })
  deviceToken?: string;
}
