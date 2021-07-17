import { IsDefined, IsInt, IsOptional, IsString } from "class-validator";


export class CreateCommentDto{
  @IsDefined()
  @IsInt()
  cardId: number;

  @IsDefined()
  @IsString()
  comment: string;
}

export class GetCommentsDto{
  @IsDefined()
  @IsInt()
  cardId: number;
}

export class UpdateCommentDto{
  @IsOptional()
  @IsInt()
  cardId: number;

  @IsOptional()
  @IsString()
  comment: string;
}