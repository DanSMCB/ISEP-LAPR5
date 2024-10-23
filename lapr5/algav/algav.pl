
:-dynamic ligacel/2.
:-dynamic m/3.
:-dynamic nlin/1.
:-dynamic melhor_sol_dfs/2.


edificio(a, 4, 4).
edificio(b, 4, 4).

pisos(a,[a1,a2,a3]).
pisos(b,[b1,b2]).

passagem(cel(a1,2,2), cel(b2,3,3)).
passagem(cel(a1,3,2), cel(b1,3,3)).
passagem(cel(a3,4,1), cel(b2,3,2)).

elevador(a, cel(1, 2)).
elevador(b, cel(1, 3)).

door(cel(a1,2,3)).
door(cel(a2,3,3)).
door(cel(a3,3,3)).
door(cel(b1,1,2)).

%m(edi, col,lin,valor)
m(a1,1,1,1).
m(a1,2,1,1).
m(a1,3,1,1).
m(a1,4,1,1).

m(a1,1,2,0).
m(a1,2,2,0).
m(a1,3,2,0).
m(a1,4,2,0).

m(a1,1,3,0).
m(a1,2,3,0).
m(a1,3,3,0).
m(a1,4,3,0).

m(a1,1,4,0).
m(a1,2,4,0).
m(a1,3,4,0).
m(a1,4,4,0).

m(a2,1,1,1).
m(a2,2,1,1).
m(a2,3,1,1).
m(a2,4,1,1).

m(a2,1,2,0).
m(a2,2,2,0).
m(a2,3,2,0).
m(a2,4,2,0).

m(a2,1,3,0).
m(a2,2,3,0).
m(a2,3,3,0).
m(a2,4,3,0).

m(a2,1,4,0).
m(a2,2,4,0).
m(a2,3,4,0).
m(a2,4,4,0).

m(a3,1,1,1).
m(a3,2,1,1).
m(a3,3,1,1).
m(a3,4,1,1).

m(a3,1,2,0).
m(a3,2,2,0).
m(a3,3,2,0).
m(a3,4,2,0).

m(a3,1,3,0).
m(a3,2,3,0).
m(a3,3,3,0).
m(a3,4,3,0).

m(a3,1,4,0).
m(a3,2,4,0).
m(a3,3,4,0).
m(a3,4,4,0).

m(b1,1,1,1).
m(b1,2,1,1).
m(b1,3,1,1).
m(b1,4,1,1).

m(b1,1,2,0).
m(b1,2,2,0).
m(b1,3,2,0).
m(b1,4,2,0).

m(b1,1,3,0).
m(b1,2,3,0).
m(b1,3,3,0).
m(b1,4,3,0).

m(b1,1,4,0).
m(b1,2,4,0).
m(b1,3,4,0).
m(b1,4,4,0).

m(b2,1,1,1).
m(b2,2,1,1).
m(b2,3,1,1).
m(b2,4,1,1).

m(b2,1,2,0).
m(b2,2,2,0).
m(b2,3,2,0).
m(b2,4,2,0).

m(b2,1,3,0).
m(b2,2,3,0).
m(b2,3,3,0).
m(b2,4,3,0).

m(b2,1,4,0).
m(b2,2,4,0).
m(b2,3,4,0).
m(b2,4,4,0).


cria_grafo(Edi,_,0):-!.
cria_grafo(Edi,Col,Lin):-cria_grafo_lin(Edi,Col,Lin),Lin1 is Lin-1,cria_grafo(Edi,Col,Lin1).

