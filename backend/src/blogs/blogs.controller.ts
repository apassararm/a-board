import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) { }

  @Post()
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogsService.create(createBlogDto);
  }

  @Get()
  findAll() {
    return this.blogsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.update(id, updateBlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogsService.remove(id);
  }

  @Get('search/:title')
  async searchByTitle(@Param('title') title: string): Promise<Blog[]> {
    return this.blogsService.searchByTitle(title);
  }

  @Get('searchbyuser/:username/:title')
  async searchByUserAndTitle(@Param('username') username: string, @Param('title') title: string): Promise<Blog[]> {
    return this.blogsService.searchByUserAndTitle(username, title);
  }


  @Get('filter/:tag')
  async getBlogsByTag(@Param('tag') tag: string): Promise<Blog[]> {
    return this.blogsService.getBlogsByTag(tag);
  }

  @Get('filterbyuser/:username/:tag')
  async getBlogsByUserAndTag(@Param('username') username: string, @Param('tag') tag: string): Promise<Blog[]> {
    return this.blogsService.getBlogsByUserAndTag(username, tag);
  }

  @Get('user/:username')
  async getBlogsByUser(@Param('username') username: string): Promise<Blog[]> {
    return this.blogsService.getBlogsByUser(username);
  }



}
