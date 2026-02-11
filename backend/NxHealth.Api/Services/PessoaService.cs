using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
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
        var pessoa = MapToEntity(request);

        try
        {
            var created = await _repository.CreateAsync(pessoa);
            return MapToResponse(created);
        }
        catch (DbUpdateException ex) when (IsCpfCnpjUniqueViolation(ex))
        {
            throw new CpfCnpjDuplicadoException();
        }
    }

    public async Task<bool> UpdateAsync(int id, PessoaRequest request)
    {
        var pessoa = MapToEntity(request, id);

        try
        {
            return await _repository.UpdateAsync(pessoa);
        }
        catch (DbUpdateException ex) when (IsCpfCnpjUniqueViolation(ex))
        {
            throw new CpfCnpjDuplicadoException();
        }
    }

    public Task<bool> DeleteAsync(int id)
    {
        return _repository.DeleteAsync(id);
    }

    private static Pessoa MapToEntity(PessoaRequest request, int id = 0)
    {
        return new Pessoa
        {
            Id = id,
            NomeCompleto = request.NomeCompleto ?? string.Empty,
            TipoPessoa = request.TipoPessoa ?? string.Empty,
            CpfCnpj = NormalizarDigitos(request.CpfCnpj),
            Telefone = request.Telefone ?? string.Empty,
            Email = request.Email ?? string.Empty,
            Cep = request.Cep ?? string.Empty,
            Endereco = request.Endereco ?? string.Empty,
            Logradouro = request.Logradouro ?? string.Empty,
            Bairro = request.Bairro ?? string.Empty,
            Cidade = request.Cidade ?? string.Empty,
            Uf = (request.Uf ?? string.Empty).ToUpperInvariant()
        };
    }

    private static PessoaResponse MapToResponse(Pessoa pessoa)
    {
        return new PessoaResponse
        {
            Id = pessoa.Id,
            NomeCompleto = pessoa.NomeCompleto,
            TipoPessoa = pessoa.TipoPessoa,
            CpfCnpj = pessoa.CpfCnpj,
            Telefone = pessoa.Telefone,
            Email = pessoa.Email,
            Cep = pessoa.Cep,
            Endereco = pessoa.Endereco,
            Logradouro = pessoa.Logradouro,
            Bairro = pessoa.Bairro,
            Cidade = pessoa.Cidade,
            Uf = pessoa.Uf
        };
    }

    private static string NormalizarDigitos(string valor)
    {
        return new string((valor ?? string.Empty).Where(char.IsDigit).ToArray());
    }

    private static bool IsCpfCnpjUniqueViolation(DbUpdateException exception)
    {
        if (exception.InnerException is not SqliteException sqlite)
        {
            return false;
        }

        const int sqliteConstraint = 19;
        const int sqliteConstraintUnique = 2067;

        return sqlite.SqliteErrorCode == sqliteConstraint &&
               sqlite.SqliteExtendedErrorCode == sqliteConstraintUnique;
    }
}
