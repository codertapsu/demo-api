import { UserRole } from '../../../constants';

export class AuthenticationEntity {
  public password: string;
  public username: string;
  public roles: UserRole[];
}
