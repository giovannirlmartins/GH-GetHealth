import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

type SignupFormKeys = keyof SignupForm;

interface SignupForm {
  name: FormControl<string | null>;
  phone: FormControl<string | null>;
  cpf: FormControl<string | null>;
  birth: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  passwordConfirm: FormControl<string | null>;
}

@Component({
  selector: 'app-sign-up-professional',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent,
  ],
  providers: [LoginService],
  templateUrl: './sign-up-professional.component.html',
  styleUrls: ['./sign-up-professional.component.scss'],
})
export class SignUpProfessionalComponent {
  signupForm!: FormGroup<SignupForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ) {
    this.signupForm = new FormGroup<SignupForm>(
      {
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        phone: new FormControl('', [Validators.required, Validators.pattern(/^\(\d{2}\) \d{4,5}-\d{4}$/)]),
        cpf: new FormControl('', [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)]),
        birth: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
      },
      { validators: this.passwordsMatchValidator() }
    );
  }

  /** Custom Validator: Verifica se as senhas coincidem */
  passwordsMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const passwordConfirm = control.get('passwordConfirm')?.value;

      return password && passwordConfirm && password !== passwordConfirm
        ? { passwordsDoNotMatch: true }
        : null;
    };
  }

  /** Exibe mensagens de erro ou realiza o envio */
  submit(): void {
    if (this.signupForm.invalid) {
      this.displayValidationErrors();
      return;
    }

    const { name, phone, cpf, birth, email, password } = this.signupForm.value;

    this.loginService.signup(name!, phone!, cpf!, birth!, email!, password!, 'professional').subscribe({
      next: () => {
        this.toastService.success('Cadastro realizado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erro ao cadastrar:', err);
        this.toastService.error('Erro inesperado! Tente novamente mais tarde.');
      },
    });
  }

  /** Exibe erros de validação */
  displayValidationErrors(): void {
    const controls = this.signupForm.controls;
    (Object.keys(controls) as SignupFormKeys[]).forEach((key) => {
      const control = controls[key];
      if (control.errors) {
        if (control.hasError('required')) {
          this.toastService.error(`O campo "${key}" é obrigatório.`);
        } else if (control.hasError('minlength')) {
          this.toastService.error(
            `O campo "${key}" deve ter no mínimo ${control.errors?.['minlength'].requiredLength} caracteres.`
          );
        } else if (control.hasError('email')) {
          this.toastService.error(`O campo "email" deve conter um endereço válido.`);
        } else if (control.hasError('pattern')) {
          this.toastService.error(`O campo "${key}" está em um formato inválido.`);
        }
      }
    });

    if (this.signupForm.hasError('passwordsDoNotMatch')) {
      this.toastService.error('As senhas não coincidem.');
    }
  }

  /** Navega para a tela de login */
  navigate(): void {
    this.router.navigate(['/login']);
  }
}
