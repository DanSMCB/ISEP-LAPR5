using tarefaAPI.Domain.Products;
using tarefaAPI.Infrastructure.Shared;

namespace tarefaAPI.Infrastructure.Products
{
    public class ProductRepository : BaseRepository<Product, ProductId>,IProductRepository
    {
        public ProductRepository(MySQLContext context):base(context.Products)
        {
           
        }
    }
}