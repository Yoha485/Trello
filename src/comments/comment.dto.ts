import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsInt, IsOptional, IsString } from "class-validator";


export class CreateCommentDto{
  @IsDefined()
  @IsInt()
  @ApiProperty({type: Number, description: 'cardId'})
  cardId: number;

  @IsDefined()
  @IsString()
  @ApiProperty({type: String, description: 'comment'})
  comment: string;
}

export class GetCommentsDto{
  @IsDefined()
  @IsInt()
  @ApiProperty({type: Number, description: 'cardId'})
  cardId: number;
}

export class UpdateCommentDto{
  @IsOptional()
  @IsInt()
  @ApiProperty({type: Number, description: 'cardId'})
  cardId: number;

  @IsOptional()
  @IsString()
  @ApiProperty({type: String, description: 'comment'})
  comment: string;
}