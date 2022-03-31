import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsInt, IsOptional, IsString } from "class-validator";


export class CreateCardDto{
  @IsDefined()
  @IsInt()
  @ApiProperty({type: Number, description: 'columnId'})
  columnId: number;

  @IsDefined()
  @IsString()
  @ApiProperty({type: String, description: 'cardName'})
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({type: String, description: 'cardDescription'})
  description: string;
}

export class GetCardsDto{
  @IsDefined()
  @IsInt()
  @ApiProperty({type: Number, description: 'columnId'})
  columnId: number;
}

export class UpdateCardDto{
  @IsOptional()
  @IsInt()
  @ApiProperty({type: Number, description: 'columnId'})
  columnId: number;

  @IsOptional()
  @ApiProperty({type: String, description: 'cardName'})
  name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({type: String, description: 'cardDescription'})
  description: string;
}