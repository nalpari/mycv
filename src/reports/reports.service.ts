import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private reportsRepository: Repository<Report>,
  ) {}

  async create(reportDto: CreateReportDto, user: User): Promise<Report> {
    const report = this.reportsRepository.create(reportDto);
    report.user = user;

    return await this.reportsRepository.save(report);
  }

  async findAll(): Promise<Report[]> {
    return await this.reportsRepository.find({ order: { id: 'DESC' } });
  }

  async changeApproval(id: number, approved: boolean): Promise<Report> {
    const report = await this.reportsRepository.findOne({ where: { id } });
    if (!report) {
      throw new NotFoundException('Report not found');
    }
    report.approved = approved;
    return await this.reportsRepository.save(report);
  }
}
