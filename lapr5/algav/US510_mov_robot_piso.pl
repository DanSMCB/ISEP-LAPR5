%?- consult("US510_mov_robot_piso.pl").
% Bibliotecas 
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_error)).

% Relação entre pedidos HTTP e predicados que os processam			
:- http_handler('/cria_grafo', cria_grafo_req, []).
:- http_handler('/dfs_req', dfs_req, []).
:- http_handler('/aStar', aStar_req, []).
:- http_handler('/melhor_caminho_pisos_req', melhor_caminho_pisos_req, []).
% Criação de servidor HTTP no porto 'Port'					
server(Port) :-						
        http_server(http_dispatch, [port(Port)]).

cria_grafo_req(Request) :-
    http_parameters(Request,
                    [ col(Col, []),
                      lin(Lin,[])
                    ]),
    cria_grafo(Col, Lin),
    format('Content-type: text/plain~n~n').
    %format('Caminho: ~w~n',[C]). 
dfs_req(Request) :-
        http_parameters(Request, [orig(Orig, []), dest(Dest, [])]),
        format('Content-type: text/plain~n~n'),
        format('Received request parameters:~nOrig: ~w~nDest: ~w~n', [Orig, Dest]),
        catch(
            (
                writeln('Before DFS'),
                dfs(Orig, Dest, Path),
                writeln('After DFS'),
                format('DFS Path: ~w~n', [Path])
            ),
            Exception,
            format('Error in DFS: ~w~n', [Exception])
        ).
    
    
    
    
       
aStar_req(Request) :-
    http_parameters(Request,
            [ origem(Orig, []),
                destino(Dest,[])
            ]),
    aStar(Orig,Dest,Cam,C),
    writeln([Cam,C]).
% Example nodes and edges used for A* algorithm
% Node, simulated heuristic value, simulated cost
node((1,1), 45, 95).
node((1,2), 90, 95).
node((1,3), 15, 85).
node((1,4), 40, 80).
node((2,1), 70, 80).
node((2,2), 25, 65).
node((2,3), 65, 65).
node((2,4), 45, 55).
node((3,1), 5, 50).
node((3,2), 80, 50).
node((3,3), 65, 45).
node((3,4), 25, 40).
node((4,1), 55, 30).
node((4,2), 80, 30).
node((4,3), 25, 15).
node((4,4), 80, 15).

edge((1,1), (1,2), 45).
edge((1,1), (1,3), 32).
edge((1,1), (1,4), 16).
edge((1,1), (2,1), 30).
edge((1,2), (2,1), 25).
edge((1,4), (2,1), 30).
edge((1,3), (2,1), 26).
edge((1,3), (2,2), 23).
edge((1,3), (3,1), 37).
edge((1,4), (2,2), 22).
edge((2,2), (2,4), 23).
edge((2,2), (3,4), 25).
edge((2,2), (3,1), 25).
edge((3,1), (3,4), 23).
edge((2,1), (2,2), 48).
edge((2,1), (2,3), 16).
edge((2,1), (3,2), 32).
edge((2,3), (2,4), 23).
edge((2,3), (3,3), 20).
edge((2,3), (3,2), 22).
edge((2,4), (3,3), 25).
edge((2,4), (3,4), 27).
edge((2,4), (3,2), 23).
edge((3,2), (3,3), 16).
edge((3,2), (4,3), 20).
edge((3,3), (4,3), 19).
edge((3,3), (4,4), 22).
edge((3,4), (4,3), 32).
edge((3,4), (4,2), 25).
edge((4,3), (4,2), 34).

%Corredores
%:-dynamic ligacelcb2g2/2.
%corredorb2g2 Matriz3*3
%coluna :1,2,3
%linha 1:0,0,0
%linha 2:0,0,0
%linha 3:0,0,0

b2g2(1,1,0).
b2g2(2,1,0).
b2g2(3,1,0).

b2g2(1,2,0).
b2g2(2,2,0).
b2g2(3,2,0).

b2g2(1,3,0).
b2g2(2,3,0).
b2g2(3,3,0).


