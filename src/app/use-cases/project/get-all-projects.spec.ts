import { makeProject } from '../../../../test/factories/project-factory';
import { InMemoryProjectRepository } from '../../../../test/repositories/in-memory-project-repository';
import { GetAllProjects } from './get-all-projects';
describe('get all projects use case', () => {
  it('should get all existing projects', async () => {
    const inMemoryProject = new InMemoryProjectRepository();
    const inMemoryAllProjects = new GetAllProjects(inMemoryProject);

    await inMemoryProject.create(makeProject({ ownerId: 'id1' }));
    await inMemoryProject.create(makeProject({ ownerId: 'id1' }));
    await inMemoryProject.create(makeProject({ ownerId: 'id2' }));

    const { projects } = await inMemoryAllProjects.execute({ ownerId: 'id1' });

    expect(projects.length).toEqual(2);
  });

  it('should get empty projects if the id is not the same', async () => {
    const inMemoryProject = new InMemoryProjectRepository();
    const inMemoryAllProjects = new GetAllProjects(inMemoryProject);

    await inMemoryProject.create(makeProject({ ownerId: 'id1' }));

    const { projects } = await inMemoryAllProjects.execute({
      ownerId: 'another-id',
    });

    expect(projects).toEqual([]);
    expect(projects.length).toEqual(0);
  });
});
