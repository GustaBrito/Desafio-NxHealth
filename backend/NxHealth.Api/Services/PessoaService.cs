using NxHealth.Api.Dtos;
using NxHealth.Api.Models;
using NxHealth.Api.Repositories;

namespace NxHealth.Api.Services;

public class PessoaService : IPessoaService
{
    private readonly IPessoaRepository _repository;

    public PessoaService(IPessoaRepository repository)
    {
        _repository = repository;
    }

    public async Task<IReadOnlyList<PessoaResponse>> GetAllAsync()
    {
        var pessoas = await _repository.GetAllAsync();
        return pessoas.Select(MapToResponse).ToList();
    }

    public async Task<PessoaResponse?> GetByIdAsync(int id)
    {
        var pessoa = await _repository.GetByIdAsync(id);
        return pessoa is null ? null : MapToResponse(pessoa);
    }

    public async Task<PessoaResponse> CreateAsync(PessoaRequest request)
    {
        var pessoa = new Pessoa
        {
            NomeCompleto = request.NomeCompleto,
            CpfCnpj = request.CpfCnpj,
            Telefone = request.Telefone,
            Email = request.Email
        };

        var created = await _repository.CreateAsync(pessoa);
        return MapToResponse(created);
    }

    public async Task<bool> UpdateAsync(int id, PessoaRequest request)
    {
        var pessoa = new Pessoa
        {
            Id = id,
            NomeCompleto = request.NomeCompleto,
            CpfCnpj = request.CpfCnpj,
            Telefone = request.Telefone,
            Email = request.Email
        };

        return await _repository.UpdateAsync(pessoa);
    }

    public Task<bool> DeleteAsync(int id)
    {
        return _repository.DeleteAsync(id);
    }

    private static PessoaResponse MapToResponse(Pessoa pessoa)
    {
        return new PessoaResponse
        {
            Id = pessoa.Id,
            NomeCompleto = pessoa.NomeCompleto,
            CpfCnpj = pessoa.CpfCnpj,
            Telefone = pessoa.Telefone,
            Email = pessoa.Email
        };
    }
}
