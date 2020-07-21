import { ApiModelProperty } from '@nestjs/swagger';
import { ISignUpDto } from '@proto-interface';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto implements Required<ISignUpDto> {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  lastName: string;
}
