using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using tarefaAPI.Infrastructure;
using tarefaAPI.Infrastructure.Categories;
using tarefaAPI.Infrastructure.Products;
using tarefaAPI.Infrastructure.Families;
using tarefaAPI.Infrastructure.Tarefas;
using tarefaAPI.Infrastructure.Shared;
using tarefaAPI.Domain.Shared;
using tarefaAPI.Domain.Categories;
using tarefaAPI.Domain.Products;
using tarefaAPI.Domain.Families;
using tarefaAPI.Domain.Tarefas;
using Microsoft.OpenApi.Models;

namespace tarefaAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            var connectionString = Configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<MySQLContext>(
                options => options.UseSqlServer(connectionString).ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>()
            );

            // Configure MongoDB settings
            services.Configure<MongoDbSettings>(Configuration.GetSection("MongoDbSettings"));
            services.AddSingleton<IMongoDbSettings>(sp => sp.GetRequiredService<IOptions<MongoDbSettings>>().Value);

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    builder =>
                    {
                        builder
                            .AllowAnyOrigin()
                            .AllowAnyMethod()
                            .AllowAnyHeader();
                    });
            });

            services.AddControllers().AddNewtonsoftJson(options =>
            {
                options.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore;
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "tarefaAPI", Version = "v1" });
            });

            services.AddLogging();
            
            // Configure your services
            ConfigureMyServices(services);
        }


        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            // Use CORS
            app.UseCors("AllowAll");

            // Use Swagger
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "tarefaAPI");
            });

            app.UseHttpsRedirection();
            
            app.UseRouting();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        private void ConfigureMyServices(IServiceCollection services)
        {
            services.AddTransient<MongoDbContext>();
            
            services.AddTransient<IUnitOfWork, UnitOfWork>();

            services.AddTransient<ICategoryRepository, CategoryRepository>();
            services.AddTransient<CategoryService>();

            services.AddTransient<IProductRepository, ProductRepository>();
            services.AddTransient<ProductService>();

            services.AddTransient<IFamilyRepository, FamilyRepository>();
            services.AddTransient<FamilyService>();

            services.AddTransient<ITarefaRepositoryMongo, TarefaRepositoryMongo>();
            services.AddTransient<TarefaService>();
        }
    }
}