%:-dynamic ligacelcb3i3/2.
%corredorb3i3 Matriz3*3
%coluna :1,2,3
%linha 1:0,0,0
%linha 2:0,0,0
%linha 3:0,0,0

b3i3(1,1,0).
b3i3(2,1,0).
b3i3(3,1,0).

b3i3(1,2,0).
b3i3(2,2,0).
b3i3(3,2,0).

b3i3(1,3,0).
b3i3(2,3,0).
b3i3(3,3,0).


%:-dynamic ligacelcb3g3/2.
%corredor b3g3 Matriz3*3
%coluna :1,2,3
%linha 1:0,0,0
%linha 2:0,0,0
%linha 3:0,0,0

b3g3(1,1,0).
b3g3(2,1,0).
b3g3(3,1,0).

b3g3(1,2,0).
b3g3(2,2,0).
b3g3(3,2,0).

b3g3(1,3,0).
b3g3(2,3,0).
b3g3(3,3,0).


%:-dynamic ligacelch2i2/2.
%corredor h2i2 Matriz3*3
%coluna :1,2,3
%linha 1:0,0,0
%linha 2:0,0,0
%linha 3:0,0,0

h2i2(1,1,0).
h2i2(2,1,0).
h2i2(3,1,0).

h2i2(1,2,0).
h2i2(2,2,0).
h2i2(3,2,0).

h2i2(1,3,0).
h2i2(2,3,0).
h2i2(3,3,0).


%:-dynamic ligacelcg2h2/2.
%corredor g2h2 Matriz3*3
%coluna :1,2,3
%linha 1:0,0,0
%linha 2:0,0,0
%linha 3:0,0,0

g2h2(1,1,0).
g2h2(2,1,0).
g2h2(3,1,0).

g2h2(1,2,0).
g2h2(2,2,0).
g2h2(3,2,0).

g2h2(1,3,0).
g2h2(2,3,0).
g2h2(3,3,0).

%:-dynamic ligacelcg3h3/2.
%corredor g3h3 Matriz3*3
%coluna :1,2,3
%linha 1:0,0,0
%linha 2:0,0,0
%linha 3:0,0,0

g3h3(1,1,0).
g3h3(2,1,0).
g3h3(3,1,0).

g3h3(1,2,0).
g3h3(2,2,0).
g3h3(3,2,0).

g3h3(1,3,0).
g3h3(2,3,0).
g3h3(3,3,0).

%:-dynamic ligaceli1/2.
%EdificioIPiso1(i1)Matriz4*4
%coluna :1,2,3,4
%linha 1:1,1,P,0
%linha 2:1,1,1,0
%linha 3:E,0,0,0
%linha 4:0,0,0,0

%i1(col,lin,valor)
i1(1,1,1).
i1(2,1,1).
i1(3,1,0).
i1(4,1,0).

i1(1,2,1).
i1(2,2,1).
i1(3,2,1).
i1(4,2,0).

i1(1,3,0).
i1(2,3,0).
i1(3,3,0).
i1(4,3,0).

i1(1,4,0).
i1(2,4,0).
i1(3,4,0).
i1(4,4,0).

%Edificios

%:-dynamic ligaceli2/2.
%EdificioIPiso2(i2)Matriz4*4
%coluna :1,2,3,4
%linha 1:1,1,1,1
%linha 2:1,1,1,P
%linha 3:E,0,0,0
%linha 4:C,0,0,0

%i2(col,lin,valor)
i2(1,1,1).
i2(2,1,1).
i2(3,1,1).
i2(4,1,1).

i2(1,2,1).
i2(2,2,1).
i2(3,2,1).
i2(4,2,0).

i2(1,3,0).
i2(2,3,0).
i2(3,3,0).
i2(4,3,0).

i2(1,4,0).
i2(2,4,0).
i2(3,4,0).
i2(4,4,0).

%:-dynamic ligaceli3/2.
%EdificioIPiso3(i3)Matriz4*4
%coluna :1,2,3,4
%linha 1:C,0,1,1
%linha 2:C,0,1,P
%linha 3:E,0,0,0
%linha 4:C,0,0,0

%i3(col,lin,valor)
i3(1,1,0).
i3(2,1,0).
i3(3,1,1).
i3(4,1,1).

