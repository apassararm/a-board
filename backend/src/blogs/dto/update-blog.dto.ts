import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogDto } from './create-blog.dto';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {}

// export class UpdateBlogDto {
//     title: string;
//     description: string;
//     tag: string;
// }
