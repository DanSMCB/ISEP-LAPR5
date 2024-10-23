%?- consult("US510_robot_edificios.pl").
% Bibliotecas 
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).

% Relação entre pedidos HTTP e predicados que os processam		
:- http_handler('/caminho_edificios_req', caminho_edificios_req, []).
:- http_handler('/todos_caminhos_edificios_req', todos_caminhos_edificios_req, []).
:- http_handler('/caminho_pisos_req', caminho_pisos_req, []).
:- http_handler('/melhor_caminho_pisos_req', melhor_caminho_pisos_req, []).
% Criação de servidor HTTP no porto 'Port'					
server(Port) :-						
        http_server(http_dispatch, [port(Port)]).

% Ligacoes bidirecionais entre os edificios B, G, H e I do ISEP.
liga(b,g). %Liga por corredor no P2 e P3.
liga(g,h). %Liga por corredor no P2 e P3.
liga(b,i). %Liga por corredor no P3.
liga(i,h). %Liga por corredor no P2

caminho_edificios_req(Request) :-
    http_parameters(Request,
                    [ origem(EdOr, []),
                      destino(EdDest,[])
                    ]),
    caminho_edificios(EdOr,EdDest,C),
    format('Content-type: text/plain~n~n'),
    format('Caminho: ~w~n',[C]). 

todos_caminhos_edificios_req(Request) :-
    http_parameters(Request,
                    [ origem(EdOr, []),
                    destino(EdDest,[])
                    ]),
    todos_caminhos_edificios(EdOr,EdDest,C),
    format('Content-type: text/plain~n~n'),
    format('Caminho: ~w~n',[C]). 

caminho_pisos_req(Request) :-
    http_parameters(Request,
                    [ origem(PisoOr, []),
                        destino(PisoDest,[])
                    ]),
    caminho_pisos(PisoOr,PisoDest,C,L),
    format('Content-type: text/plain~n~n'),
    format('Caminho: ~w~n Lista de ligacoes usadas: ~w~n',[C,L]). 

melhor_caminho_pisos_req(Request) :-
    http_parameters(Request,
                    [ origem(PisoOr, []),
                        destino(PisoDest,[])
                    ]),
    melhor_caminho_pisos(PisoOr,PisoDest,L),
    format('Content-type: text/plain~n~n'),
    format('Lista de ligacoes usadas no melhor caminho entre pisos: ~w~n',[L]). 

% Metodo primeiro em profundidade
caminho_edificios(EdOr,EdDest,LEdCam):-caminho_edificios2(EdOr,EdDest,[EdOr],LEdCam).

caminho_edificios2(EdX,EdX,LEdInv,LEdCam):-!,reverse(LEdInv,LEdCam).
caminho_edificios2(EdAct,EdDest,LEdPassou,LEdCam):-
    (liga(EdAct,EdInt);
    liga(EdInt,EdAct)),\+member(EdInt,LEdPassou),
    caminho_edificios2(EdInt,EdDest,[EdInt|LEdPassou],LEdCam).

% Encontrar um caminho entre edificios do EdOr para o EdDest
%?- caminho_edificios(i,h,LEdCam).
% LEdCam = [i, h].
% LEdCam = [i, b, g, h].




todos_caminhos_edificios(EdOr,EdDest,LTCamEd):-findall(LEdCam,caminho_edificios(EdOr,EdDest,LEdCam),LTCamEd).

%Encontrar todos os caminhos entre edificios
%?- todos_caminhos_edificios(i,h,LTCamEd).
% LTCamEd = [[i, h], [i, b, g, h]].



/* Predicado caminho_pisos(PisoOr, PisoDest, LEdCam, LLig) para encontrar um caminho entre os dois pisos de dois edifícios,
   usando corredores e elevadores, com LEdCam sendo a lista de edifícios percorridos e LLig a lista de ligações por corredor ou elevador. */
caminho_pisos(PisoOr,PisoDest,LEdCam,LLig):-pisos(EdOr,LPisosOr),member(PisoOr,LPisosOr),
                                 pisos(EdDest,LPisosDest),member(PisoDest,LPisosDest),
                                 caminho_edificios(EdOr,EdDest,LEdCam),
                                 segue_pisos(PisoOr,PisoDest,LEdCam,LLig).