i3(1,2,0).
i3(2,2,0).
i3(3,2,1).
i3(4,2,0).

i3(1,3,0).
%sala(1,3,0).
i3(2,3,0).
%sala(2,4,0).
i3(3,3,0).
i3(4,3,0).
i3(1,4,0).
%sala(1,4,0).
i3(2,4,0).
i3(3,4,0).
i3(4,4,0).

%:-dynamic ligacelb1/2.
%EdificioBPiso1(b1)Matriz5*5
%coluna :1,2,3,4,5
%linha 1:1,1,1,1,1
%linha 2:1,1,0,0,1
%linha 3:1,1,0,0,1
%linha 4:1,P,0,0,E
%linha 5:1,1,1,1,1

%b1(col,lin,valor)
b1(1,1,1).
b1(2,1,1).
b1(3,1,1).
b1(4,1,1).
b1(5,1,1).

b1(1,2,1).
b1(2,2,1).
b1(3,2,0).
b1(4,2,0).
b1(5,2,1).

b1(1,3,1).
b1(2,3,1).
b1(3,3,0).
b1(4,3,0).
b1(5,3,1).

b1(1,4,1).
b1(2,4,0).
b1(3,4,0).
b1(4,4,0).
b1(5,4,0).

b1(1,5,1).
b1(2,5,1).
b1(3,5,1).
b1(4,5,1).
b1(5,5,1).

%:-dynamic ligacelb2/2.
%EdificioBPiso2(b2)Matriz5*5
%coluna :1,2,3,4,5
%linha 1:1,1,0,0,0
%linha 2:C,1,1,1,1
%linha 3:C,0,0,0,1
%linha 4:1,P,0,0,E
%linha 5:1,1,0,0,1

%b2(col,lin,valor)
b2(1,1,1).
b2(2,1,1).
b2(3,1,0).
b2(4,1,0).
b2(5,1,0).

b2(1,2,0).
b2(2,2,1).
b2(3,2,1).
b2(4,2,1).
b2(5,2,1).

b2(1,3,0).
b2(2,3,0).
b2(3,3,0).
b2(4,3,0).
b2(5,3,1).

b2(1,4,1).
b2(2,4,0).
b2(3,4,0).
b2(4,4,0).
b2(5,4,0).

b2(1,5,1).
b2(2,5,1).
b2(3,5,0).
b2(4,5,0).
b2(5,5,1).

%:-dynamic ligacelb3/2.
%EdificioBPiso3(b3)Matriz5*5
%coluna :1,2,3,4,5
%linha 1:1,1,0,0,C
%linha 2:1,1,0,0,C
%linha 3:P,1,0,0,1
%linha 4:0,0,0,0,E
%linha 5:0,0,0,0,1

%b3(col,lin,valor)
b3(1,1,1).
b3(2,1,1).
b3(3,1,0).
b3(4,1,0).
b3(5,1,0).

b3(1,2,1).
b3(2,2,1).
b3(3,2,0).
b3(4,2,0).
b3(5,2,0).

b3(1,3,0).
b3(2,3,1).
b3(3,3,0).
b3(4,3,0).
b3(5,3,1).

b3(1,4,0).
b3(2,4,0).
b3(3,4,0).
b3(4,4,0).
b3(5,4,0).

b3(1,5,0).
b3(2,5,0).
b3(3,5,0).
b3(4,5,0).
b3(5,5,1).

%:-dynamic ligacelh1/2.
%EdificioHPiso1(h1)Matriz6*6
%coluna :1,2,3,4,5,6
%linha 1:E,0,0,0,0,0
%linha 2:1,P,0,1,1,1
%linha 3:1,P,0,P,1,1
%linha 4:1,P,0,P,1,1
%linha 5:1,1,P,1,1,1
%linha 6:1,1,1,1,1,1

%h1(col,lin,valor)
h1(1,1,0).
h1(2,1,0).
h1(3,1,0).
h1(4,1,0).
h1(5,1,0).
h1(6,1,0).

h1(1,2,1).
h1(2,2,0).
h1(3,2,0).
h1(4,2,1).
h1(5,2,1).
h1(6,2,1).

