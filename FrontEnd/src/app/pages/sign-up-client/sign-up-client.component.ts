import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

interface SignupForm {
  name: FormControl,
  phone: FormControl,
  cpf: FormControl,
  birth: FormControl,
  email: FormControl,
  password: FormControl,
  passwordConfirm: FormControl
}

@Component({
  selector: 'app-sign-up-client',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './sign-up-client.component.html',
   styleUrl: './sign-up-client.component.scss'
})
export class SignUpClientComponent {
  signupForm!: FormGroup<SignupForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ){
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      cpf: new FormControl('', [Validators.required, Validators.minLength(11)]),
      phone: new FormControl('', [Validators.required, Validators.minLength(11)]),
      birth: new FormControl('', [Validators.required, Validators.minLength(8)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  submit(){
    this.loginService.signup(this.signupForm.value.name, this.signupForm.value.phone, this.signupForm.value.cpf, this.signupForm.value.birth, this.signupForm.value.email, this.signupForm.value.password, "cliente").subscribe({
      next: () =>  { this.toastService.success("Cadastro feito com sucesso!")
                           this.router.navigate(["/login"]) },
      error: () => this.toastService.error("Erro inesperado! Tente novamente mais tarde")
    })
  }

  navigate(){
    this.router.navigate(["login"])
  }
}

