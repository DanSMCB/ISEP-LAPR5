using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace tarefaAPI.Domain.Tarefas
{
    [BsonIgnoreExtraElements]
    public class TarefaDto
    {
        [BsonRepresentation(BsonType.String)]
        public Guid DomainId { get; set; }
        [BsonRequired]
        public string Codigo { get; set; }
        public string Descricao { get; set; }
        public string Robot { get; set; }
        public string TipoDeRobot { get; set; }
        [BsonRequired]
        public string Estado { get; set; }
        public string ContactoRequisitante { get; set; }
        public string TipoDeTarefa { get; set; }
        public string ContactoIncidente { get; set; }
        public string Edificio { get; set; }
        public List<PisoDto> Pisos { get; set; }
        public string SalaRecolha { get; set; }
        public string SalaEntrega { get; set; }
        public string ContactoRecolha { get; set; }
        public string ContactoEntrega { get; set; }

        public TarefaDto()
        {
            Pisos = new List<PisoDto>();
        }

        public TarefaDto(string codigo, string estado)
        {
            this.Codigo = codigo;
            this.Estado = estado;
        }

        public TarefaDto(Guid domainId, string codigo, string descricao, string robot, string tipoDeRobot, string estado, string contactoRequisitante, string tipoDeTarefa, string contactoIncidente, string edificio, List<PisoDto> pisos, string salaRecolha, string salaEntrega, string contactoRecolha, string contactoEntrega)
        {
            this.DomainId = domainId;
            this.Codigo = codigo;
            this.Descricao = descricao;
            this.Robot = robot;
            this.TipoDeRobot = tipoDeRobot;
            this.Estado = estado;
            this.ContactoRequisitante = contactoRequisitante;
            this.TipoDeTarefa = tipoDeTarefa;
            this.ContactoIncidente = contactoIncidente;
            this.Edificio = edificio;

            this.Pisos = pisos;

            this.SalaRecolha = salaRecolha;
            this.SalaEntrega = salaEntrega;
            this.ContactoRecolha = contactoRecolha;
            this.ContactoEntrega = contactoEntrega;
        }
    }
}
