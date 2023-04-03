import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RunsService } from './runs.service';
import { Run } from './run.model';

@Controller('runs')
export class RunsController {
  constructor(private readonly runsService: RunsService) {}

  @Get()
  getAllRuns() {
    return this.runsService.getAllRuns();
  }

  @Get(':id')
  getRun(@Param('id') id: string) {
    return this.runsService.getRun(id);
  }

  @Post()
  // eslint-disable-next-line prettier/prettier
  createRun(
    @Body('time') time: number,
    @Body('username') username: string,
  ) {
    return this.runsService.createRun(username, time);
  }

  @Delete(':id')
  deleteRun(@Param('id') id: string) {
    return this.runsService.deleteRun(id);
  }

  @Patch(':id')
  updateRun(@Param('id') id: string, dto: Run) {
    return this.runsService.updateRun(id, dto);
  }
}
