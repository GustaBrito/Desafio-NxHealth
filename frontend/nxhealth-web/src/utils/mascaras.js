export function aplicarMascaraCpfCnpj(valor) {
  const digits = (valor || "").replace(/\D/g, "");
  if (digits.length <= 11) {
    const part1 = digits.slice(0, 3);
    const part2 = digits.slice(3, 6);
    const part3 = digits.slice(6, 9);
    const part4 = digits.slice(9, 11);
    let result = part1;
    if (part2) result += `.${part2}`;
    if (part3) result += `.${part3}`;
    if (part4) result += `-${part4}`;
    return result;
  }

  const part1 = digits.slice(0, 2);
  const part2 = digits.slice(2, 5);
  const part3 = digits.slice(5, 8);
  const part4 = digits.slice(8, 12);
  const part5 = digits.slice(12, 14);
  let result = part1;
  if (part2) result += `.${part2}`;
  if (part3) result += `.${part3}`;
  if (part4) result += `/${part4}`;
  if (part5) result += `-${part5}`;
  return result;
}

export function aplicarMascaraTelefone(valor) {
  const digits = (valor || "").replace(/\D/g, "");
  const ddd = digits.slice(0, 2);
  const parte1 = digits.length > 10 ? digits.slice(2, 7) : digits.slice(2, 6);
  const parte2 = digits.length > 10 ? digits.slice(7, 11) : digits.slice(6, 10);
  let result = ddd;
  if (ddd) result = `(${ddd})`;
  if (parte1) result += ` ${parte1}`;
  if (parte2) result += `-${parte2}`;
  return result.trim();
}