cria_grafo_lin(Edi,0, _) :- !.
cria_grafo_lin(Edi, Col, Lin) :-
    m(Edi, Col, Lin, Valor),
    assertz(celula(cel(Edi, Col, Lin), Valor)), % Store information about edi and valor
    ColS is Col + 1,
    ColA is Col - 1,
    LinS is Lin + 1,
    LinA is Lin - 1,
    ((m(_, ColS, Lin, 0), assertz(ligacel(cel(Edi, Col, Lin), cel(Edi, ColS, Lin)))); true),
    ((m(_, ColA, Lin, 0), assertz(ligacel(cel(Edi, Col, Lin), cel(Edi, ColA, Lin)))); true),
    ((m(_, Col, LinS, 0), assertz(ligacel(cel(Edi, Col, Lin), cel(Edi, Col, LinS)))); true),
    ((m(_, Col, LinA, 0), assertz(ligacel(cel(Edi, Col, Lin), cel(Edi, Col, LinA)))); true),
    ((m(_, ColS, LinS, 0), assertz(ligacel(cel(Edi, Col, Lin), cel(Edi, ColS, LinS)))); true),
    ((m(_, ColS, LinA, 0), assertz(ligacel(cel(Edi, Col, Lin), cel(Edi, ColS, LinA)))); true),
    ((m(_, ColA, LinS, 0), assertz(ligacel(cel(Edi, Col, Lin), cel(Edi, ColA, LinS)))); true),
    ((m(_, ColA, LinA, 0), assertz(ligacel(cel(Edi, Col, Lin), cel(Edi, ColA, LinA)))); true),
    Col1 is Col - 1,
    cria_grafo_lin(Edi,Col1, Lin).

cria_grafo_lin(Edi,Col, Lin) :- Col1 is Col - 1, cria_grafo_lin(Edi,Col1, Lin).

cria_grafos_pisos([], _, _).  % Caso base: lista vazia de andares
cria_grafos_pisos([Andar|OutrosAndares], Col, Lin) :-
    cria_grafo(Andar, Col, Lin),    % Cria grafo para o andar atual
    cria_grafos_pisos(OutrosAndares, Col, Lin).  % Chama recursivamente para os outros andares

inicializa_campus() :-
    % Procura todos os edificios
    findall(edificio(Nome, Col, Lin), edificio(Nome, Col, Lin), Edificios),
    % Cria grafos para todos os pisos de todos os edificios
    cria_grafos_edificios(Edificios),
    %Inicializa elevadores de todos os edificios
    inicializa_elevadores_edificios(Edificios),
    % Adiciona passagens entre andares
    adiciona_passagens_campus(),
    % Adiciona doors
    findall(Celula, door(Celula), Doors),
    muda_valor_de_celulas_para_door(Doors),
    write('Campus inicializado com sucesso!'), nl.

% Predicado para criar grafos para todos os pisos de todos os edificios
cria_grafos_edificios([]).
cria_grafos_edificios([Edificio|Resto]) :- 
    % Processa os pisos do Edificio
    processa_edificio(Edificio),
    % Outros EdifÃ­cios
    cria_grafos_edificios(Resto).

processa_edificio(edificio(Nome, Col, Lin)) :-
    % Procura todos os pisos do Edificio
    pisos(Nome,PisosList),
    % Cria grafos para todos os pisos do Edificios
    cria_grafos_pisos(PisosList, Col, Lin).
    
%ELEVADORES
% Predicado para inicializar elevadores de todos os edificios
inicializa_elevadores_edificios([]).
inicializa_elevadores_edificios([Edificio|Resto]):-
    % Inicializa elevadores de um edifÃ­cio
    inicializa_elevadores_edificio(Edificio).
    % Outros EdÃ­ficios
    inicializa_elevadores_edificios(Resto).

% Predicado para inicializar elevadores num edificio
inicializa_elevadores_edificio(edificio(NomeEdi, Col, Lin)) :-
        elevador(NomeEdi, Elevador),
        % Adiciona elevadores a todos os pisos
        % Muda o valor das celulas para Elevador 
        adiciona_elevador_a_todos_os_pisos(elevador(NomeEdi, Elevador)), %FUNCIONA
        % ObtÃ©m todas as cÃ©lulas de andar com valor "elevador"
        findall(Celula, celula(Celula, elevador(NomeEdi)), CelulasElevador),
        % Adiciona ligaÃ§Ãµes entre cÃ©lulas de andar e elevador
        cria_ligacoes_entre_celulas( CelulasElevador).

% Predicado para criar ligaÃ§Ãµes entre todas as cÃ©lulas em uma lista
cria_ligacoes_entre_celulas([]).
cria_ligacoes_entre_celulas([Celula1|Resto]) :-
    cria_ligacoes_com_outras_celulas(Celula1, Resto),
    cria_ligacoes_entre_celulas(Resto).