h1(1,3,1).
h1(2,3,0).
h1(3,3,0).
h1(4,3,0).
h1(5,3,1).
h1(6,3,1).

h1(1,4,1).
h1(2,4,0).
h1(3,4,0).
h1(4,4,0).
h1(5,4,1).
h1(6,4,1).

h1(1,5,1).
h1(2,5,1).
h1(3,5,0).
h1(4,5,1).
h1(5,5,1).
h1(6,5,1).

h1(1,6,1).
h1(2,6,1).
h1(3,6,1).
h1(4,6,1).
h1(5,6,1).
h1(6,6,1).

%:-dynamic ligacelh2/2.
%EdificioHPiso2(h2)Matriz6*6
%coluna :1,2,3,4,5,6
%linha 1:E,0,0,0,0,0
%linha 2:1,0,0,P,1,1
%linha 3:P,0,0,1,1,1
%linha 4:1,P,0,P,1,1
%linha 5:1,1,0,0,0,C
%linha 6:1,1,0,0,0,C

%h2(col,lin,valor)
h2(1,1,0).
h2(2,1,0).
h2(3,1,0).
h2(4,1,0).
h2(5,1,0).
h2(6,1,0).

h2(1,2,1).
h2(2,2,0).
h2(3,2,0).
h2(4,2,0).
h2(5,2,1).
h2(6,2,1).

h2(1,3,0).
h2(2,3,0).
h2(3,3,0).
h2(4,3,1).
h2(5,3,1).
h2(6,3,1).

h2(1,4,1).
h2(2,4,0).
h2(3,4,0).
h2(4,4,0).
h2(5,4,1).
h2(6,4,1).

h2(1,5,1).
h2(2,5,1).
h2(3,5,0).
h2(4,5,0).
h2(5,5,0).
h2(6,5,0).

h2(1,6,1).
h2(2,6,1).
h2(3,6,0).
h2(4,6,0).
h2(5,6,0).
h2(6,6,0).

%:-dynamic ligacelh3/2.
%EdificioHPiso3(h3)Matriz6*6
%coluna :1,2,3,4,5,6
%linha 1:E,0,0,0,0,0
%linha 2:1,1,0,1,1,1
%linha 3:1,P,0,P,1,1
%linha 4:1,P,0,P,1,1
%linha 5:1,0,0,0,0,C
%linha 6:1,P,1,1,0,C

%h3(col,lin,valor)
h3(1,1,0).
h3(2,1,0).
h3(3,1,0).
h3(4,1,0).
h3(5,1,0).
h3(6,1,0).

h3(1,2,1).
h3(2,2,1).
h3(3,2,0).
h3(4,2,1).
h3(5,2,1).
h3(6,2,1).

h3(1,3,1).
h3(2,3,0).
h3(3,3,0).
h3(4,3,0).
h3(5,3,1).
h3(6,3,1).

h3(1,4,1).
h3(2,4,0).
h3(3,4,0).
h3(4,4,0).
h3(5,4,1).
h3(6,4,1).

h3(1,5,1).
h3(2,5,0).
h3(3,5,0).
h3(4,5,0).
h3(5,5,0).
h3(6,5,0).

h3(1,6,1).
h3(2,6,0).
h3(3,6,1).
h3(4,6,1).
h3(5,6,0).
h3(6,6,0).

%:-dynamic ligacelg2/2.
%EdificioGPiso2(g2)Matriz7*7
%coluna :1,2,3,4,5,6,7
%linha 1:1,1,1,1,P,1,E
%linha 2:C,P,1,P,0,0,0
%linha 3:C,0,0,0,0,0,0
%linha 4:P,0,0,0,0,0,0
%linha 5:1,0,0,0,0,0,C	
%linha 6:1,P,P,1,0,0,C
%linha 7:1,1,1,1,P,1,1

%g2(col,lin,valor)
g2(1,1,1).
g2(2,1,1).
g2(3,1,1).
g2(4,1,1).
g2(5,1,0).
g2(6,1,1).
g2(7,1,0).

g2(1,2,0).
g2(2,2,0).
g2(3,2,1).
g2(4,2,0).
g2(5,2,0).
g2(6,2,0).
g2(7,2,0).

