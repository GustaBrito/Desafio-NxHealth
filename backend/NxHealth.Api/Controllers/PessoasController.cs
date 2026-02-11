using NxHealth.Api.Dtos;
using NxHealth.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace NxHealth.Api.Controllers;

[ApiController]
[Route("api/pessoas")]
public class PessoasController : ControllerBase
{
    private readonly IPessoaService _service;

    public PessoasController(IPessoaService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<PessoaResponse>>> GetAll()
    {
        var pessoas = await _service.GetAllAsync();
        return Ok(pessoas);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<PessoaResponse>> GetById(int id)
    {
        var pessoa = await _service.GetByIdAsync(id);
        if (pessoa is null)
        {
            return NotFound();
        }

        return Ok(pessoa);
    }

    [HttpPost]
    public async Task<ActionResult<PessoaResponse>> Create([FromBody] PessoaRequest request)
    {
        if (!ModelState.IsValid)
        {
            return ValidationProblem(ModelState);
        }

        try
        {
            var created = await _service.CreateAsync(request);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }
        catch (CpfCnpjDuplicadoException ex)
        {
            return Conflict(new { message = ex.Message });
        }
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] PessoaRequest request)
    {
        if (!ModelState.IsValid)
        {
            return ValidationProblem(ModelState);
        }

        try
        {
            var updated = await _service.UpdateAsync(id, request);
            if (!updated)
            {
                return NotFound();
            }

            return NoContent();
        }
        catch (CpfCnpjDuplicadoException ex)
        {
            return Conflict(new { message = ex.Message });
        }
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _service.DeleteAsync(id);
        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}