% Predicado para criar ligaÃ§Ãµes entre uma cÃ©lula e todas as outras cÃ©lulas em uma lista
cria_ligacoes_com_outras_celulas(_, []).
cria_ligacoes_com_outras_celulas(Celula1, [Celula2|Resto]) :-
    assert(ligacel(Celula1, Celula2)),
    assert(ligacel(Celula2, Celula1)),
    cria_ligacoes_com_outras_celulas(Celula1, Resto).

% Predicado para adicionar elevador a todos os pisos de um edifÃ­cio
adiciona_elevador_a_todos_os_pisos(elevador(NomeEdificio, cel(X, Y))) :-
    pisos(NomeEdificio, Pisos),
    adiciona_elevador_a_pisos(NomeEdificio, Pisos, X, Y).

adiciona_elevador_a_pisos(_, [], _, _).
adiciona_elevador_a_pisos(Elevador, [Piso|Resto], X, Y) :-
    adiciona_elevador(Elevador, cel(Piso, X, Y)),
    adiciona_elevador_a_pisos(Elevador, Resto, X, Y).

% Predicado para adicionar valor elevador a uma cÃ©lula especÃ­fica
adiciona_elevador(Elevador, Celula) :-
    
    (retract(celula(Celula, _)) ->
        assertz(celula(Celula, elevador(Elevador)));
        assertz(celula(Celula, elevador(Elevador))),
        write('Nova celula com elevador adicionada. Celula: '), write(Celula), nl),
    assertz(ligacel(cel(Elevador, _, _), Celula)).

% Predicado para adicionar passagens ao campus
adiciona_passagens_campus() :-
    % Procura todas as passagens
    findall(passagem(Celula1, Celula2), passagem(Celula1, Celula2), Passagens),
    % Adiciona passagens
    adiciona_passagens(Passagens).

% Predicado para adicionar passagens
adiciona_passagens([]).
adiciona_passagens(Passagens) :- 
    select(passagem(Celula1, Celula2), Passagens, Resto),
    % Mude o valor para passagem
    muda_valor_de_celula_para_passagem(Celula1, Celula2),
    % Adicione passagens entre andares
    adiciona_passagem_entre_andares(Celula1, Celula2),
    % RecursÃ£o para o restante da lista
    adiciona_passagens(Resto).

% Predicado para adicionar passagem entre dois andares
adiciona_passagem_entre_andares(Celula1, Celula2) :-
    assertz(ligacel(Celula1, Celula2)),
    assertz(ligacel(Celula2, Celula1)).

% Predicado para mudar valor de cel para "Passagem"
muda_valor_de_celula_para_passagem(Celula1, Celula2) :- 
    retract(celula(Celula1, _)), assertz(celula(Celula1, passagem(Celula1, Celula2))),
    retract(celula(Celula2, _)), assertz(celula(Celula2, passagem(Celula1, Celula2))).

% Predicado para mudar valor de cel para "Door"
muda_valor_de_celula_para_door(Celula) :- 
    retract(celula(Celula, _)), assertz(celula(Celula, door(Celula))).

% Predicado para mudar valor de todas as door para "Door"
muda_valor_de_celulas_para_door([]).
muda_valor_de_celulas_para_door([Celula|Resto]) :-
    muda_valor_de_celula_para_door(Celula),
    muda_valor_de_celulas_para_door(Resto).


dfs(Orig,Dest,Cam):-
	dfs2(Orig,Dest,[Orig],Cam).

dfs2(Dest,Dest,LA,Cam):-
	reverse(LA,Cam).

dfs2(Act,Dest,LA,Cam):-
	ligacel(Act,X),
        \+ member(X,LA),
	dfs2(X,Dest,[X|LA],Cam).


all_dfs(Orig,Dest,LCam):-findall(Cam,dfs(Orig,Dest,Cam),LCam).


better_dfs(Orig,Dest,Cam):-all_dfs(Orig,Dest,LCam), shortlist(LCam,Cam,_).


shortlist([L],L,N):-!,length(L,N).
shortlist([L|LL],Lm,Nm):-shortlist(LL,Lm1,Nm1),
				length(L,NL),
			((NL<Nm1,!,Lm=L,Nm is NL);(Lm=Lm1,Nm is Nm1)).


