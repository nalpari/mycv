import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    // See if email is in use
    const user = await this.userService.findEmail(email);
    if (user) {
      throw new BadRequestException('Email in use');
    }
    // If email is in use, throw an error
    // If email is not in use, hash the password
    // Create a new user and save it
  }

  signin() {}
}
