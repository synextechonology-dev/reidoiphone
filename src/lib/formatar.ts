const moeda = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

/** 4299 → "R$ 4.299" */
export const brl = (v: number): string => moeda.format(v);

/** 128 → "128 GB", 1024 → "1 TB" */
export const gbl = (g: number): string => (g >= 1024 ? `${g / 1024} TB` : `${g} GB`);
