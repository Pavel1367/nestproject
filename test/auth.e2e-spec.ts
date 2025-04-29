import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from '../src/review/dto/create-review.dto';
import { Types, disconnect, DeleteResult } from 'mongoose';
import { ReviewModel } from '../src/review/review.model';
import { AuthDto } from '../src/auth/dto/auth.dto';
import { UserModel } from '../src/auth/user.model';

const productId = new Types.ObjectId().toHexString();
const testDTO: CreateReviewDto = {
  description: 'Test description',
  name: 'Test',
  title: 'Title',
  rating: 5,
  productId,
};
const loginDTO: AuthDto = {
  login: 'test2@mail.ru',
  password: '123',
};
describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  test('/auth/register (POST)', async () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send(loginDTO)
      .expect(201)
      .then(({ body }: request.Response) => {
        const typedBody = body as UserModel;
        expect(typedBody.email).toBeDefined();
      });
  });

  test('/auth/delete (POST)', async () => {
    return request(app.getHttpServer())
      .post('/auth/delete')
      .query({ email: loginDTO.login })
      .expect(200)
      .then(({ body }: request.Response) => {
        const typedBody = body as DeleteResult;
        console.log(typedBody, 'tb');
        expect(typedBody.deletedCount).toBeDefined();
      });
  });

  afterAll(() => {
    disconnect();
  });
});
