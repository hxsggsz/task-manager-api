import { IsBoolean, IsNotEmpty, Max, Min } from 'class-validator';

export class CreateProjectDTO {
  @Min(5)
  @Max(20)
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  isPublic: boolean;
}
