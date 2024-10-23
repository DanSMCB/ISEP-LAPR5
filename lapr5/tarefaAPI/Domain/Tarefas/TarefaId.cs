using System;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace tarefaAPI.Domain.Tarefas
{
    public class TarefaId
    {
        [BsonRepresentation(BsonType.String)]
        public Guid Value { get; private set; }

        public TarefaId(Guid value)
        {
            Value = value;
        }

        public static TarefaId FromString(string value)
        {
            return new TarefaId(Guid.Parse(value));
        }

        public static TarefaId FromGuid(Guid value)
        {
            return new TarefaId(value);
        }
    }
}