bfs(Orig,Dest,Cam):-bfs2(Dest,[[Orig]],Cam).

bfs2(Dest,[[Dest|T]|_],Cam):-
	reverse([Dest|T],Cam).

bfs2(Dest,[LA|Outros],Cam):-
	LA=[Act|_],
	findall([X|LA],
		(Dest\==Act,ligacel(Act,X),\+ member(X,LA)),
		Novos),
	append(Outros,Novos,Todos),
	bfs2(Dest,Todos,Cam).

    aStar(Orig,Dest,Cam,Custo):-
        aStar2(Dest,[(_,0,[Orig])],Cam,Custo).
        
        aStar2(Dest,[(_,Custo,[Dest|T])|_],Cam,Custo):-
            reverse([Dest|T],Cam).
        
        aStar2(Dest,[(_,Ca,LA)|Outros],Cam,Custo):-
            LA=[Act|_],
            findall((CEX,CaX,[X|LA]),
                (Dest\==Act,(ligacel(Act,X);ligacel(X,Act)),\+ member(X,LA),
                CaX is 1 + Ca, estimativa(X,Dest,EstX),
                CEX is CaX +EstX),Novos),
            append(Outros,Novos,Todos),
            sort(Todos,TodosOrd),
            aStar2(Dest,TodosOrd,Cam,Custo).
    
            
            estimativa(cel(A,X1,Y1), cel(B,X2,Y2), Estimativa) :-
                (   var(X1) ; var(Y1) ; var(X2) ; var(Y2) ),
                !,
                Estimativa = 1.
            
            estimativa(cel(A,X1,Y1), cel(B,X2,Y2), Estimativa) :-
                Estimativa is sqrt((X1-X2)^2 + (Y1-Y2)^2).

%-------------------------------------------------------- genetic algorithm
:-dynamic geracoes/1.
:-dynamic populacao/1.
:-dynamic prob_cruzamento/1.
:-dynamic prob_mutacao/1.
:-dynamic tarefa/4.
:-dynamic sol_final/1.
:-dynamic start_time/1.
:-dynamic max_runtime/1.

% tarefa(Id, Inicial, Final, Custo).
% CriaÃ§Ã£o inicial das tarefas
% tarefa(Id, Inicial, Final, Custo).
% CriaÃ§Ã£o inicial das tarefas
inicializarTarefas :-
    assertz(tarefa(t1, cel(a1, 1, 1), cel(b2, 3, 3), _)),
    assertz(tarefa(t2, cel(b2, 3, 1), cel(b1, 1, 1), _)),
    assertz(tarefa(t3, cel(b1, 3, 4), cel(b1, 1, 3), _)),
    assertz(tarefa(t4, cel(b1, 4, 3), cel(b2, 3, 4), _)),
    assertz(tarefa(t5, cel(b1, 3, 4), cel(b2, 4, 4), _)). 
/*
getTaskList(TaskList):-    
    findall(tarefa(Id, Inicial, Final, Custo), tarefa(Id, Inicial, Final, Custo), TaskList).

doSmth:-
    getTaskList(TaskList),
    updateInitialCel(TaskList).

    updateInitialCel([FirstTask|RestTasks]) :-
        FirstTask = tarefa(FirstId, _, FirstFinal, _),
        retract(FirstTask),
        assertz(tarefa(FirstId, cel(a1, 1, 1), FirstFinal, _)),
        updateInitialCel(RestTasks, FirstFinal).
    
    updateInitialCel([], _).
    updateInitialCel([Task|RestTasks], PreviousFinal) :-
        Task = tarefa(Id, _, Final, _),
        retract(Task),
        assertz(tarefa(Id, PreviousFinal, Final, _)),
        updateInitialCel(RestTasks, Final).
    
*/
% CÃ¡lculo do custo A* para uma tarefa
calcularCustoAStarParaTarefa(Tarefa) :-
    tarefa(Tarefa, CelulaInicial, CelulaFinal, _),
    
    % Debugging: Print values for inspection
    write('Calculating A* for task: '), write(Tarefa), nl,
    write('CelulaInicial: '), write(CelulaInicial), nl,
    write('CelulaFinal: '), write(CelulaFinal), nl,
    
    % Ensure arguments are valid before calling aStar
    nonvar(CelulaInicial),
    nonvar(CelulaFinal),
    
    % Call A* with debugging information
    catch(
        aStar(CelulaInicial, CelulaFinal, _, Custo),
        Exception,
        (write('A* Error: '), write(Exception), nl, fail)
    ),
    
    % Debugging: Print result
    write('A* Cost: '), write(Custo), nl,
    
    % Update the task with the calculated cost
    retract(tarefa(Tarefa, CelulaInicial, CelulaFinal, _)),
    assertz(tarefa(Tarefa, CelulaInicial, CelulaFinal, Custo)).

