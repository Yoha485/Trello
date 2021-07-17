import { ApiProperty } from "@nestjs/swagger";
import { MinLength } from "class-validator";


export class CreateColumnDto{
  @MinLength(1)
  @ApiProperty({type: String, description: 'columnName'})
  name: string;
}

export class UpdateColumnDto{
  @MinLength(1)
  @ApiProperty({type: String, description: 'columnName'})
  name: string;
}