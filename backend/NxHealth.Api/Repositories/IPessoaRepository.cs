using NxHealth.Api.Models;

namespace NxHealth.Api.Repositories;

public interface IPessoaRepository
{
    Task<IReadOnlyList<Pessoa>> GetAllAsync();
    Task<Pessoa?> GetByIdAsync(int id);
    Task<Pessoa> CreateAsync(Pessoa pessoa);
    Task<bool> UpdateAsync(Pessoa pessoa);
    Task<bool> DeleteAsync(int id);
}
