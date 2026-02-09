namespace NxHealth.Api.Models;

public class Pessoa
{
    public int Id { get; set; }
    public string NomeCompleto { get; set; } = string.Empty;
    public string CpfCnpj { get; set; } = string.Empty;
    public string Telefone { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
}
