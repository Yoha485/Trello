import { IsDefined, IsInt, IsOptional, IsString } from "class-validator";


export class CreateCardDto{
  @IsDefined()
  @IsInt()
  columnId: number;

  @IsDefined()
  @IsString()
  name: string;


  @IsOptional()
  @IsString()
  description: string;
}

export class GetCardsDto{
  @IsDefined()
  @IsInt()
  columnId: number;
}

export class UpdateCardDto{
  @IsOptional()
  @IsInt()
  columnId: number;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}