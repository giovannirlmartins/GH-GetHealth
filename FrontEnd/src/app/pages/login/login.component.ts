import { Component, OnInit } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser'; // Importação para alterar o título da aba

interface LoginForm {
  email: FormControl;
  password: FormControl;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // Corrigido `styleUrls` (plural)
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup<LoginForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService,
    private titleService: Title // Serviço para alterar o título da aba
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit(): void {
    // Define o título da aba do navegador ao carregar a página de login
    this.titleService.setTitle('Login');
  }

  submit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.loginService.login(email, password).subscribe({
      next: (response) => {
        // Supondo que o backend retorne um token de autenticação
        const token = response.token;

        // Armazena o token e o email no sessionStorage
        sessionStorage.setItem('authToken', token);
        sessionStorage.setItem('userEmail', email);

        this.toastService.success("Login feito com sucesso!");
        this.router.navigate(['/menu-inicial']); // Redireciona para o menu inicial
      },
      error: () => {
        this.toastService.error("Erro inesperado! Tente novamente mais tarde");
      }
    });
  }

  navigateToSignup() {
    this.router.navigate(['/signup']); // Redireciona para a página de cadastro
  }
}