segue_pisos(PisoDest,PisoDest,_,[]).
segue_pisos(PisoDest1,PisoDest,[EdDest],[elev(PisoDest1,PisoDest)]):-
    PisoDest\==PisoDest1,
    elevador(EdDest,LPisos), member(PisoDest1,LPisos), member(PisoDest,LPisos).
segue_pisos(PisoAct,PisoDest,[EdAct,EdSeg|LOutrosEd],[cor(PisoAct,PisoSeg)|LOutrasLig]):-
    (corredor(EdAct,EdSeg,PisoAct,PisoSeg);corredor(EdSeg,EdAct,PisoSeg,PisoAct)),
    segue_pisos(PisoSeg,PisoDest,[EdSeg|LOutrosEd],LOutrasLig).
segue_pisos(PisoAct,PisoDest,[EdAct,EdSeg|LOutrosEd],[elev(PisoAct,PisoAct1),cor(PisoAct1,PisoSeg)|LOutrasLig]):-
    (corredor(EdAct,EdSeg,PisoAct1,PisoSeg);corredor(EdSeg,EdAct,PisoSeg,PisoAct1)),PisoAct1\==PisoAct,
    elevador(EdAct,LPisos),member(PisoAct,LPisos),member(PisoAct1,LPisos),
    segue_pisos(PisoSeg,PisoDest,[EdSeg|LOutrosEd],LOutrasLig).

% Tipos de factos: piso/2, elevador/2, corredor/4.
pisos(b,[b1,b2,b3]).
pisos(g,[g2,g3]).
pisos(h,[h1,h2,h3]).
pisos(i,[i1,i2,i3]).

elevador(b,[b1,b2,b3]).
elevador(g,[g2,g3]).
elevador(i,[i1,i2,i3]).

corredor(b,g,b2,g2).
corredor(b,g,b3,g3).
corredor(b,i,b3,i3).
corredor(g,h,g2,h2).
corredor(g,h,g3,h3).
corredor(h,i,h2,i2).

% Foram considerados todos os caminhos possiveis de I1 para B3 com corredores e aos elevadores.
% ?- caminho_pisos(i1,b3,LEdCam,LLig).
%LEdCam = [i, b],
% LLig = [elev(i1, i3), cor(i3, b3)];
%LEdCam = [i, h, g, b],
% LLig = [elev(i1, i2), cor(i2, h2), cor(h2, g2), cor(g2, b2), elev(b2, b3)];
%LEdCam = [i, h, g, b],
% LLig = [elev(i1, i2), cor(i2, h2), cor(h2, g2), elev(g2, g3), cor(g3, b3),];



/* Predicado melhor_caminho_pisos(PisoOr, PisoDest, LLigMelhor) que, dados os pisos de origem e destino,
   encontre o caminho com menos utilizações de elevador e, em caso de empate, menos utilizações de corredor. */
melhor_caminho_pisos(PisoOr,PisoDest,LLigMelhor):-
    findall(LLig,caminho_pisos(PisoOr,PisoDest,_,LLig),LLLig),
    menos_elevadores(LLLig,LLigMelhor,_,_).

menos_elevadores([LLig],LLig,NElev,NCor):-conta(LLig,NElev,NCor).
menos_elevadores([LLig|OutrosLLig],LLigR,NElevR,NCorR):-
    menos_elevadores(OutrosLLig,LLigM,NElev,NCor),
    conta(LLig,NElev1,NCor1),
    (((NElev1<NElev;(NElev1==NElev,NCor1<NCor)),!,NElevR is NElev1, NCorR is NCor1,LLigR=LLig);
     (NElevR is NElev,NCorR is NCor,LLigR=LLigM)).

conta([],0,0).
conta([elev(_,_)|L],NElev,NCor):-conta(L,NElevL,NCor),NElev is NElevL+1.
conta([cor(_,_)|L],NElev,NCor):-conta(L,NElev,NCorL),NCor is NCorL+1.

% ?- melhor_caminho_pisos(i1,b3,LLigMelhor).
% LLigMelhor = [elev(i1, i3), cor(i3, b3)].



