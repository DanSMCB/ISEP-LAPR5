import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { VisualizationComponent } from './components/visualization/visualization.component';
import { HomeComponent } from './components/home/home.component';
import { CreateEdificioComponent } from './components/edificio/create-edificio/create-edificio.component';
import { UpdateEdificioComponent } from './components/edificio/update-edificio/update-edificio.component';
import { ListEdificioComponent } from './components/edificio/list-edificio/list-edificio.component';
import { ListEdificioMinMaxComponent } from './components/edificio/list-edificio-min-max/list-edificio-min-max.component';
import { CreatePisoComponent } from './components/piso/create-piso/create-piso.component';
import { UpdatePisoComponent } from './components/piso/update-piso/update-piso.component';
import { ListPisoComponent } from './components/piso/list-piso/list-piso.component';
import { ListPisoConnectionComponent } from './components/piso/list-piso-connection/list-piso-connection.component';
import { UploadPisoMapComponent } from './components/piso/upload-piso-map/upload-piso-map.component';
import { CreatePassagemComponent } from './components/passagem/create-passagem/create-passagem.component';
import { UpdatePassagemComponent } from './components/passagem/update-passagem/update-passagem.component';
import { ListPassagemComponent } from './components/passagem/list-passagem/list-passagem.component';
import { CreateElevadorComponent } from './components/elevador/create-elevador/create-elevador.component';
import { UpdateElevadorComponent } from './components/elevador/update-elevador/update-elevador.component';
import { ListElevadorComponent } from './components/elevador/list-elevador/list-elevador.component';
import { CreateSalaComponent } from './components/sala/create-sala/create-sala.component';
import { CreateTipoDeRobotComponent } from './components/tipoderobot/create-tipo-de-robot/create-tipo-de-robot.component';
import { CreateRobotComponent } from './components/robot/create-robot/create-robot.component';
import { InibirRobotComponent } from './components/robot/inibir-robot/inibir-robot.component';
import { ListRobotComponent } from './components/robot/list-robot/list-robot.component';
import {RGPDComponent} from './components/rgpd/rgpd.component'
import {LoginSupComponent} from './components/loginSup/login.component';
import { LoginComponent} from './components/login/login.component';
import { AlgavComponent } from './components/algav/algav.component';
import { CreateTarefaComponent } from './components/tarefa/create-tarefa/create-tarefa.component';
import { ListTarefaComponent } from './components/tarefa/list-tarefa/list-tarefa.component';
import { FilterTarefaComponent } from './components/tarefa/filter-tarefa/filter-tarefa.component';
import { RecolhaComponent } from './components/recolha-dados/recolha-dados.component';
import { CreateUtilizadorComponent } from './components/utilizador/create-utilizador/create-utilizador.component';
import {ListUtilizadorComponent} from './components/utilizador/list-utilizador/list-utilizador.component';
import {ListAllUtilizadorComponent} from './components/utilizador/list-all-utilizador/list-all-utilizador.component';
import { LogoutComponent } from './components/logout/logout.component';
import { PoliticaPrivacidadeComponent } from './components/politica-privacidade/politica-privacidade.component';
import { DadosPessoaisComponent } from './components/dados-pessoais/dados-pessoais.component';
import { ApagarContaComponent } from './components/apagar-conta/apagar-conta.component';
import { PoliticaPrivacidadeHomeComponent } from './components/politica-privacidade-home/politica-privacidade-home.component';
import { SobreNosComponent } from './components/sobre-nos/sobre-nos.component';



const routes: Routes = [
  { path: '', redirectTo: '/Login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {path: 'RGPD', component: RGPDComponent},
  //{path: 'Login', component:LoginSupComponent},
  {path: 'Login', component:LoginComponent},
  {path: 'Logout', component:LogoutComponent},
  {path: 'Recolha', component:RecolhaComponent},
  {path: 'PoliticaPrivacidade', component:PoliticaPrivacidadeComponent},
  {path: 'PoliticaPrivacidadeHome', component:PoliticaPrivacidadeHomeComponent},
  {path: 'SobreNos', component:SobreNosComponent},
  {path: 'ApagarConta', component:ApagarContaComponent},


  { path: 'CriarEdificio', component: CreateEdificioComponent },
  { path: 'AtualizarEdificio', component: UpdateEdificioComponent },
  { path: 'ListarEdificios', component: ListEdificioComponent },
  { path: 'ListarEdificiosMinMax', component: ListEdificioMinMaxComponent },

  { path: 'CriarPiso', component: CreatePisoComponent },
  { path: 'AtualizarPiso', component: UpdatePisoComponent },
  { path: 'ListarPisos', component: ListPisoComponent },
  { path: 'ListarPisosConnection', component: ListPisoConnectionComponent },
  { path: 'CarregarMapaPiso', component: UploadPisoMapComponent },

  { path: 'CriarPassagem', component: CreatePassagemComponent },
  { path: 'AtualizarPassagem', component: UpdatePassagemComponent },
  { path: 'ListarPassagens', component: ListPassagemComponent },

  { path: 'CriarElevador', component: CreateElevadorComponent },
  { path: 'AtualizarElevador', component: UpdateElevadorComponent },
  { path: 'ListarElevadores', component: ListElevadorComponent },

  { path: 'CriarSala', component: CreateSalaComponent },

  { path: 'CriarTipoDeRobot', component: CreateTipoDeRobotComponent },

  { path: 'CriarRobot', component: CreateRobotComponent },
  { path: 'InibirRobot', component: InibirRobotComponent },
  { path: 'ListarRobots', component: ListRobotComponent },

  //{ path: 'visualizacao', component: VisualizationComponent },
  
  { path: 'algav', component: AlgavComponent },

  { path: 'CriarTarefa', component: CreateTarefaComponent },
  { path: 'ListarTarefas', component: ListTarefaComponent },
  { path: 'FiltrarTarefas', component: FilterTarefaComponent },

  {path: 'CriarUtilizador', component: CreateUtilizadorComponent},
  {path: 'ListarUtilizador', component: ListUtilizadorComponent},
  {path: 'ListarTodosUtilizador', component: ListAllUtilizadorComponent},

  {path: 'AlterarDados', component: DadosPessoaisComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
