using NxHealth.Api.Dtos;

namespace NxHealth.Api.Services;

public interface IPessoaService
{
    Task<IReadOnlyList<PessoaResponse>> GetAllAsync();
    Task<PessoaResponse?> GetByIdAsync(int id);
    Task<PessoaResponse> CreateAsync(PessoaRequest request);
    Task<bool> UpdateAsync(int id, PessoaRequest request);
    Task<bool> DeleteAsync(int id);
}
