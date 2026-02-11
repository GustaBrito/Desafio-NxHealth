using Microsoft.EntityFrameworkCore;
using NxHealth.Api.Data;
using NxHealth.Api.Models;

namespace NxHealth.Api.Repositories;

public class PessoaRepository : IPessoaRepository
{
    private readonly AppDbContext _dbContext;

    public PessoaRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IReadOnlyList<Pessoa>> GetAllAsync()
    {
        return await _dbContext.Pessoas
            .AsNoTracking()
            .OrderBy(x => x.NomeCompleto)
            .ToListAsync();
    }

    public async Task<Pessoa?> GetByIdAsync(int id)
    {
        return await _dbContext.Pessoas
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<Pessoa> CreateAsync(Pessoa pessoa)
    {
        _dbContext.Pessoas.Add(pessoa);
        await _dbContext.SaveChangesAsync();
        return pessoa;
    }

    public async Task<bool> UpdateAsync(Pessoa pessoa)
    {
        var existente = await _dbContext.Pessoas.FirstOrDefaultAsync(x => x.Id == pessoa.Id);
        if (existente is null)
        {
            return false;
        }

        existente.NomeCompleto = pessoa.NomeCompleto;
        existente.TipoPessoa = pessoa.TipoPessoa;
        existente.CpfCnpj = pessoa.CpfCnpj;
        existente.Telefone = pessoa.Telefone;
        existente.Email = pessoa.Email;
        existente.Cep = pessoa.Cep;
        existente.Endereco = pessoa.Endereco;
        existente.Logradouro = pessoa.Logradouro;
        existente.Bairro = pessoa.Bairro;
        existente.Cidade = pessoa.Cidade;
        existente.Uf = pessoa.Uf;

        await _dbContext.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var existente = await _dbContext.Pessoas.FirstOrDefaultAsync(x => x.Id == id);
        if (existente is null)
        {
            return false;
        }

        _dbContext.Pessoas.Remove(existente);
        await _dbContext.SaveChangesAsync();
        return true;
    }
}
