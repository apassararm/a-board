import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Blog } from './entities/blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogsService {

  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
  ) {}


  async create(createBlogDto: CreateBlogDto) {
    const blog = await this.blogRepository.create(createBlogDto)
    const createBlog = await this.blogRepository.insert(blog)
    return createBlog;
  }

  findAll() {
    return this.blogRepository.find();
  }

  findOne(id: string) {
    return this.blogRepository.findOneBy({id: id});
  }

  async update(id: string, updateBlogDto: UpdateBlogDto) {
    let blog = await this.blogRepository.findOneBy({id: id})
    blog = {
      ...blog,
      ...updateBlogDto
    }
    
    const updateBlog = await this.blogRepository.save(blog)
    return updateBlog;
  }

  async remove(id: string) {
    const deleteBlog = await this.blogRepository.delete(id)
    return deleteBlog;
  }

  async searchByTitle(title: string): Promise<Blog[]> {
    return this.blogRepository.find({ where: { title: Like(`%${title}%`) } });
  }

  async searchByUserAndTitle(username: string, title: string): Promise<Blog[]> {
    return this.blogRepository.find({
      where: {
        username: username,
        title: Like(`%${title}%`)
      }
    });
  }


  async getBlogsByTag(tag: string): Promise<Blog[]> {
    return this.blogRepository.find({ where: { tag } })
  }

  async getBlogsByUserAndTag(username: string, tag: string): Promise<Blog[]> {
    return this.blogRepository.find({
      where: {
        username: username,
        tag: tag
      }
    });
  }

  async getBlogsByUser(username: string): Promise<Blog[]> {
    return this.blogRepository.find({ where: { username } })
  }

  
}
