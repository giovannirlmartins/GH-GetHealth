import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importar FormsModule para usar ngModel

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule], // Adicionar FormsModule aqui
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent {
  registerType: string = ''; // Variável vinculada ao ngModel

  constructor(private router: Router) {} // Injetar o serviço Router

  submit() {
      if (this.registerType === 'professional') {
        this.router.navigate(['/signupprof']); // Navegar para a rota de profissionais
      } else if (this.registerType === 'user') {
        this.router.navigate(['/signupcli']); // Navegar para a rota de usuários
      } else {
        console.log('Tipo de registro inválido ou não selecionado');
      }
    }
}



// 
// }
