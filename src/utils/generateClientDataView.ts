// src/utils/generateClientDataView.ts

import { formSections, defaultFormData } from "../data/formFields";

export function generateClientDataView(
  formData: typeof defaultFormData
) {
  let output = "CADASTRO\n\n";

  formSections.forEach((section) => {
    output += `${section.title.toUpperCase()}:\n`;

    section.fields.forEach((field) => {
      // ⚠️ Accesses não é string, então ignoramos aqui
      if (field.name === "accesses") return;

      const value = formData[field.name] || "Não informado";

      output += `${field.label}: ${value}\n`;
    });

    output += "\n";
  });

  // ==========================
  // ACESSOS (tratamento especial)
  // ==========================
  output += "ACESSOS:\n";

  formData.accesses.forEach((acc, index) => {
    output += `• Canal ${index + 1}: ${acc.channel}\n`;
    output += `  Login: ${acc.login}\n`;
    output += `  Senha: ${acc.password}\n\n`;
  });

  return output;
}
