import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(201)
  createReport(@Body() body: CreateReportDto) {
    return this.reportsService.create(body);
  }
}
