import { Injectable } from '@nestjs/common';
import { Project } from '../../../../app/entities/project/project';
import { ProjectRepository } from '../../../../app/repositories/project-repository';
import { PrismaProjectMappers } from '../mappers/prisma-project-mappers';
import { PrismaService } from '../prisma.service';
import { Participant } from 'src/app/entities/participant/participant';

@Injectable()
export class PrismaProjectRepository implements ProjectRepository {
  constructor(private prisma: PrismaService) {}

  async createProjectWithParticipant(
    project: Project,
    participant: Participant,
  ): Promise<void> {
    await this.prisma.projects.create({
      data: {
        name: project.name,
        isPublic: project.isPublic,
        userId: project.userId,
        participants: {
          connectOrCreate: {
            where: {
              id: participant.id,
            },
            create: {
              name: participant.name,
              username: participant.username,
              profilePhoto: participant.profilePhoto,
              role: participant.role,
            },
          },
        },
      },
    });
  }

  async update(project: Project): Promise<void> {
    await this.prisma.projects.update({
      where: {
        id: project.id,
      },
      data: {
        name: project.name,
        isPublic: project.isPublic,
      },
    });
  }

  async findAll(userId: string): Promise<Project[]> {
    const allProjects = await this.prisma.projects.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return allProjects.map(PrismaProjectMappers.toDomain);
  }

  async findById(projectId: string): Promise<Project | null> {
    const project = await this.prisma.projects.findFirst({
      where: { id: projectId },
    });
    if (!project) null;

    return PrismaProjectMappers.toDomain(project);
  }

  async deleteById(projectId: string): Promise<void> {
    await this.prisma.projects.delete({
      where: { id: projectId },
    });
  }
}
