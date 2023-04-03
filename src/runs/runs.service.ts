import { Injectable, NotFoundException } from '@nestjs/common';
import { Run } from './run.model';

@Injectable()
export class RunsService {
  private runs: Run[] = [
    {
      id: '1',
      time: 100,
      username: 'Duc',
    },
    {
      id: '2',
      time: 200,
      username: 'Chau',
    },
    {
      id: '3',
      time: 250,
      username: 'Viet',
    },
    {
      id: '4',
      time: 650,
      username: 'Nhu',
    },
    {
      id: '5',
      time: 50,
      username: 'Hieu',
    },
    {
      id: '6',
      time: 190,
      username: 'Vy',
    },
    {
      id: '7',
      time: 890,
      username: 'Bao Nguyen',
    },
  ];
  getAllRuns() {
    return [...this.runs];
  }
  findRun(id: string) {
    return this.runs.find((value) => value.id == id);
  }
  getRun(id: string) {
    const run = this.findRun(id);
    if (run == null) {
      throw new NotFoundException('Run not found');
    }
    return { ...run };
  }
  createRun(description: string, time: number) {
    const lastId = this.runs[this.runs.length - 1].id;
    const nextId = (parseInt(lastId) + 1).toString();

    this.runs.push({
      id: nextId,
      description,
      time,
    });

    return { newId: nextId };
  }

  deleteRun(id: string) {
    const index = this.runs.findIndex((run) => run.id == id);
    if (index == -1) {
      throw new NotFoundException('Run not found');
    }
    this.runs.splice(index, 1);
    return { deleteId: id };
  }

  updateRun(id: string, payload: Run) {
    const currentRun = this.findRun(id);
    if (currentRun === null) {
      throw new NotFoundException('Can not find Run with id:' + id);
    }
    const updatedRun = {
      ...currentRun,
      ...payload,
    };
    this.update(updatedRun);

    return updatedRun;
  }
  update(updatedRun: Run) {
    const index = this.runs.findIndex((item) => item.id === updatedRun.id);
    this.runs[index] = updatedRun;
  }
}
