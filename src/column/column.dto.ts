import { MinLength } from "class-validator";


export class createColumnDto{
  @MinLength(1)
  name: string;
}

export class UpdateColumnDto{
  @MinLength(1)
  name: string;
}