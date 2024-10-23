using MongoDB.Driver;
using tarefaAPI.Domain.Tarefas;
using tarefaAPI.Infrastructure.Shared;
using Microsoft.Extensions.Options;
using MongoDB.Bson.Serialization;

namespace tarefaAPI.Infrastructure.Tarefas
{
    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;

        public MongoDbContext(IMongoDbSettings settings)
        {
            Console.WriteLine("MongoDbContext constructor called");

            var client = new MongoClient(settings.ConnectionString);
            _database = client.GetDatabase(settings.DatabaseName);
        }

        public IMongoCollection<Tarefa> Tarefas => _database.GetCollection<Tarefa>("tarefas");
    }
}
