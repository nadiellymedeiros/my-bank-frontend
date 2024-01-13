import { CanActivateFn, Router } from '@angular/router';

export const autenticarGuard: CanActivateFn = (route, state) => {
  //importar a classe Router
  const rota = new Router();

  //validação
  if (localStorage.getItem('email') == undefined) {
    rota.navigateByUrl('/login');
  }

  return true;
};
