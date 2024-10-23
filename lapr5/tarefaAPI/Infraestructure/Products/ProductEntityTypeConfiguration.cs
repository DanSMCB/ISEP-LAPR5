using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using tarefaAPI.Domain.Products;

namespace tarefaAPI.Infrastructure.Products
{
    internal class ProductEntityTypeConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            //builder.ToTable("Products", SchemaNames.tarefaAPI);
            builder.HasKey(b => b.Id);
        }
    }
}