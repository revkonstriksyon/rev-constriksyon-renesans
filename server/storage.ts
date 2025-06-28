import { 
  users, blogs, projects, services, static_content,
  type User, type InsertUser, type Blog, type InsertBlog,
  type Project, type InsertProject, type Service, type InsertService,
  type StaticContent, type InsertStaticContent
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Blog methods
  getBlogs(): Promise<Blog[]>;
  getBlogBySlug(slug: string): Promise<Blog | undefined>;
  createBlog(blog: InsertBlog): Promise<Blog>;
  updateBlog(id: string, blog: Partial<InsertBlog>): Promise<Blog | undefined>;
  deleteBlog(id: string): Promise<boolean>;

  // Project methods
  getProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<boolean>;

  // Service methods
  getServices(): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: string, service: Partial<InsertService>): Promise<Service | undefined>;
  deleteService(id: string): Promise<boolean>;

  // Static content methods
  getStaticContent(): Promise<StaticContent[]>;
  getStaticContentByKey(key: string): Promise<StaticContent | undefined>;
  updateStaticContent(key: string, content: Partial<InsertStaticContent>): Promise<StaticContent | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Blog methods
  async getBlogs(): Promise<Blog[]> {
    return await db.select().from(blogs).where(eq(blogs.published, true));
  }

  async getBlogBySlug(slug: string): Promise<Blog | undefined> {
    const result = await db.select().from(blogs).where(and(eq(blogs.slug, slug), eq(blogs.published, true)));
    return result[0];
  }

  async createBlog(blog: InsertBlog): Promise<Blog> {
    const result = await db.insert(blogs).values(blog).returning();
    return result[0];
  }

  async updateBlog(id: string, blog: Partial<InsertBlog>): Promise<Blog | undefined> {
    const result = await db.update(blogs).set(blog).where(eq(blogs.id, id)).returning();
    return result[0];
  }

  async deleteBlog(id: string): Promise<boolean> {
    const result = await db.delete(blogs).where(eq(blogs.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Project methods
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects).where(eq(projects.published, true));
  }

  async createProject(project: InsertProject): Promise<Project> {
    const result = await db.insert(projects).values(project).returning();
    return result[0];
  }

  async updateProject(id: string, project: Partial<InsertProject>): Promise<Project | undefined> {
    const result = await db.update(projects).set(project).where(eq(projects.id, id)).returning();
    return result[0];
  }

  async deleteProject(id: string): Promise<boolean> {
    const result = await db.delete(projects).where(eq(projects.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Service methods
  async getServices(): Promise<Service[]> {
    return await db.select().from(services).where(eq(services.published, true));
  }

  async createService(service: InsertService): Promise<Service> {
    const result = await db.insert(services).values(service).returning();
    return result[0];
  }

  async updateService(id: string, service: Partial<InsertService>): Promise<Service | undefined> {
    const result = await db.update(services).set(service).where(eq(services.id, id)).returning();
    return result[0];
  }

  async deleteService(id: string): Promise<boolean> {
    const result = await db.delete(services).where(eq(services.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  // Static content methods
  async getStaticContent(): Promise<StaticContent[]> {
    return await db.select().from(static_content);
  }

  async getStaticContentByKey(key: string): Promise<StaticContent | undefined> {
    const result = await db.select().from(static_content).where(eq(static_content.key, key));
    return result[0];
  }

  async updateStaticContent(key: string, content: Partial<InsertStaticContent>): Promise<StaticContent | undefined> {
    const result = await db.update(static_content).set(content).where(eq(static_content.key, key)).returning();
    return result[0];
  }
}

export const storage = new DatabaseStorage();
