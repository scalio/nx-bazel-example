import { ApiModelProperty } from '@nestjs/swagger';
import { ICreateCatDto } from '@proto-interface';
import { IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class CreateCatDto implements Required<ICreateCatDto> {
  @ApiModelProperty()
  @IsNotEmpty()
  name: string;

  @ApiModelProperty()
  @IsInt()
  @Min(1)
  @Max(200)
  age: number;
}
