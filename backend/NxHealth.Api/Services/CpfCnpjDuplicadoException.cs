namespace NxHealth.Api.Services;

public class CpfCnpjDuplicadoException : Exception
{
    public CpfCnpjDuplicadoException() : base("CPF/CNPJ ja cadastrado.")
    {
    }
}
