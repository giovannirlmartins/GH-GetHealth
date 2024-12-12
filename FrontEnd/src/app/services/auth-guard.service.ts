import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard = () => {
  const router = inject(Router);
  const authToken = sessionStorage.getItem('auth-token');

  if (authToken) {
    // Validação do token (opcional)
    if (isTokenValid(authToken)) {
      return true;
    } else {
      // Token inválido ou expirado
      clearSession();
      router.navigate(['/login']);
      return false;
    }
  } else {
    // Sem token, redireciona para login
    router.navigate(['/login']);
    return false;
  }
};

/**
 * Função para validar o token JWT.
 * Substitua com a lógica do seu projeto, se necessário.
 */
function isTokenValid(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica o payload do JWT
    const currentTime = Math.floor(Date.now() / 1000); // Tempo atual em segundos
    return payload.exp && payload.exp > currentTime; // Verifica se o token não expirou
  } catch (error) {
    return false; // Retorna falso se o token for inválido
  }
}

/**
 * Limpa a sessão ao detectar um token inválido.
 */
function clearSession(): void {
  sessionStorage.removeItem('auth-token');
  sessionStorage.removeItem('username');
}
