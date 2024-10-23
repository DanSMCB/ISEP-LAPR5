using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;

namespace tarefaAPI.Domain.Tarefas
{
    public class TarefaIdSerializer : IBsonSerializer<TarefaId>
    {
        public Type ValueType => typeof(TarefaId);

        public TarefaId Deserialize(BsonDeserializationContext context, BsonDeserializationArgs args)
        {
            if (context.Reader.CurrentBsonType == BsonType.Null)
            {
                return null; // Handle null values if TarefaId can be null
            }

            if (context.Reader.CurrentBsonType == BsonType.String)
            {
                var stringValue = context.Reader.ReadString();
                return TarefaId.FromString(stringValue);
            }

            throw new InvalidOperationException("Invalid BsonType for deserialization.");
        }

        public void Serialize(BsonSerializationContext context, BsonSerializationArgs args, TarefaId value)
        {
            if (value == null)
            {
                context.Writer.WriteNull(); // Handle null values if TarefaId can be null
                return;
            }

            context.Writer.WriteString(value.Value.ToString());
        }

        object IBsonSerializer.Deserialize(BsonDeserializationContext context, BsonDeserializationArgs args)
        {
            return Deserialize(context, args);
        }

        public void Serialize(BsonSerializationContext context, BsonSerializationArgs args, object value)
        {
            if (value is TarefaId tarefaId)
            {
                Serialize(context, args, tarefaId);
            }
            else
            {
                throw new InvalidOperationException("Invalid value type for serialization.");
            }
        }
    }
}