g2(1,3,1).
g2(2,3,0).
g2(3,3,0).
g2(4,3,0).
g2(5,3,0).
g2(6,3,0).
g2(7,3,0).

g2(1,4,0).
g2(2,4,0).
g2(3,4,0).
g2(4,4,0).
g2(5,4,0).
g2(6,4,0).
g2(7,4,0).

g2(1,5,1).
g2(2,5,0).
g2(3,5,0).
g2(4,5,0).
g2(5,5,0).
g2(6,5,0).
g2(7,5,0).

g2(1,6,1).
g2(2,6,0).
g2(3,6,0).
g2(4,6,1).
g2(5,6,0).
g2(6,6,0).
g2(7,6,0).

g2(1,7,1).
g2(2,7,1).
g2(3,7,1).
g2(4,7,1).
g2(5,7,0).
g2(6,7,1).
g2(7,7,1).

%:-dynamic ligacelg3/2.
%EdificioGPiso3(g3)Matriz7*7
%coluna :1,2,3,4,5,6,7
%linha 1:1,1,1,1,1,1,E
%linha 2:1,1,0,0,0,0,0
%linha 3:1,1,0,0,0,0,0
%linha 4:1,P,0,0,0,0,0
%linha 5:1,1,0,0,0,0,C	
%linha 6:1,1,1,0,0,0,C
%linha 7:1,1,1,0,0,1,1

%g3(col,lin,valor)
g3(1,1,1).
g3(2,1,1).
g3(3,1,1).
g3(4,1,1).
g3(5,1,1).
g3(6,1,1).
g3(7,1,0).

g3(1,2,1).
g3(2,2,1).
g3(3,2,0).
g3(4,2,0).
g3(5,2,0).
g3(6,2,0).
g3(7,2,0).

g3(1,3,1).
g3(2,3,1).
g3(3,3,0).
g3(4,3,0).
g3(5,3,0).
g3(6,3,0).
g3(7,3,0).

g3(1,4,1).
g3(2,4,0).
g3(3,4,0).
g3(4,4,0).
g3(5,4,0).
g3(6,4,0).
g3(7,4,0).

g3(1,5,1).
g3(2,5,1).
g3(3,5,0).
g3(4,5,0).
g3(5,5,0).
g3(6,5,0).
g3(7,5,0).

g3(1,6,1).
g3(2,6,1).
g3(3,6,1).
g3(4,6,0).
g3(5,6,0).
g3(6,6,0).
g3(7,6,0).

g3(1,7,1).
g3(2,7,1).
g3(3,7,1).
g3(4,7,0).
g3(5,7,0).
g3(6,7,1).
g3(7,7,1).

