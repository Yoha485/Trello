import { ApiProperty } from "@nestjs/swagger";
import { MinLength } from "class-validator";


export class CreateColumnDto{
  @ApiProperty({type: String, description: 'columnName'})
  name: string;
}

export class UpdateColumnDto{
  @ApiProperty({type: String, description: 'columnName'})
  name: string;
}