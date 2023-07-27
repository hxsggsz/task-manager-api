import {
  Controller,
  Post,
  Param,
  Body,
  Put,
  Get,
  Delete,
} from '@nestjs/common';
import { CreateProject } from '../../../app/use-cases/project/create-project';
import { UpdateProject } from '../../../app/use-cases/project/update-project';
import { CreateAndUpdateProjectDTO } from '../dtos/project/create-and-update-project-dto';
import { GetAllProjects } from 'src/app/use-cases/project/get-all-projects';
import { GetProjectById } from 'src/app/use-cases/project/get-project-by-id';
import { DeleteProject } from 'src/app/use-cases/project/delete-project';

@Controller('project')
export class ProjectController {
  constructor(
    private getAllProjects: GetAllProjects,
    private getprojectById: GetProjectById,
    private createProject: CreateProject,
    private updateProject: UpdateProject,
    private deleteProject: DeleteProject,
  ) {}

  @Get('/:ownerId')
  async GetAllProjects(@Param('ownerId') ownerId: string) {
    const { projects } = await this.getAllProjects.execute({ ownerId });

    return { projects };
  }

  @Get('/unique/:projectId')
  async GetProjectById(@Param('projectId') projectId: string) {
    const { project } = await this.getprojectById.execute({ projectId });

    return { project };
  }

  @Post('/:ownerId')
  async createNewProject(
    @Param('ownerId') ownerId: string,
    @Body() body: CreateAndUpdateProjectDTO,
  ) {
    const { name, isPublic } = body;

    await this.createProject.execute({ ownerId, name, isPublic });
  }

  @Put('/:projectId')
  async UpdateProject(
    @Param('projectId') projectId: string,
    @Body() body: CreateAndUpdateProjectDTO,
  ) {
    const { name, isPublic } = body;

    await this.updateProject.execute({ projectId, name, isPublic });
  }

  @Delete('/:projectId')
  async DeleteProject(@Param('projectId') projectId: string) {
    await this.deleteProject.execute({ projectId });
  }
}
