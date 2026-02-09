using NxHealth.Api.Models;

namespace NxHealth.Api.Repositories;

public class PessoaRepository : IPessoaRepository
{
    private static readonly object LockObj = new();
    private static readonly List<Pessoa> Pessoas = new();
    private static int _nextId = 1;

    public Task<IReadOnlyList<Pessoa>> GetAllAsync()
    {
        lock (LockObj)
        {
            return Task.FromResult((IReadOnlyList<Pessoa>)Pessoas.Select(Clone).ToList());
        }
    }

    public Task<Pessoa?> GetByIdAsync(int id)
    {
        lock (LockObj)
        {
            var pessoa = Pessoas.FirstOrDefault(p => p.Id == id);
            return Task.FromResult(pessoa is null ? null : Clone(pessoa));
        }
    }

    public Task<Pessoa> CreateAsync(Pessoa pessoa)
    {
        lock (LockObj)
        {
            var created = Clone(pessoa);
            created.Id = _nextId++;
            Pessoas.Add(created);
            return Task.FromResult(Clone(created));
        }
    }

    public Task<bool> UpdateAsync(Pessoa pessoa)
    {
        lock (LockObj)
        {
            var index = Pessoas.FindIndex(p => p.Id == pessoa.Id);
            if (index < 0)
            {
                return Task.FromResult(false);
            }

            Pessoas[index] = Clone(pessoa);
            return Task.FromResult(true);
        }
    }

    public Task<bool> DeleteAsync(int id)
    {
        lock (LockObj)
        {
            var index = Pessoas.FindIndex(p => p.Id == id);
            if (index < 0)
            {
                return Task.FromResult(false);
            }

            Pessoas.RemoveAt(index);
            return Task.FromResult(true);
        }
    }

    private static Pessoa Clone(Pessoa pessoa)
    {
        return new Pessoa
        {
            Id = pessoa.Id,
            NomeCompleto = pessoa.NomeCompleto,
            CpfCnpj = pessoa.CpfCnpj,
            Telefone = pessoa.Telefone,
            Email = pessoa.Email
        };
    }
}
