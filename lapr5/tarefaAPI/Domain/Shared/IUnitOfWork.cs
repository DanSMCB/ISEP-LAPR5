using System.Threading.Tasks;

namespace tarefaAPI.Domain.Shared
{
    public interface IUnitOfWork
    {
        Task<int> CommitAsync();
    }
}