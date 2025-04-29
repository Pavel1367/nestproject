import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from '../src/review/dto/create-review.dto';
import { Types, disconnect } from 'mongoose';
import { ReviewModel } from '../src/review/review.model';
import { AuthDto } from '../src/auth/dto/auth.dto';

const productId = new Types.ObjectId().toHexString();
const testDTO: CreateReviewDto = {
	description: 'Test description',
	name: 'Test',
	title: 'Title',
	rating: 5,
	productId,
};
const loginDTO: AuthDto ={
  login: 'test@mail.ru',
  password: '123'
}
describe('AppController (e2e)', () => {
	let app: INestApplication<App>;
	let createdId: string;
  let token = ''
	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();

    const res = await request(app.getHttpServer()).post('/auth/login').send(loginDTO)
    token = res.body.access_token;
	});

	test('/review/create (POST)', async () => {
		return request(app.getHttpServer())
			.post('/review/create')
			.send(testDTO)
			.expect(201)
			.then(({ body }: request.Response) => {
				console.log(body);
				const typedBody = body as ReviewModel;
				createdId = typedBody._id as string;
				expect(createdId).toBeDefined();
			});
	});
	test('/review/create (POST) - fail', () => {
		return request(app.getHttpServer())
      .post('/review/create')
      .send({ ...testDTO, rating: 0 })
      .expect(400)

	});
	test('/byProduct/:productId (GET) - success', async () => {
		return request(app.getHttpServer())
			.get('/review/byProduct/' + productId)
      .set('Authorization', `Bearer ${token}`)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.length).toBeGreaterThan(0);
			});
	});
	test('/byProduct/:productId (GET) - fail', async () => {
		return request(app.getHttpServer())
			.get('/review/byProduct/' + new Types.ObjectId().toHexString())
      .set('Authorization', `Bearer ${token}`)
			.expect(200)
			.then(({ body }: request.Response) => {
				expect(body.length).toBe(0);
			});
	});
	test('/review/:id (DELETE)', async () => {
		return request(app.getHttpServer())
			.delete('/review/' + createdId)
      .set('Authorization', `Bearer ${token}`)
			.expect(200);
	});
	afterAll(() => {
		disconnect();
	});
});
