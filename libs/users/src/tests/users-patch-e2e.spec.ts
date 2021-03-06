import request from 'supertest';
import { prepareHttpTestController, stopTest } from '@utils/test/test';
import { AppModule } from '@apps/api/src/app.module';
import { TestApplicationController } from '@utils/test/model';

describe('Users patch controllers', () => {
  let app: TestApplicationController['app'];
  let users: TestApplicationController['users'];

  beforeAll(async () => {
    const testController = await prepareHttpTestController(
      AppModule,
      'users_patch'
    );
    app = testController.app;
    users = testController.users;
  });

  afterAll(() => stopTest(app));

  it('set registration token => success (/v1/users/registration-token)', async () => {
    const res = await request(app.getHttpServer())
      .patch('/v1/users/registration-token')
      .set({ Authorization: `Bearer ${users.helper.token}` })
      .send({
        uuid: 'fZIfOWUWeGQ',
        registrationToken: 'APA91bGh6bZEj6yRENLOJ9lc1yKLG3anUSksP4KMnmWoSabdpc',
      });
    expect(res.status).toBe(200);
  });

  it('set registration token using invalid access token => error 403 (/v1/users/registration-token)', async () => {
    const res = await request(app.getHttpServer())
      .patch('/v1/users/registration-token')
      .set({ Authorization: `Bearer somerandometext` })
      .send({
        uuid: 'fZIfOWUWeGQ',
        registrationToken: 'APA91bGh6bZEj6yRENLOJ9lc1yKLG3anUSksP4KMnmWoSabdpc',
      });
    expect(res.status).toBe(403);
  });

  it('set registration token with body that lacks uuid => error 400 (/v1/users/registration-token)', async () => {
    const res = await request(app.getHttpServer())
      .patch('/v1/users/registration-token')
      .set({ Authorization: `Bearer ${users.helper.token}` })
      .send({
        registrationToken: 'APA91bGh6bZEj6yRENLOJ9lc1yKLG3anUSksP4KMnmWoSabdpc',
      });
    expect(res.status).toBe(400);
  });

  it('set registration token with body that lacks registration token => error 400  (/v1/users/registration-token)', async () => {
    const res = await request(app.getHttpServer())
      .patch('/v1/users/registration-token')
      .set({ Authorization: `Bearer ${users.helper.token}` })
      .send({
        uuid: 'fZIfOWUWeGQ',
      });
    expect(res.status).toBe(400);
  });
});
