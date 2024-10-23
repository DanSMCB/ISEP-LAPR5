using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using tarefaAPI.Domain.Tarefas;
using tarefaAPI.Infrastructure.Shared;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace tarefaAPI.Infrastructure.Tarefas
{
    public class TarefaRepositoryMongo : ITarefaRepositoryMongo
    {
        private readonly IMongoCollection<Tarefa> _tarefasCollection;
        private readonly ILogger<TarefaRepositoryMongo> _logger;

        public TarefaRepositoryMongo(MongoDbContext context, ILogger<TarefaRepositoryMongo> logger)
        {
            _tarefasCollection = context.Tarefas;
            _logger = logger;
        }

        public async Task<Tarefa> GetByCodigoAsync(string codigo)
        {
            return await _tarefasCollection.Find(x => x.Codigo == codigo).FirstOrDefaultAsync();
        }

        public async Task<List<Tarefa>> GetTarefas()
        {
            var result = await _tarefasCollection.Find(_ => true).ToListAsync();
            _logger.LogInformation($"Número de tarefas recuperadas do MongoDB: {result.Count}");
            return result;
        }

        public async Task<List<Tarefa>> GetTarefasByEstadoAsync(string estado)
        {
            var result =  await _tarefasCollection.Find(x => x.Estado == estado).ToListAsync();
            _logger.LogInformation($"Número de tarefas recuperadas do MongoDB: {result.Count}");
            return result;
        }

        public async Task AddAsync(Tarefa tarefa)
        {
            await _tarefasCollection.InsertOneAsync(tarefa);
        }

        public async Task UpdateAsync(string codigo, UpdateDefinition<Tarefa> update)
        {
            var filter = Builders<Tarefa>.Filter.Eq(x => x.Codigo, codigo);
            await _tarefasCollection.UpdateOneAsync(filter, update);
        }
    }
}
