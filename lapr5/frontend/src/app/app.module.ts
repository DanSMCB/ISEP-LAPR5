import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { VisualizationComponent } from './components/visualization/visualization.component';

import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CreateEdificioComponent } from './components/edificio/create-edificio/create-edificio.component';
import { UpdateEdificioComponent } from './components/edificio/update-edificio/update-edificio.component';
import { ListEdificioComponent } from './components/edificio/list-edificio/list-edificio.component';
import { ListEdificioMinMaxComponent } from './components/edificio/list-edificio-min-max/list-edificio-min-max.component';
import { CreateElevadorComponent } from './components/elevador/create-elevador/create-elevador.component';
import { UpdateElevadorComponent } from './components/elevador/update-elevador/update-elevador.component';
import { ListElevadorComponent } from './components/elevador/list-elevador/list-elevador.component';
import { CreatePassagemComponent } from './components/passagem/create-passagem/create-passagem.component';
import { UpdatePassagemComponent } from './components/passagem/update-passagem/update-passagem.component';
import { ListPassagemComponent } from './components/passagem/list-passagem/list-passagem.component';
import { CreatePisoComponent } from './components/piso/create-piso/create-piso.component';
import { UpdatePisoComponent } from './components/piso/update-piso/update-piso.component';
import { ListPisoComponent } from './components/piso/list-piso/list-piso.component';
import { ListPisoConnectionComponent } from './components/piso/list-piso-connection/list-piso-connection.component';
import { CreateSalaComponent } from './components/sala/create-sala/create-sala.component';
import { CreateRobotComponent } from './components/robot/create-robot/create-robot.component';
import { InibirRobotComponent } from './components/robot/inibir-robot/inibir-robot.component';
import { ListRobotComponent } from './components/robot/list-robot/list-robot.component';
import { UploadPisoMapComponent } from './components/piso/upload-piso-map/upload-piso-map.component';
import { CreateTipoDeRobotComponent } from './components/tipoderobot/create-tipo-de-robot/create-tipo-de-robot.component';
import {RGPDComponent} from './components/rgpd/rgpd.component';
import { HttpRequestsService } from './services/http-requests-service';
import { LoginSupComponent} from './components/loginSup/login.component';
import { LoginComponent} from './components/login/login.component';
import { MessagesComponent } from './messages/messages.component';
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

@NgModule({
  declarations: [
    AppComponent,

    CreateEdificioComponent,
    UpdateEdificioComponent,
    ListEdificioComponent,
    ListEdificioMinMaxComponent,

    CreateElevadorComponent,
    UpdateElevadorComponent,
    ListElevadorComponent,

    CreatePassagemComponent,
    UpdatePassagemComponent,
    ListPassagemComponent,

    CreatePisoComponent,
    UpdatePisoComponent,
    ListPisoComponent,
    ListPisoConnectionComponent,

    CreateSalaComponent,

    CreateRobotComponent,

    //VisualizationComponent,
    MessagesComponent,

    InibirRobotComponent,
    ListRobotComponent,
    UploadPisoMapComponent,
    HomeComponent,
    CreateTipoDeRobotComponent,
    RGPDComponent,

    LoginComponent,
    LoginSupComponent,
    LogoutComponent,
    RecolhaComponent,
    PoliticaPrivacidadeComponent,
    PoliticaPrivacidadeHomeComponent,
    SobreNosComponent,
    ApagarContaComponent,

    AlgavComponent,

    CreateTarefaComponent,
    ListTarefaComponent,
    FilterTarefaComponent,

    CreateUtilizadorComponent,
    ListUtilizadorComponent,
    ListAllUtilizadorComponent,
    DadosPessoaisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [HttpRequestsService, Location, ListRobotComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