/*Outras possibilidades de piso
%Cria grafo direcionado e conetado com células vizinhas com base na matriz.
cria_grafo(_,0):-!.
%Cria o grafo a partir da matriz.
cria_grafo(Col,Lin):-cria_grafo_lin(Col,Lin),Lin1 is Lin-1,cria_grafo(Col,Lin1). 

cria_grafo_lin(0,_):-!.
cria_grafo_lin(Col,Lin):-b3(Col,Lin,0),!,ColS is Col+1, ColA is Col-1, LinS is Lin+1,LinA is Lin-1,
    
    %6 Corredores para os 4 Edificios.
	((g2h2(ColS,Lin,0),assertz(ligacelcg2h2(cel(Col,Lin),cel(ColS,Lin)));true)),
    ((g2h2(ColA,Lin,0),assertz(ligacelcg2h2(cel(Col,Lin),cel(ColA,Lin)));true)),
    ((g2h2(Col,LinS,0),assertz(ligacelcg2h2(cel(Col,Lin),cel(Col,LinS)));true)),
    ((g2h2(Col,LinA,0),assertz(ligacelcg2h2(cel(Col,Lin),cel(Col,LinA)));true)),
	
	((g3h3(ColS,Lin,0),assertz(ligacelcg3h3(cel(Col,Lin),cel(ColS,Lin)));true)),
    ((g3h3(ColA,Lin,0),assertz(ligacelcg3h3(cel(Col,Lin),cel(ColA,Lin)));true)),
    ((g3h3(Col,LinS,0),assertz(ligacelcg3h3(cel(Col,Lin),cel(Col,LinS)));true)),
    ((g3h3(Col,LinA,0),assertz(ligacelcg3h3(cel(Col,Lin),cel(Col,LinA)));true)),

    ((b2g2(ColS,Lin,0),assertz(ligacelcb2g2(cel(Col,Lin),cel(ColS,Lin)));true)),
    ((b2g2(ColA,Lin,0),assertz(ligacelcb2g2(cel(Col,Lin),cel(ColA,Lin)));true)),
    ((b2g2(Col,LinS,0),assertz(ligacelcb2g2(cel(Col,Lin),cel(Col,LinS)));true)),
    ((b2g2(Col,LinA,0),assertz(ligacelcb2g2(cel(Col,Lin),cel(Col,LinA)));true)),
	
	((b3i3(ColS,Lin,0),assertz(ligacelcb3i3(cel(Col,Lin),cel(ColS,Lin)));true)),
    ((b3i3(ColA,Lin,0),assertz(ligacelcb3i3(cel(Col,Lin),cel(ColA,Lin)));true)),
    ((b3i3(Col,LinS,0),assertz(ligacelcb3i3(cel(Col,Lin),cel(Col,LinS)));true)),
    ((b3i3(Col,LinA,0),assertz(ligacelcb3i3(cel(Col,Lin),cel(Col,LinA)));true)),
	
	((b3g3(ColS,Lin,0),assertz(ligacelcb3g3(cel(Col,Lin),cel(ColS,Lin)));true)),
    ((b3g3(ColA,Lin,0),assertz(ligacelcb3g3(cel(Col,Lin),cel(ColA,Lin)));true)),
    ((b3g3(Col,LinS,0),assertz(ligacelcb3g3(cel(Col,Lin),cel(Col,LinS)));true)),
    ((b3g3(Col,LinA,0),assertz(ligacelcb3g3(cel(Col,Lin),cel(Col,LinA)));true)),
	
	((h2i2(ColS,Lin,0),assertz(ligacelch2i2(cel(Col,Lin),cel(ColS,Lin)));true)),
    ((h2i2(ColA,Lin,0),assertz(ligacelch2i2(cel(Col,Lin),cel(ColA,Lin)));true)),
    ((h2i2(Col,LinS,0),assertz(ligacelch2i2(cel(Col,Lin),cel(Col,LinS)));true)),
    ((h2i2(Col,LinA,0),assertz(ligacelch2i2(cel(Col,Lin),cel(Col,LinA)));true)),
	
	%11 Pisos de Edificios.
	((i1(ColS,Lin,0),assertz(ligaceli1(cel(Col,Lin),cel(ColS,Lin)));true)),
    ((i1(ColA,Lin,0),assertz(ligaceli1(cel(Col,Lin),cel(ColA,Lin)));true)),
    ((i1(Col,LinS,0),assertz(ligaceli1(cel(Col,Lin),cel(Col,LinS)));true)),
    ((i1(Col,LinA,0),assertz(ligaceli1(cel(Col,Lin),cel(Col,LinA)));true)),

    ((i2(ColS,Lin,0),assertz(ligaceli2(cel(Col,Lin),cel(ColS,Lin)));true)),
    ((i2(ColA,Lin,0),assertz(ligaceli2(cel(Col,Lin),cel(ColA,Lin)));true)),
    ((i2(Col,LinS,0),assertz(ligaceli2(cel(Col,Lin),cel(Col,LinS)));true)),
    ((i2(Col,LinA,0),assertz(ligaceli2(cel(Col,Lin),cel(Col,LinA)));true)),
	
	((i3(ColS,Lin,0),assertz(ligaceli3(cel(Col,Lin),cel(ColS,Lin)));true)),
    ((i3(ColA,Lin,0),assertz(ligaceli3(cel(Col,Lin),cel(ColA,Lin)));true)),
    ((i3(Col,LinS,0),assertz(ligaceli3(cel(Col,Lin),cel(Col,LinS)));true)),
    ((i3(Col,LinA,0),assertz(ligaceli3(cel(Col,Lin),cel(Col,LinA)));true)),
	
	((b1(ColS,Lin,0),assertz(ligacelb1(cel(Col,Lin),cel(ColS,Lin)));true)),
    ((b1(ColA,Lin,0),assertz(ligacelb1(cel(Col,Lin),cel(ColA,Lin)));true)),
    ((b1(Col,LinS,0),assertz(ligacelb1(cel(Col,Lin),cel(Col,LinS)));true)),
    ((b1(Col,LinA,0),assertz(ligacelb1(cel(Col,Lin),cel(Col,LinA)));true)),

    ((b2(ColS,Lin,0),assertz(ligacelb2(cel(Col,Lin),cel(ColS,Lin)));true)),
    ((b2(ColA,Lin,0),assertz(ligacelb2(cel(Col,Lin),cel(ColA,Lin)));true)),
    ((b2(Col,LinS,0),assertz(ligacelb2(cel(Col,Lin),cel(Col,LinS)));true)),
    ((b2(Col,LinA,0),assertz(ligacelb2(cel(Col,Lin),cel(Col,LinA)));true)),
	
	((b3(ColS,Lin,0),assertz(ligacelb3(cel(Col,Lin),cel(ColS,Lin)));true)),
    ((b3(ColA,Lin,0),assertz(ligacelb3(cel(Col,Lin),cel(ColA,Lin)));true)),
    ((b3(Col,LinS,0),assertz(ligacelb3(cel(Col,Lin),cel(Col,LinS)));true)),
    ((b3(Col,LinA,0),assertz(ligacelb3(cel(Col,Lin),cel(Col,LinA)));true)),

	
    Col1 is Col-1,
    cria_grafo_lin(Col1,Lin).
cria_grafo_lin(Col,Lin):-Col1 is Col-1,cria_grafo_lin(Col1,Lin). */


