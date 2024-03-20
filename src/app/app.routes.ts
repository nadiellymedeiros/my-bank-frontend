import { Routes } from '@angular/router';
import { LoginComponent } from './paginas/login/login.component';
import { HomeComponent } from './paginas/home/home.component';
import { autenticarGuard } from './seguranca/autenticar.guard';
import { CadastroComponent } from './paginas/cadastro/cadastro.component';
import { DepositoComponent } from './componentes/deposito/deposito.component';
import { TransferenciaComponent } from './componentes/transferencia/transferencia.component';
import { SaqueComponent } from './componentes/saque/saque.component';
import { ProfileComponent } from './componentes/profile/profile.component';
import { MyCardsComponent } from './componentes/my-cards/my-cards.component';
import { AccountComponent } from './componentes/account/account.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  {
    path: 'home',
    component: HomeComponent /*, canActivate: [autenticarGuard]*/,
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'deposito', component: DepositoComponent },
  { path: 'transferencia', component: TransferenciaComponent },
  { path: 'saque', component: SaqueComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'myCards', component: MyCardsComponent },
  { path: 'account', component: AccountComponent },
];
