using System.Collections.Generic;
using System.Threading.Tasks;
using tarefaAPI.Domain.Shared;
using tarefaAPI.Mappers;
using System.Linq;
using tarefaAPI.Domain.Tarefas;
using Microsoft.Extensions.Logging;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json;

namespace tarefaAPI.Domain.Tarefas
{
    public class TarefaService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITarefaRepositoryMongo _repo;
        private readonly ILogger<TarefaService> _logger;

        public TarefaService(IUnitOfWork unitOfWork, ITarefaRepositoryMongo repo, ILogger<TarefaService> logger)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
            this._logger = logger;
        }

        public async Task<TarefaDto> GetByDomainIdAsync(string codigo)
        {
            var tarefa = await _repo.GetByCodigoAsync(codigo);
            if (tarefa == null)
            {
                return null;
            }

            return TarefaMapper.toDTO(tarefa);
        }

        public async Task<List<TarefaDto>> GetTarefasAsync()
        {
            var list = await this._repo.GetTarefas();
            _logger.LogInformation($"Número de tarefas no repositório: {list.Count}");

            List<TarefaDto> listDto = list.Select(tarefa =>
                new TarefaDto
                {
                    DomainId = tarefa.DomainId,
                    Codigo = tarefa.Codigo,
                    Descricao = tarefa.Descricao,
                    Robot = tarefa.Robot,
                    TipoDeRobot = tarefa.TipoDeRobot,
                    Estado = tarefa.Estado,
                    ContactoRequisitante = tarefa.ContactoRequisitante,
                    TipoDeTarefa = tarefa.TipoDeTarefa,
                    ContactoIncidente = tarefa.ContactoIncidente,
                    Edificio = tarefa.Edificio,
                    Pisos = tarefa.Pisos?.Select(piso => new PisoDto(piso.Piso, piso.Id.ToString())).ToList() ?? new List<PisoDto>(),
                    SalaRecolha = tarefa.SalaRecolha,
                    SalaEntrega = tarefa.SalaEntrega,
                    ContactoRecolha = tarefa.ContactoRecolha,
                    ContactoEntrega = tarefa.ContactoEntrega
                }).ToList();

            return listDto;
        }

        public async Task<List<TarefaDto>> GetTarefasNaoAprovadasAsync()
        {
            var list = await this._repo.GetTarefasByEstadoAsync("nao aprovada");
            _logger.LogInformation($"Número de tarefas no repositório: {list.Count}");

            List<TarefaDto> listDto = list.Select(tarefa =>
                new TarefaDto
                {
                    DomainId = tarefa.DomainId,
                    Codigo = tarefa.Codigo,
                    Descricao = tarefa.Descricao,
                    Robot = tarefa.Robot,
                    TipoDeRobot = tarefa.TipoDeRobot,
                    Estado = tarefa.Estado,
                    ContactoRequisitante = tarefa.ContactoRequisitante,
                    TipoDeTarefa = tarefa.TipoDeTarefa,
                    ContactoIncidente = tarefa.ContactoIncidente,
                    Edificio = tarefa.Edificio,
                    Pisos = tarefa.Pisos?.Select(piso => new PisoDto(piso.Piso, piso.Id.ToString())).ToList() ?? new List<PisoDto>(),
                    SalaRecolha = tarefa.SalaRecolha,
                    SalaEntrega = tarefa.SalaEntrega,
                    ContactoRecolha = tarefa.ContactoRecolha,
                    ContactoEntrega = tarefa.ContactoEntrega
                }).ToList();

                return listDto;
        }

        public async Task<TarefaDto> CreateTarefaAsync(TarefaDto tarefaDto)
        {
            tarefaDto.DomainId = Guid.NewGuid();

            Console.WriteLine($"TarefaDto: {tarefaDto.DomainId}");

            var novaTarefa = TarefaMapper.toDomain(tarefaDto);
            await _repo.AddAsync(novaTarefa);
            await _unitOfWork.CommitAsync();
            return TarefaMapper.toDTO(novaTarefa);
        }

        public async Task<TarefaDto> UpdateEstadoDaTarefaAsync(string codigo, string novoEstado)
        {
            var tarefa = await _repo.GetByCodigoAsync(codigo);

            if (tarefa == null)
            {
                return null;
            }

            Console.WriteLine($"Tarefa antes: {JsonConvert.SerializeObject(tarefa)}");

            var update = Builders<Tarefa>.Update.Set(x => x.Estado, novoEstado);

            Console.WriteLine($"Tarefa depois: {JsonConvert.SerializeObject(update)}");

            await _repo.UpdateAsync(codigo, update);

            // Fetch the updated task from the database
            var updatedTarefa = await _repo.GetByCodigoAsync(codigo);

            await _unitOfWork.CommitAsync();

            return TarefaMapper.toDTO(updatedTarefa);
        }
    }
}