%Cria matriz de 0s e chama cria_grafo
:-dynamic m/3.
:-dynamic nlin/1.
cria_matriz:-
    retractall(m(_,_,_)),
    retractall(ligacel(_,_)),
    write('Numero de Colunas: '),read(NCol),nl,
    write('Numero de Linhas: '),read(NLin),nl,asserta(nlin(NLin)),
    cria_matriz_0(NCol,NLin),cria_grafo(NCol,NLin),retract(nlin(_)).

cria_matriz_0(1,1):-!,asserta(m(1,1,0)).
cria_matriz_0(NCol,1):-!,asserta(m(NCol,1,0)),NCol1 is NCol-1,nlin(NLin),cria_matriz_0(NCol1,NLin).
cria_matriz_0(NCol,NLin):-asserta(m(NCol,NLin,0)),NLin1 is NLin-1,cria_matriz_0(NCol,NLin1).

%Cria grafo para ligaceli3/2 i3 Matriz 4*4
:-dynamic ligaceli3/2.
cria_grafo(_,0):-!.
cria_grafo(Col,Lin):-cria_grafo_lin(Col,Lin),Lin1 is Lin-
1,cria_grafo(Col,Lin1).
cria_grafo_lin(0,_):-!.
cria_grafo_lin(Col,Lin):-i3(Col,Lin,0),!,
       ColS is Col+1, ColA is Col-1, LinS is Lin+1,LinA is Lin-1,
    ((i3(ColS,Lin,0),assertz(ligaceli3(cel(Col,Lin),cel(ColS,Lin)));true)),
    ((i3(ColA,Lin,0),assertz(ligaceli3(cel(Col,Lin),cel(ColA,Lin)));true)),
    ((i3(Col,LinS,0),assertz(ligaceli3(cel(Col,Lin),cel(Col,LinS)));true)),
    ((i3(Col,LinA,0),assertz(ligaceli3(cel(Col,Lin),cel(Col,LinA)));true)),
    Col1 is Col-1,
    cria_grafo_lin(Col1,Lin).
cria_grafo_lin(Col,Lin):-Col1 is Col-1,cria_grafo_lin(Col1,Lin).


%?- cria_grafo(4,4).
%true.

