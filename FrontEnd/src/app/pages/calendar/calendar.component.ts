import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

interface UserDetails {
  createdAt: string;
  name: string;
  email: string;
  // Adicione outras propriedades conforme necessário
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  
  isMenuVisible = false;
  agendamentosDoDia: string = "Você ainda não utilizou nenhum serviço";

  userDetails: UserDetails | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUserDetails();
  }

  /**
   * Carrega os detalhes do usuário autenticado.
   */
  loadUserDetails(): void {
    const email = sessionStorage.getItem('userEmail');
    if (!email) {
      console.error('Email do usuário não encontrado na sessão.');
      this.router.navigate(['/login']); // Redireciona para login
      return;
    }

    this.userService.getUserDetails(email).subscribe({
      next: (data: UserDetails) => {
        this.userDetails = data;
      },
      error: (err) => {
        console.error('Erro ao carregar detalhes do usuário:', err);
        this.router.navigate(['/login']); // Redireciona para login em caso de erro
      }
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  showMenu(){
    this.isMenuVisible = !this.isMenuVisible;
  }

  openNotification(){

  }


}
