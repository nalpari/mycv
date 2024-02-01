import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOneById: (id: number) => {
        return Promise.resolve({
          id,
          email: 'nalpari0628@daum.net',
          password: 'qwert!@#45',
        } as User);
      },
      find: (email: string) => {
        return Promise.resolve([
          { id: 1, email, password: 'qwert!@#45' },
        ]) as Promise<User[]>;
      },
      // remove: () => {},
      // update: () => {},
    };
    fakeAuthService = {
      // signup: () => Promise.resolve({ id: 1, email: '', password: '' }),
      signin: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a list of users with the given email', async () => {
    const users = await controller.findAll('yoo32767@gmail.com');
    expect(users.length).toBeGreaterThan(0);
    expect(users[0].email).toEqual('yoo32767@gmail.com');
  });

  it('아이디로 유저를 찾아서 반환한다.', async () => {
    const user = await controller.findOneById(1);
    expect(user.email).toEqual('nalpari0628@daum.net');
  });

  // it('유저를 찾지 못하면 에러를 반환한다.', async () => {
  //   fakeUsersService.findOneById = () => null;
  //   await expect(controller.findOneById(1)).rejects.toThrow(NotFoundException);
  // });

  it('signin 유저를 찾아서 세션과 함께 반환한다.', async () => {
    const session = { userId: -1 };
    const user = await controller.signin(
      { email: 'nalpari0628@daum.net', password: 'qwert!@#45' },
      session,
    );

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
