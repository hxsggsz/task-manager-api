import { UserInfoName } from '../../src/app/entities/user/user-info-name';
import { User, UserProps } from '../../src/app/entities/user/user';
import { UserInfoUsername } from '../../src/app/entities/user/user-info-username';
import { UserInfoEmail } from '../../src/app/entities/user/user-info-email';
import { UserInfoProfilePhoto } from '../../src/app/entities/user/user-info-profile-photo';
import { UserInfoPassword } from '../../src/app/entities/user/user-info-password';
import { Override } from '../../src/helpers/override';

export function makeUser(override: Override<UserProps> = {}): User {
  return new User({
    name: new UserInfoName('test'),
    username: new UserInfoUsername('username'),
    email: new UserInfoEmail('test@gmail.com'),
    profilePhoto: new UserInfoProfilePhoto('https://image.com'),
    password: new UserInfoPassword('teste!A1'),
    ...override,
  });
}
