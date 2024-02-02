import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dto/create-report.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private reportsRepository: Repository<Report>,
  ) {}

  create(reportDto: CreateReportDto): Promise<Report> {
    const report = this.reportsRepository.create(reportDto);

    return this.reportsRepository.save(report);
  }

  findAll(): Promise<Report[]> {
    return this.reportsRepository.find({ order: { id: 'DESC' } });
  }
}
