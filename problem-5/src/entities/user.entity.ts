import { 
  Column, 
  Entity, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn, 
  DeleteDateColumn,
} from 'typeorm';

@Entity({name: "user"})
export class User {

  @PrimaryGeneratedColumn({ name: "id" })
  public id!: string

  @Column()
  public name!: string

  @Column({ nullable: true })
  public email!: string

  @Column({ nullable: true })
  public phone!: string

  @Column({ nullable: true })
  public address!: string

  @CreateDateColumn()
  public created!: Date;

  @UpdateDateColumn()
  public updated!: Date;

  @DeleteDateColumn({ nullable: true })
  public deleted?: Date;
}