import { rm } from 'fs/promises';
import { join } from 'path';

global.beforeEach(async () => {
  // const moduleFixture: TestingModule = await Test.createTestingModule({
  //   imports: [AppModule],
  // }).compile();

  // app = moduleFixture.createNestApplication();
  // setupApp(app);
  // await app.init();
  try {
    await rm(join(__dirname, '..', 'test.sqlite'), { force: true });
  } catch (err) {}
});
