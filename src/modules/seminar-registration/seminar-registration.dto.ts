import { IsNumber, IsString } from 'class-validator';

export class GetSeminarRegdto {
  @IsString()
  user_id: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  phone: string;

  @IsString()
  loginid: string;
}

export class UpdateSeminarRegdto {
  @IsNumber()
  seminar_id: number;

  @IsString()
  user_id: string;
}