% Inicializar todas as tarefas com custo A*
inicializarCustoInicial :-
    inicializarTarefas,
    forall(tarefa(Tarefa, _, _, _), calcularCustoAStarParaTarefa(Tarefa)).
/*
inicializarCusto:-
    forall(tarefa(Tarefa, _, _, _), calcularCustoAStarParaTarefa(Tarefa)).
*/

% Predicate to calculate A* path and cost between two tasks
calcularAstar(Task1, Task2, Path, Cost) :-
    % Extract final cell of Task1 and initial cell of Task2
    tarefa(Task1, _, FinalCellTask1, _),
    tarefa(Task2, InitialCellTask2, _, _),
    %write(FinalCellTask1),
    aStar(FinalCellTask1, InitialCellTask2, Path, Cost),
    !.

% tarefas(NTarefas).
tarefas(5).

% parameterizacao
inicializa:-
    get_time(StartTime),
    asserta(start_time(StartTime)),
    write('Numero de novas Geracoes: '),read(NG),
    (retract(geracoes(_));true), asserta(geracoes(NG)),
    write('Dimensao da Populacao: '),read(DP),
    (retract(populacao(_));true), asserta(populacao(DP)),
    write('Probabilidade de Cruzamento (%):'), read(P1),
    PC is P1/100, 
    (retract(prob_cruzamento(_));true), asserta(prob_cruzamento(PC)),
    write('Probabilidade de Mutacao (%):'), read(P2),
    PM is P2/100, 
    (retract(prob_mutacao(_));true), asserta(prob_mutacao(PM)),
    write('Maximo de Tempo (segundos): '), read(MaxTime),
    asserta(max_runtime(MaxTime)).


start:-
    inicializa_campus,
    inicializarCustoInicial,
    gera.

gera:-
    inicializa,
    retractall(sol_final(_)),
    assertz(sol_final(0*1000)),
    assertz(melhores_solucoes([])), % Initialize the best solutions list
    gera_populacao(Pop),
    write('Pop='), write(Pop), nl,
    avalia_populacao(Pop, PopAv),
    write('PopAv='), write(PopAv), nl, nl,
    ordena_populacao(PopAv, PopOrd),
    geracoes(NG),
    gera_geracao(0, NG, PopOrd),
    sol_final(MelhorSol * MelhorCusto),
    write('MelhorSol: '), write(MelhorSol * MelhorCusto), nl, nl.

gera_populacao(Pop):-
    populacao(TamPop),
    tarefas(NumT),
    findall(Tarefa, tarefa(Tarefa, _, _,C), ListaTarefas),
    gera_populacao(TamPop,ListaTarefas,NumT,Pop).

gera_populacao(0,_,_,[]):-!.

gera_populacao(TamPop,ListaTarefas,NumT,[Ind|Resto]):-
    TamPop1 is TamPop-1,
    gera_populacao(TamPop1,ListaTarefas,NumT,Resto),
    gera_individuo(ListaTarefas,NumT,Ind),
    not(member(Ind,Resto)).

gera_populacao(TamPop,ListaTarefas,NumT,L):-
    gera_populacao(TamPop,ListaTarefas,NumT,L).

gera_individuo([G], 1, [G]):-!.
gera_individuo(ListaTarefas, NumT, [G|Resto]):-
    (NumT > 0 ->
        NumTemp is NumT + 1,
        random(1, NumTemp, N),
        retira(N, ListaTarefas, G, NovaLista),
        NumT1 is NumT - 1,
        gera_individuo(NovaLista, NumT1, Resto)
    ;   
        Resto = []
    ).

