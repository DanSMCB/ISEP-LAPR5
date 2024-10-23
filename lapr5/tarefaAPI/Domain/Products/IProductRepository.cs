using tarefaAPI.Domain.Shared;

namespace tarefaAPI.Domain.Products
{
    public interface IProductRepository: IRepository<Product,ProductId>
    {
    }
}