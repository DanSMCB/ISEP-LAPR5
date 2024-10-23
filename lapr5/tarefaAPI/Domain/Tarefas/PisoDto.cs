using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace tarefaAPI.Domain.Tarefas
{
    public class PisoDto
    {
        [BsonElement("piso")]
        public string Piso { get; set; }

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }

        public PisoDto(string piso, string id)
        {
            this.Id = ObjectId.Parse(id);
            this.Piso = piso;
        }
    }
}