/*?-ligaceli3(A,B).
A = cel(4, 4),
B = cel(3, 4) ;
A = cel(4, 4),
B = cel(4, 3) ;
A = cel(3, 4),
B = cel(4, 4) ;
A = cel(3, 4),
B = cel(2, 4) ;
A = cel(3, 4),
B = cel(3, 3) ;
A = cel(2, 4),
B = cel(3, 4) ;
A = cel(2, 4),
B = cel(2, 3) ;
A = cel(1, 4),
B = cel(2, 4) ;
A = cel(1, 4),
B = cel(1, 3) ;
(...)*/

/*?-findall(_,ligaceli3(_,_),L),length(L,Length).
L = [_, _, _, _, _, _, _, _, _|...],
Length = 34.
*/

dfs(Orig,Dest,Cam):-
	dfs2(Orig,Dest,[Orig],Cam).

dfs2(Dest,Dest,LA,Cam):-
	reverse(LA,Cam).

dfs2(Act,Dest,LA,Cam):-
	ligaceli3(Act,X),
        \+ member(X,LA),
	dfs2(X,Dest,[X|LA],Cam).

%?- dfs(cel(2,1),cel(4,4),L).
%L = [cel(2, 1), cel(1, 1), cel(1, 2), cel(2, 2), cel(2, 3), cel(3, 3), cel(4, 3), cel(4, 4)]  




all_dfs(Orig,Dest,LCam):-findall(Cam,dfs(Orig,Dest,Cam),LCam).

%?- all_dfs(cel(1,3),cel(4,4),L),length(L,Length).
%L = [_, _, _, _, _, _, _, _, _|...],
%Length = 34.




better_dfs(Orig,Dest,Cam):-all_dfs(Orig,Dest,LCam), shortlist(LCam,Cam,_).

shortlist([L],L,N):-!,length(L,N).
shortlist([L|LL],Lm,Nm):-shortlist(LL,Lm1,Nm1),
				length(L,NL),
			((NL<Nm1,!,Lm=L,Nm is NL);(Lm=Lm1,Nm is Nm1)).

%?- better_dfs(cel(1,3),cel(4,4),L).
%L = [cel(1, 3), cel(1, 4), cel(2, 4), cel(3, 4), cel(4, 4)]
 



bfs(Orig,Dest,Cam):-bfs2(Dest,[[Orig]],Cam).

bfs2(Dest,[[Dest|T]|_],Cam):-
	reverse([Dest|T],Cam).

bfs2(Dest,[LA|Outros],Cam):-
	LA=[Act|_],
	findall([X|LA],
		(Dest\==Act,ligaceli3(Act,X),\+ member(X,LA)),
		Novos),
	append(Outros,Novos,Todos),
	bfs2(Dest,Todos,Cam).

%?- bfs(cel(1,3),cel(4,4),L).

aStar(Orig,Dest,Cam,Custo):-
    aStar2(Dest,[(_,0,[Orig])],Cam,Custo).

aStar2(Dest,[(_,Custo,[Dest|T])|_],Cam,Custo):-
	reverse([Dest|T],Cam).

aStar2(Dest,[(_,Ca,LA)|Outros],Cam,Custo):-
	LA=[Act|_],
	findall((CEX,CaX,[X|LA]),
		(Dest\==Act,(edge(Act,X,CustoX);edge(X,Act,CustoX)),\+ member(X,LA),
		CaX is CustoX + Ca, estimativa(X,Dest,EstX),
		CEX is CaX +EstX),Novos),
	append(Outros,Novos,Todos),
	sort(Todos,TodosOrd),
	aStar2(Dest,TodosOrd,Cam,Custo).

% substituir a chamada edge(Act,X,CustoX)
% por (edge(Act,X,CustoX);edge(X,Act,CustoX))
% se quiser ligacoes bidirecionais


estimativa(Nodo1,Nodo2,Estimativa):-
	node(Nodo1,X1,Y1),
	node(Nodo2,X2,Y2),
	Estimativa is sqrt((X1-X2)^2+(Y1-Y2)^2).
%aStar((1,3),(4,4),CM,CUSTO).
%CM = [(1, 3), (2, 1), (2, 3), (3, 3), (4, 4)],
%CUSTO = 84 ;