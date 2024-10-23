using System.Collections.Generic;
using System.Threading.Tasks;
using tarefaAPI.Domain.Tarefas;
using MongoDB.Driver;

namespace tarefaAPI.Domain.Tarefas
{
    public interface ITarefaRepositoryMongo
    {
        Task<Tarefa> GetByCodigoAsync(string codigo);

        Task<List<Tarefa>> GetTarefas();

        Task<List<Tarefa>> GetTarefasByEstadoAsync(string estado);

        Task AddAsync(Tarefa tarefa);

        Task UpdateAsync(string codigo, UpdateDefinition<Tarefa> update);
    }
}
