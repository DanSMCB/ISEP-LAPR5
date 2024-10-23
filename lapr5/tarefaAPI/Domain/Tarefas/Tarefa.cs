using System;
using System.Collections.Generic;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace tarefaAPI.Domain.Tarefas
{
    [BsonIgnoreExtraElements]
    public class Tarefa
    {
        [BsonRepresentation(BsonType.String)]
        [BsonElement("domainId")]
        public Guid DomainId { get; private set; }
        [BsonElement("codigo")]
        public string Codigo { get; private set; }
        [BsonElement("descricao")]
        public string Descricao { get; private set; }
        [BsonElement("robot")]
        public string Robot { get; private set; }
        [BsonElement("tipoDeRobot")]
        public string TipoDeRobot { get; private set; }
        [BsonElement("estado")]
        public string Estado { get; private set; }
        [BsonElement("contactoRequisitante")]
        public string ContactoRequisitante { get; private set; }
        [BsonElement("tipoDeTarefa")]
        public string TipoDeTarefa { get; private set; }
        [BsonElement("contactoIncidente")]
        public string ContactoIncidente { get; private set; }
        [BsonElement("edificio")]
        public string Edificio { get; private set; }
        [BsonElement("pisos")]
        public List<PisoDto> Pisos { get; private set; }
        [BsonElement("salaRecolha")]
        public string SalaRecolha { get; private set; }
        [BsonElement("salaEntrega")]
        public string SalaEntrega { get; private set; }
        [BsonElement("contactoRecolha")]
        public string ContactoRecolha { get; private set; }
        [BsonElement("contactoEntrega")]
        public string ContactoEntrega { get; private set; }

        public Tarefa()
        {
        }

        public Tarefa(
            Guid domainId, string codigo, string descricao, string robot, string tipoDeRobot,
            string estado, string contactoRequisitante, string tipoDeTarefa, string contactoIncidente,
            string edificio, List<PisoDto> pisos, string salaRecolha, string salaEntrega,
            string contactoRecolha, string contactoEntrega)
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

        public void AtualizarEstado(string novoEstado)
        {
            Estado = novoEstado;
        }

        public override string ToString()
        {
            // Use the null-conditional operator (?.) to handle a potentially null Id
            return this.Codigo?.ToString() ?? "NoId";
        }
    }
}
