
using tarefaAPI.Domain.Shared;

namespace tarefaAPI.Domain.Categories
{
    public interface ICategoryRepository: IRepository<Category, CategoryId>
    {
    }
}