import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {

  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}



  async create(createCommentDto: CreateCommentDto) {
    const comment = await this.commentRepository.create(createCommentDto)
    const createComment = await this.commentRepository.insert(comment)
    return createComment;
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: string) {
    return this.commentRepository.findOneBy({id: id});
  }

  async findByBlogId(blogId: string) {
    return await this.commentRepository.find({ where: { blogId } });
  }

 
  async update(id: string, updateCommentDto: UpdateCommentDto) {
    let comment = await this.commentRepository.findOneBy({id: id})
    comment = {
      ...comment,
      ...updateCommentDto
    }
    
    const updateComment = await this.commentRepository.save(comment)
    return updateComment;
  }

  async remove(id: string) {
    const deleteComment = await this.commentRepository.delete(id)
    return deleteComment;
  }
}
