import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { UserId } from "./userId";
import { UserEmail } from "./userEmail";
import { UserPassword } from "./userPassword";
import { Guard } from "../core/logic/Guard";


interface UserProps {
  firstName: string;
  lastName: string;
  email: UserEmail;
  password: string;
  role: string;
  phone: string;
  taxpayer: string;
  state: string;
}

export class User extends AggregateRoot<UserProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get userId (): UserId {
    return UserId.caller(this.id);
  }

  get email (): UserEmail {
    return this.props.email;
  }

  get firstName (): string {
    return this.props.firstName;
  }

  get lastName (): string {
    return this.props.lastName;
  }

  get password (): string {
    return this.props.password;
  }

  get role (): string {
    return this.props.role;
  }
  
  set role (value: string) {
      this.props.role = value;
  }

  get phone (): string {
    return this.props.phone;
  }

  get taxpayer (): string {
    return this.props.taxpayer;
  }

  get state (): string {
    return this.props.state;
  }

  set firstName (value: string) {
    this.props.firstName=value;
  }

  set lastName (value: string) {
    this.props.lastName=value;
  }

  set phone (value: string) {
    this.props.phone=value;
  }

  set taxpayer (value: string) {
    this.props.taxpayer=value;
  }

  set state (value: string) {
    this.props.state=value;
  }

  set email(value: UserEmail) {
    this.props.email = value;
  }

  set password(value: string) {
    this.props.password = value;
  }

  private constructor (props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: UserProps, id?: UniqueEntityID): Result<User> {

    const guardedProps = [
      { argument: props.firstName, argumentName: 'firstName' },
      { argument: props.lastName, argumentName: 'lastName' },
      { argument: props.email, argumentName: 'email' },
      { argument: props.role, argumentName: 'role' },
      { argument: props.phone, argumentName: 'phone' },
      { argument: props.taxpayer, argumentName: 'taxpayer' },
      { argument: props.state, argumentName: 'state' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<User>(guardResult.message)
    }     
    else {
      const user = new User({
        ...props
      }, id);

      return Result.ok<User>(user);
    }
  }
}