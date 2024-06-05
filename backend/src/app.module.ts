import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsModule } from './blogs/blogs.module';
import { Blog } from './blogs/entities/blog.entity';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/entities/comment.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'aboarddb',
      entities: [Blog, Comment, User],
      synchronize: true,

    }),
    BlogsModule,
    CommentsModule,
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
