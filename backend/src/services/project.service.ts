import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ProjectFilters {
  featured?: boolean;
  tag?: string;
  search?: string;
}

interface CreateProjectData {
  slug: string;
  title: string;
  description: string;
  link: string;
  githubUrl?: string;
  tags: string[];
  image?: string;
  faicon: string;
  featured?: boolean;
  language?: string;
}

export class ProjectService {
  async getAllProjects(filters: ProjectFilters = {}) {
    const where: any = {};

    if (filters.featured) {
      where.featured = true;
    }

    if (filters.tag) {
      where.tags = {
        has: filters.tag
      };
    }

    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
        { tags: { hasSome: [filters.search] } }
      ];
    }

    return await prisma.project.findMany({
      where,
      orderBy: [
        { featured: 'desc' },
        { stars: 'desc' },
        { createdAt: 'desc' }
      ]
    });
  }

  async getProjectBySlug(slug: string) {
    return await prisma.project.findUnique({
      where: { slug }
    });
  }

  async createProject(data: CreateProjectData) {
    return await prisma.project.create({
      data: {
        ...data,
        slug: this.generateSlug(data.title)
      }
    });
  }

  async updateProject(slug: string, data: Partial<CreateProjectData>) {
    return await prisma.project.update({
      where: { slug },
      data: {
        ...data,
        updatedAt: new Date()
      }
    });
  }

  async deleteProject(slug: string) {
    return await prisma.project.delete({
      where: { slug }
    });
  }

  async getProjectStats() {
    const totalProjects = await prisma.project.count();
    const featuredProjects = await prisma.project.count({
      where: { featured: true }
    });
    
    const totalStars = await prisma.project.aggregate({
      _sum: { stars: true }
    });

    const languageStats = await prisma.project.groupBy({
      by: ['language'],
      _count: true,
      where: {
        language: { not: null }
      }
    });

    return {
      totalProjects,
      featuredProjects,
      totalStars: totalStars._sum.stars || 0,
      languageStats
    };
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}
