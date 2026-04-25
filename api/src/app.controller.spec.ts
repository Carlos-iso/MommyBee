import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../src/auth/auth.controller';
import { AuthService } from '../src/auth/auth.service';
import { MommyController } from '../src/modules/mommy/mommy.controller';
import { MommyService } from '../src/modules/mommy/mommy.service';
import { SellerController } from '../src/modules/seller/seller.controller';
import { SellerService } from '../src/modules/seller/seller.service';

describe('All Routes (Unit Tests)', () => {
  let authController: AuthController;
  let mommyController: MommyController;
  let sellerController: SellerController;

  const mockAuthService = {
    register: jest
      .fn()
      .mockResolvedValue({ _id: 'user-id', access_token: 'mock-token' }),
    login: jest.fn().mockResolvedValue({ access_token: 'mock-token' }),
    getProfile: jest.fn().mockResolvedValue({
      _id: 'user-id',
      email: 'test@example.com',
      name: 'Test User',
    }),
    updateProfile: jest
      .fn()
      .mockResolvedValue({ _id: 'user-id', name: 'Updated Name' }),
  };

  const mockMommyService = {
    findById: jest
      .fn()
      .mockResolvedValue({ _id: 'mommy-id', pregnancies: 2, children: 2 }),
    create: jest
      .fn()
      .mockResolvedValue({ _id: 'mommy-id', pregnancies: 2, children: 2 }),
    update: jest.fn().mockResolvedValue({ _id: 'mommy-id', pregnancies: 3 }),
  };

  const mockSellerService = {
    apply: jest.fn().mockResolvedValue({
      _id: 'seller-id',
      status: 'pending',
      storeName: 'Test Store',
    }),
    getMySeller: jest.fn().mockResolvedValue({
      _id: 'seller-id',
      status: 'approved',
      storeName: 'Test Store',
    }),
    getMyDashboard: jest.fn().mockResolvedValue({
      seller: { _id: 'seller-id' },
      orders: [],
      products: [],
    }),
    updateMyProfile: jest
      .fn()
      .mockResolvedValue({ _id: 'seller-id', storeName: 'Updated Store' }),
    findAllPending: jest
      .fn()
      .mockResolvedValue([{ _id: 'seller-id', status: 'pending' }]),
    approve: jest
      .fn()
      .mockResolvedValue({ _id: 'seller-id', status: 'approved' }),
    reject: jest
      .fn()
      .mockResolvedValue({ _id: 'seller-id', status: 'rejected' }),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AuthController, MommyController, SellerController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: MommyService, useValue: mockMommyService },
        { provide: SellerService, useValue: mockSellerService },
      ],
    }).compile();

    authController = moduleFixture.get<AuthController>(AuthController);
    mommyController = moduleFixture.get<MommyController>(MommyController);
    sellerController = moduleFixture.get<SellerController>(SellerController);
  });

  describe('AuthController Routes', () => {
    const testUser = {
      name: 'Test User',
      email: 'test@example.com',
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

    it('POST /auth/register - should register new user', async () => {
      const result = await authController.register(testUser);
      expect(result).toHaveProperty('access_token');
      expect(mockAuthService.register).toHaveBeenCalledWith(testUser);
    });

    it('POST /auth/login - should login user', async () => {
      const result = await authController.login({
        email: testUser.email,
        password: testUser.password,
      });
      expect(result).toHaveProperty('access_token');
      expect(mockAuthService.login).toHaveBeenCalledWith({
        email: testUser.email,
        password: testUser.password,
      });
    });

    it('GET /auth/me - should get profile', async () => {
      const mockUser = { id: 'test-user-id', email: 'test@example.com' };
      const result = await authController.getProfile(mockUser as any);
      expect(result).toHaveProperty('email');
      expect(mockAuthService.getProfile).toHaveBeenCalledWith('test-user-id');
    });

    it('PUT /auth/me - should update profile', async () => {
      const mockUser = { id: 'test-user-id', email: 'test@example.com' };
      const result = await authController.update(mockUser as any, {
        name: 'Updated Name',
      });
      expect(result.name).toBe('Updated Name');
      expect(mockAuthService.updateProfile).toHaveBeenCalledWith(
        'test-user-id',
        { name: 'Updated Name' },
      );
    });
  });

  describe('MommyController Routes', () => {
    it('GET /mommy/:id - should get mommy by id', async () => {
      const result = await mommyController.getById('test-id');
      expect(result).toHaveProperty('_id');
      expect(mockMommyService.findById).toHaveBeenCalledWith('test-id');
    });

    it('POST /mommy/create - should create mommy', async () => {
      const result = await mommyController.create({
        userId: 'user-id',
        pregnancies: 2,
        children: 2,
        dueDate: '2025-06-15',
        birthPlan: 'normal',
      });
      expect(result).toHaveProperty('_id');
      expect(mockMommyService.create).toHaveBeenCalled();
    });

    it('POST /mommy/update - should update mommy', async () => {
      const mockUser = { id: 'test-user-id', email: 'test@example.com' };
      const result = await mommyController.update(mockUser as any, {
        pregnancies: 3,
      });
      expect(result).toHaveProperty('_id');
      expect(mockMommyService.update).toHaveBeenCalled();
    });

    it('GET /mommy/me - should get current user', async () => {
      const mockUser = { id: 'test-user-id', email: 'test@example.com' };
      const result = await mommyController.getMe(mockUser as any);
      expect(result).toHaveProperty('id');
    });
  });

  describe('SellerController Routes', () => {
    it('POST /sellers/apply - should apply as seller', async () => {
      const mockUser = { id: 'test-user-id', email: 'test@example.com' };
      const result = await sellerController.apply(mockUser as any, {
        storeName: 'Test Store',
        storeDescription: 'Test Description',
        cpf: '12345678901',
      });
      expect(result).toHaveProperty('_id');
      expect(mockSellerService.apply).toHaveBeenCalled();
    });

    it('GET /sellers/me - should get my seller status', async () => {
      const mockUser = { id: 'test-user-id', email: 'test@example.com' };
      const result = await sellerController.getMyStatus(mockUser as any);
      expect(result).toHaveProperty('status');
      expect(mockSellerService.getMySeller).toHaveBeenCalledWith(
        'test-user-id',
      );
    });

    it('GET /sellers/dashboard/:sellerId - should get dashboard', async () => {
      const result = await sellerController.getDashboard('seller-id');
      expect(result).toHaveProperty('seller');
      expect(mockSellerService.getMyDashboard).toHaveBeenCalledWith(
        'seller-id',
      );
    });

    it('PUT /sellers/me - should update seller profile', async () => {
      const mockUser = { id: 'test-user-id', email: 'test@example.com' };
      const result = await sellerController.update(mockUser as any, {
        storeName: 'Updated Store',
      });
      expect(result.storeName).toBe('Updated Store');
    });

    it('GET /sellers/pending - should get pending sellers', async () => {
      const result = await sellerController.findAllPending();
      expect(Array.isArray(result)).toBe(true);
      expect(mockSellerService.findAllPending).toHaveBeenCalled();
    });

    it('PUT /sellers/:sellerId/approve - should approve seller', async () => {
      const result = await sellerController.approve('seller-id');
      expect(result).toHaveProperty('status', 'approved');
      expect(mockSellerService.approve).toHaveBeenCalledWith('seller-id');
    });

    it('PUT /sellers/:sellerId/reject - should reject seller', async () => {
      const result = await sellerController.reject('seller-id');
      expect(result).toHaveProperty('status', 'rejected');
      expect(mockSellerService.reject).toHaveBeenCalledWith('seller-id');
    });
  });

  describe('All Routes Summary', () => {
    it('should have tested all auth routes', () => {
      expect(typeof authController.register).toBe('function');
      expect(typeof authController.login).toBe('function');
      expect(typeof authController.getProfile).toBe('function');
      expect(typeof authController.update).toBe('function');
    });

    it('should have tested all mommy routes', () => {
      expect(typeof mommyController.getMe).toBe('function');
      expect(typeof mommyController.getById).toBe('function');
      expect(typeof mommyController.create).toBe('function');
      expect(typeof mommyController.update).toBe('function');
    });

    it('should have tested all seller routes', () => {
      expect(typeof sellerController.apply).toBe('function');
      expect(typeof sellerController.getMyStatus).toBe('function');
      expect(typeof sellerController.getDashboard).toBe('function');
      expect(typeof sellerController.update).toBe('function');
      expect(typeof sellerController.findAllPending).toBe('function');
      expect(typeof sellerController.approve).toBe('function');
      expect(typeof sellerController.reject).toBe('function');
    });
  });
});