retira(1,[G|Resto],G,Resto).
retira(N,[G1|Resto],G,[G1|Resto1]):-
    N1 is N-1,
    retira(N1,Resto,G,Resto1).

avalia_populacao([], []).
avalia_populacao([Ind | Resto], [Ind*V | Resto1]) :-
    %write('Evaluating individual: '), write(Ind), nl,
    avalia(Ind, V),
    %write('Individual value: '), write(Ind*V), nl,
    avalia_populacao(Resto, Resto1).

avalia_populacao([_|Resto], Resto1) :-
    avalia_populacao(Resto, Resto1).

avalia([], 0).
avalia([T, T2|Resto], V) :-
    tarefa(T, _, _, Cost),
    %write('Task: '), write(T), write(', Next Task: '), write(T2), nl,
    calcularAstar(T, T2, Path, C2),
    %write('Path: '), write(Path), write(', Cost: '), write(C2), nl,
    avalia([T2|Resto], VResto),
    V is Cost + VResto + C2.

avalia([T], V) :-
    tarefa(T, _, _, Cost),
    V is Cost.

ordena_populacao(PopAv,PopAvOrd):-
    bsort(PopAv,PopAvOrd).

bsort([X],[X]):-!.
bsort([X|Xs],Ys):-
    bsort(Xs,Zs),
    btroca([X|Zs],Ys).

btroca([X],[X]):-!.

btroca([X*VX,Y*VY|L1],[Y*VY|L2]):-
    VX > VY,!,
    btroca([X*VX|L1],L2).

btroca([X|L1],[X|L2]):-btroca(L1,L2).

gera_geracao(G,G,Pop):-!,
    write('Geracao '), write(G), write(':'), nl, write(Pop), nl,
    atualiza_melhores_solucoes(Pop). % Update the best solutions at the end of the run.

gera_geracao(N, G, Pop) :-
    get_time(CurrentTime),
    start_time(StartTime),
    max_runtime(MaxTime),
    ElapsedTime is CurrentTime - StartTime,
    (ElapsedTime >= MaxTime ->
        write('Reached maximum runtime. Stopping the algorithm.'), nl
    ;
        write('Geracao '), write(N), write(':'), nl, write(Pop), nl, nl,
    cruzamento(Pop, NPop1),
    mutacao(NPop1, NPop),
    avalia_populacao(NPop, NPopAv),
    ordena_populacao(NPopAv, NPopOrd),
     N1 is N + 1,
    write('NPopOrd: '), write(NPopOrd), nl, nl,
    retirar_1_elemento_da_solucao(NPopOrd, Ind*Custo),
    write('Ind*Custo: '), write(Ind*Custo), nl, nl,
    sol_final(BestInd*BestCost),
    write('BestInd*BestCost: '), write(BestInd*BestCost), nl, nl,
    retract(sol_final(BestInd*BestCost)),
    (Custo < BestCost -> assertz(sol_final(Ind*Custo)); assertz(sol_final(BestInd*BestCost))),
    
    % Update the best solutions list with the best individuals from each generation
    atualiza_melhores_solucoes([Ind*Custo|Melhores]),

    gera_geracao(N1, G, NPopOrd)
     ).


atualiza_melhores_solucoes(NovasSolucoes) :-
    melhores_solucoes(Melhores),
    append(NovasSolucoes, Melhores, TodasSolucoes),
    ordena_populacao(TodasSolucoes, MelhoresOrdenadas),
    take(2, MelhoresOrdenadas, MelhoresAtualizadas), % Take the top 2 solutions
    retractall(melhores_solucoes(_)),
    assertz(melhores_solucoes(MelhoresAtualizadas)).

% Take the first N elements from a list
take(0, _, []) :- !.
take(_, [], []) :- !.
take(N, [H|T], [H|Rest]) :-
    N1 is N - 1,
    take(N1, T, Rest).

retirar_1_elemento_da_solucao([Ind*Custo|Resto],Ind*Custo).

gerar_pontos_cruzamento(P1,P2):-
    gerar_pontos_cruzamento1(P1,P2).

