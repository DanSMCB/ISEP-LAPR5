import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserRoleService } from '../../services/user-role-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginSupComponent {
  selectedRole: string = '';

  constructor(private router: Router, private userRoleService: UserRoleService) {}

  login() {
    this.userRoleService.setUserRole(this.selectedRole);
    this.router.navigate(['/home']);
  }
}