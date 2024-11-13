import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  
  async resetIssues(): Promise<{ count: number }> {
    const countResult = await this.userRepository
      .createQueryBuilder()
      .select('COUNT(id)', 'count')
      .where('issues = :issues', { issues: true })
      .setParameter('issues', true)
      .getRawOne();
    const count = parseInt(countResult.count, 10);
    
    await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ issues: false })
      .where('issues = :issues', { issues: true })
      .setParameter('issues', true)
      .execute();
    
    return { count };
  }
}