import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Session,
  UseGuards,
  // UseInterceptors,
  // ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
// import { AuthGuard } from 'src/guards/auth.guard';
import { User } from './user.entity';
// import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

@Controller('auth')
@Serialize(UserDto)
// @UseInterceptors(CurrentUserInterceptor)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  // @Get('/whoami')
  // whoAmI(@Session() session: any) {
  //   return this.usersService.findOneById(session.userId);
  // }
  @Get('/whoami')
  // @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signup')
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(
      createUserDto.email,
      createUserDto.password,
    );
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() createUserDto: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(
      createUserDto.email,
      createUserDto.password,
    );
    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @Get()
  findAll(email: string) {
    return this.usersService.find(email);
  }

  // @UseInterceptors(new SerializeInterceptor(UserDto))
  // @Serialize(UserDto)
  @Get('/:id')
  findOneById(@Param('id') id: number) {
    const user = this.usersService.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Get('/:email')
  findEmail(@Param('email') email: string) {
    return this.usersService.findEmail(email);
  }

  @Patch('/:id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('/:id')
  @HttpCode(204)
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
