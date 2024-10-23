import { ValueObject } from "../core/domain/ValueObject";
import { Result } from "../core/logic/Result";
import { Guard } from "../core/logic/Guard";
import * as bcrypt from 'bcrypt-nodejs';

interface UserPasswordProps {
  value: string;
  hashed?: boolean;
}

export class UserPassword extends ValueObject<UserPasswordProps> {
  
  get value (): string {
    return this.props.value;
  }

  private constructor (props) {
    super(props)
  }

    /**
   * @method comparePassword
   * @desc Compares as plain-text and hashed password.
   */

  public async comparePassword (plainTextPassword: string): Promise<boolean> {
    let hashed: string;
    if (this.isAlreadyHashed()) {
      hashed = this.props.value;
      return this.bcryptCompare(plainTextPassword, hashed);
    } else {
      return this.props.value === plainTextPassword;
    }
  }

  private bcryptCompare (plainText: string, hashed: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plainText, hashed, (err, compareResult) => {
        if (err) return resolve(false);
        return resolve(compareResult);
      })
    })
  }

  public isAlreadyHashed (): boolean {
    return this.props.hashed;
  }
  
  private hashPassword (password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, null, null, (err, hash) => {
        if (err) return reject(err);
        resolve(hash)
      })
    })
  }

  public getHashedValue (): Promise<string> {
    return new Promise((resolve) => {
      if (this.isAlreadyHashed()) {
        return resolve(this.props.value);
      } else {
        return resolve(this.hashPassword(this.props.value))
      }
    })
  }

  private static meetsComplexityCriteria(value: string): boolean {
    // Mínimo 10 caracteres
    if (value.length < 10) {
      return false;
    }
  
    // Pelo menos 1 letra maiúscula
    if (!/[A-Z]/.test(value)) {
      return false;
    }
  
    // Pelo menos 1 letra minúscula
    if (!/[a-z]/.test(value)) {
      return false;
    }
  
    // Pelo menos 1 dígito
    if (!/\d/.test(value)) {
      return false;
    }
  
    // Pelo menos 1 símbolo
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return false;
    }
  
    return true;
  }

  public static create (props: UserPasswordProps): Result<UserPassword> {
    const propsResult = Guard.againstNullOrUndefined(props.value, 'password');

    if (!propsResult.succeeded) {
      return Result.fail<UserPassword>(propsResult.message);
    } else {

      if (!props.hashed) {
        if (!this.meetsComplexityCriteria(props.value)
        ) {
          return Result.fail<UserPassword>('Password doesnt meet criteria [1 uppercase, 1 lowercase, one digit, one symbol and 10 chars min].');
        }
      }

      return Result.ok<UserPassword>(new UserPassword({
        value: props.value,
        hashed: !!props.hashed === true
      }));
    }
  }
}