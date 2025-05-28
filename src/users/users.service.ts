import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(this.usersRepository.create(createUserDto));
  }

  findAll(page: number, limit: number): Promise<User[]> {
    return this.usersRepository.find({
      take: limit,
      skip: (page - 1) * limit
    });
  }

  async findOne(id: number): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async findOneByUuid(uuid: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { uuid } });
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { username } });
  }

  update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.usersRepository.update({ id }, updateUserDto);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.usersRepository.delete({ id });
  }
}
