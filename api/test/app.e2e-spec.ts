import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('All Routes (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let testUserId: string;

  const testUser = {
    name: 'Test User',
    email: `test${Date.now()}@example.com`,
    password: 'password123',
    cpf: '12345678901',
    phone: '11999999999',
    birthDate: '2000-01-01',
    zipCode: '01234567',
    street: 'Test Street',
    number: '123',
    complement: 'Apt 1',
    neighborhood: 'Test Neighborhood',
    city: 'Test City',
    state: 'SP',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Root Routes', () => {
    it('/ (GET) - should return Hello World!', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Hello World!');
    });
  });

  describe('Auth Routes', () => {
    it('/auth/register (POST) - should register a new user', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(testUser)
        .expect(201);

      expect(response.body).toHaveProperty('access_token');
      expect(response.body).toHaveProperty('_id');
      token = response.body.access_token;
      testUserId = response.body._id;
    });

    it('/auth/register (POST) - should fail with duplicate email', async () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send(testUser)
        .expect(400);
    });

    it('/auth/login (POST) - should login with valid credentials', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: testUser.email, password: testUser.password })
        .expect(201);

      expect(response.body).toHaveProperty('access_token');
    });

    it('/auth/login (POST) - should fail with invalid password', async () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: testUser.email, password: 'wrongpassword' })
        .expect(401);
    });

    it('/auth/login (POST) - should fail with invalid email', async () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'nonexistent@example.com', password: 'password123' })
        .expect(401);
    });

    it('/auth/me (GET) - should get current user profile', async () => {
      const response = await request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body).toHaveProperty('_id');
      expect(response.body.email).toBe(testUser.email);
    });

    it('/auth/me (GET) - should fail without token', async () => {
      return request(app.getHttpServer()).get('/auth/me').expect(401);
    });

    it('/auth/me (PUT) - should update user profile', async () => {
      const response = await request(app.getHttpServer())
        .put('/auth/me')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Updated Name' })
        .expect(201);

      expect(response.body.name).toBe('Updated Name');
    });
  });

  describe('Mommy Routes', () => {
    it('/mommy/me (GET) - should get current mommy', async () => {
      const response = await request(app.getHttpServer())
        .get('/mommy/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body).toHaveProperty('_id');
    });

    it('/mommy/me (GET) - should fail without token', async () => {
      return request(app.getHttpServer()).get('/mommy/me').expect(401);
    });

    it('/mommy/:id (GET) - should get mommy by id', async () => {
      const response = await request(app.getHttpServer())
        .get(`/mommy/${testUserId}`)
        .expect(200);

      expect(response.body).toHaveProperty('_id');
    });

    it('/mommy/create (POST) - should create mommy profile', async () => {
      const response = await request(app.getHttpServer())
        .post('/mommy/create')
        .send({
          userId: testUserId,
          pregnancies: 2,
          children: 2,
          dueDate: '2025-06-15',
          birthPlan: 'normal',
        })
        .expect(201);

      expect(response.body).toHaveProperty('_id');
    });

    it('/mommy/update (POST) - should update mommy profile', async () => {
      const response = await request(app.getHttpServer())
        .post('/mommy/update')
        .set('Authorization', `Bearer ${token}`)
        .send({ pregnancies: 3 })
        .expect(201);

      expect(response.body).toHaveProperty('_id');
    });
  });

  describe('Seller Routes', () => {
    it('/sellers/me (GET) - should get my seller status', async () => {
      const response = await request(app.getHttpServer())
        .get('/sellers/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body).toHaveProperty('status');
    });

    it('/sellers/apply (POST) - should apply as seller', async () => {
      const response = await request(app.getHttpServer())
        .post('/sellers/apply')
        .set('Authorization', `Bearer ${token}`)
        .send({
          storeName: 'Test Store',
          storeDescription: 'Test Description',
          cnpj: '12345678901234',
        })
        .expect(201);

      expect(response.body).toHaveProperty('_id');
    });

    it('/sellers/me (PUT) - should update seller profile', async () => {
      const response = await request(app.getHttpServer())
        .put('/sellers/me')
        .set('Authorization', `Bearer ${token}`)
        .send({ storeName: 'Updated Store Name' })
        .expect(201);

      expect(response.body.storeName).toBe('Updated Store Name');
    });

    it('/sellers/pending (GET) - should get pending sellers', async () => {
      const response = await request(app.getHttpServer())
        .get('/sellers/pending')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    it('/sellers/dashboard/:sellerId (GET) - should get seller dashboard', async () => {
      const response = await request(app.getHttpServer())
        .get(`/sellers/dashboard/${testUserId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body).toHaveProperty('seller');
    });

    it('/sellers/:sellerId/approve (PUT) - should approve seller', async () => {
      const response = await request(app.getHttpServer())
        .put(`/sellers/${testUserId}/approve`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body).toHaveProperty('status', 'approved');
    });

    it('/sellers/:sellerId/reject (PUT) - should reject seller', async () => {
      const response = await request(app.getHttpServer())
        .put(`/sellers/${testUserId}/reject`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body).toHaveProperty('status', 'rejected');
    });
  });
});
