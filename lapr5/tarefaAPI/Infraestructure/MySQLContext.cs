using Microsoft.EntityFrameworkCore;
using tarefaAPI.Domain.Categories;
using tarefaAPI.Domain.Products;
using tarefaAPI.Domain.Families;
using tarefaAPI.Infrastructure.Categories;
using tarefaAPI.Infrastructure.Products;
using tarefaAPI.Domain.Tarefas;
using tarefaAPI.Infrastructure.Tarefas;

namespace tarefaAPI.Infrastructure
{
    public class MySQLContext : DbContext {
        public DbSet<Category> Categories { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<Family> Families { get; set; }

        public DbSet<Tarefa> Tarefas { get; set; }

        public string ConnectionString  { get; set; }

        public MySQLContext(DbContextOptions<MySQLContext> options) : base(options) {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Ignore<PisoDto>();
            modelBuilder.ApplyConfiguration(new CategoryEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ProductEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new FamilyEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new TarefaEntityTypeConfiguration());
        }
    }
}