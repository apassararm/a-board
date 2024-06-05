import { Entity, Column, PrimaryGeneratedColumn,  CreateDateColumn, UpdateDateColumn, Timestamp } from 'typeorm';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column("varchar", { length: 4000 })
  description: string;

  @Column()
  tag: string;

  @Column()
  username: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedDate: Date;
}