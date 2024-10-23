using System;
using System.Linq;
using tarefaAPI.Domain.Tarefas;
using MongoDB.Bson;

namespace tarefaAPI.Mappers
{
    public class TarefaMapper
    {
        public static Tarefa toDomain(TarefaDto tarefaDto)
        {
            return new Tarefa(
                tarefaDto.DomainId,
                tarefaDto.Codigo,
                tarefaDto.Descricao,
                tarefaDto.Robot,
                tarefaDto.TipoDeRobot,
                tarefaDto.Estado,
                tarefaDto.ContactoRequisitante,
                tarefaDto.TipoDeTarefa,
                tarefaDto.ContactoIncidente,
                tarefaDto.Edificio,
                tarefaDto.Pisos?.Select(pisoDto => new PisoDto(pisoDto.Piso, pisoDto.Id.ToString())).ToList() ?? new List<PisoDto>(),
                tarefaDto.SalaRecolha,
                tarefaDto.SalaEntrega,
                tarefaDto.ContactoRecolha,
                tarefaDto.ContactoEntrega
            );
        }


        public static TarefaDto toDTO(Tarefa tarefa)
        {
            return new TarefaDto
            {
                DomainId = tarefa.DomainId,
                Codigo = tarefa.Codigo,
                Descricao = tarefa.Descricao,
                Robot = tarefa.Robot,
                TipoDeRobot = tarefa.TipoDeRobot,
                Estado = tarefa.Estado,
                ContactoRequisitante = tarefa.ContactoRequisitante,
                TipoDeTarefa = tarefa.TipoDeTarefa,
                ContactoIncidente = tarefa.ContactoIncidente,
                Edificio = tarefa.Edificio,
                Pisos = tarefa.Pisos?.Select(piso => new PisoDto(piso.Piso, piso.Id.ToString())).ToList() ?? new List<PisoDto>(),
                SalaRecolha = tarefa.SalaRecolha,
                SalaEntrega = tarefa.SalaEntrega,
                ContactoRecolha = tarefa.ContactoRecolha,
                ContactoEntrega = tarefa.ContactoEntrega
            };
        }
    }
}