gerar_pontos_cruzamento1(P1,P2):-
    tarefas(N),
    NTemp is N+1,
    random(1,NTemp,P11),
    random(1,NTemp,P21),
    P11\==P21,!,
    ((P11<P21,!,P1=P11,P2=P21);(P1=P21,P2=P11)).
gerar_pontos_cruzamento1(P1,P2):-
    gerar_pontos_cruzamento1(P1,P2).

cruzamento([],[]).
cruzamento([Ind*_],[Ind]).
cruzamento([Ind1*_,Ind2*_|Resto],[NInd1,NInd2|Resto1]):-
    gerar_pontos_cruzamento(P1,P2),
    prob_cruzamento(Pcruz),random(0.0,1.0,Pc),
    ((Pc =< Pcruz,!,
        cruzar(Ind1,Ind2,P1,P2,NInd1),
        cruzar(Ind2,Ind1,P1,P2,NInd2))
    ;
    (NInd1=Ind1,NInd2=Ind2)),
    cruzamento(Resto,Resto1).

preencheh([],[]).

preencheh([_|R1],[h|R2]):-
    preencheh(R1,R2).

sublista(L1,I1,I2,L):-
    I1 < I2,!,
    sublista1(L1,I1,I2,L).

sublista(L1,I1,I2,L):-
    sublista1(L1,I2,I1,L).

sublista1([X|R1],1,1,[X|H]):-!,
    preencheh(R1,H).

sublista1([X|R1],1,N2,[X|R2]):-!,
    N3 is N2 - 1,
    sublista1(R1,1,N3,R2).

sublista1([_|R1],N1,N2,[h|R2]):-
    N3 is N1 - 1,
    N4 is N2 - 1,
    sublista1(R1,N3,N4,R2).

rotate_right(L,K,L1):-
    tarefas(N),
    T is N - K,
    rr(T,L,L1).

rr(0,L,L):-!.

rr(N,[X|R],R2):-
    N1 is N - 1,
    append(R,[X],R1),
    rr(N1,R1,R2).

elimina([],_,[]):-!.

elimina([X|R1],L,[X|R2]):-
    not(member(X,L)),!,
    elimina(R1,L,R2).

elimina([_|R1],L,R2):-
    elimina(R1,L,R2).

insere([],L,_,L):-!.
insere([X|R],L,N,L2):-
    tarefas(T),
    ((N>T,!,N1 is N mod T);N1 = N),
    insere1(X,N1,L,L1),
    N2 is N + 1,
    insere(R,L1,N2,L2).

insere1(X,1,L,[X|L]):-!.
insere1(X,N,[Y|L],[Y|L1]):-
    N1 is N-1,
    insere1(X,N1,L,L1).

cruzar(Ind1,Ind2,P1,P2,NInd11):-
    sublista(Ind1,P1,P2,Sub1),
    tarefas(NumT),
    R is NumT-P2,
    rotate_right(Ind2,R,Ind21),
    elimina(Ind21,Sub1,Sub2),
    P3 is P2 + 1,
    insere(Sub2,Sub1,P3,NInd1),
    eliminah(NInd1,NInd11).

eliminah([],[]).

eliminah([h|R1],R2):-!,
    eliminah(R1,R2).

eliminah([X|R1],[X|R2]):-
    eliminah(R1,R2).

mutacao([],[]).
mutacao([Ind|Rest],[NInd|Rest1]):-
    prob_mutacao(Pmut),
    random(0.0,1.0,Pm),
    ((Pm < Pmut,!,mutacao1(Ind,NInd));NInd = Ind),
    mutacao(Rest,Rest1).

mutacao1(Ind,NInd):-
    gerar_pontos_cruzamento(P1,P2),
    mutacao22(Ind,P1,P2,NInd).

mutacao22([G1|Ind],1,P2,[G2|NInd]):-
    !, P21 is P2-1,
    mutacao23(G1,P21,Ind,G2,NInd).
mutacao22([G|Ind],P1,P2,[G|NInd]):-
    P11 is P1-1, P21 is P2-1,
    mutacao22(Ind,P11,P21,NInd).

mutacao23(G1,1,[G2|Ind],G2,[G1|Ind]):-!.
mutacao23(G1,P,[G|Ind],G2,[G|NInd]):-
    P1 is P-1,
    mutacao23(G1,P1,Ind,G2,NInd).