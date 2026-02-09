import { z } from "astro/zod";

// --- Payment method validation schemas ---

export const paymentValidation = {
  mbway: z.object({
    mobileNumber: z.string().min(1, "Campo obrigatório"),
  }),
  "credit-card": z.object({}),
};

export type PaymentMethod = keyof typeof paymentValidation;
export const paymentMethodKeys = Object.keys(paymentValidation) as [
  PaymentMethod,
  ...PaymentMethod[],
];

// --- Form schema ---

export const ebookBaseSchema = z.object({
  nome: z.string().min(1, "Campo obrigatório"),
  apelido: z.string().min(1, "Campo obrigatório"),
  email: z
    .string()
    .min(1, "Campo obrigatório")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email inválido"),
  nif: z.string().optional(),
  paymentMethod: z.enum(paymentMethodKeys, {
    message: "Selecione um método de pagamento",
  }),
  mobileNumber: z.string().optional(),
});

export const ebookFormSchema = ebookBaseSchema.superRefine((data, ctx) => {
  const result = paymentValidation[data.paymentMethod].safeParse(data);
  if (!result.success) {
    result.error.issues.forEach((issue) =>
      ctx.addIssue({
        code: "custom",
        message: issue.message,
        path: issue.path,
      }),
    );
  }
});

export type EbookFormValues = z.infer<typeof ebookFormSchema>;

export function formatMbwayNumber(mobileNumber: string): string {
  return mobileNumber.includes("#") ? mobileNumber : `351#${mobileNumber}`;
}

function generateOrderId() {
  return Date.now().toString();
}

const EBOOK_PRICE = "0.10";

const mbWayKey = import.meta.env.PUBLIC_MBWAY_KEY;

async function payWithMbway(input: EbookFormValues) {
  if (!mbWayKey) {
    throw new Error("MBWay key not found");
  }
  const orderId = generateOrderId();
  const result = await fetch("https://api.ifthenpay.com/spg/payment/mbway", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mbWayKey: mbWayKey,
      orderId: orderId,
      amount: EBOOK_PRICE,
      mobileNumber: formatMbwayNumber(input.mobileNumber!),
      email: input.email,
      description: input.email,
    }),
  });
  if (result.ok) {
    const response = await result.json();
    return { success: true, RequestId: response.RequestId };
  } else {
    throw new Error("Erro ao processar pagamento: " + result.statusText);
  }
}

const creditCardKey = import.meta.env.PUBLIC_CREDIT_CARD_KEY;

const PUBLIC_URL = "https://inesnevescaldas.com";

async function payWithCreditCard(input: EbookFormValues) {
  if (!creditCardKey) {
    throw new Error("Credit card key not found");
  }
  const orderId = generateOrderId();
  const result = await fetch(
    `https://api.ifthenpay.com/creditcard/init/${creditCardKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: orderId,
        amount: EBOOK_PRICE,
        successUrl: `${PUBLIC_URL}/ebook/sucess?orderId=${orderId}&email=${input.email}`,
        errorUrl: `${PUBLIC_URL}/ebook/error?orderId=${orderId}&email=${input.email}`,
        cancelUrl: `${PUBLIC_URL}/ebook/cancel?orderId=${orderId}&email=${input.email}`,
        language: "pt",
      }),
    },
  );
  if (result.ok) {
    const response = await result.json();
    return {
      success: true,
      RequestId: response.RequestId as string,
      PaymentUrl: response.PaymentUrl as string,
    };
  } else {
    throw new Error("Erro ao processar pagamento: " + result.statusText);
  }
}

export const actions = {
  buyEbook: async (input: EbookFormValues) => {
    ebookFormSchema.parse(input);
    if (input.paymentMethod === "mbway") {
      return await payWithMbway(input);
    } else if (input.paymentMethod === "credit-card") {
      return await payWithCreditCard(input);
    } else {
      throw new Error("Payment method not found");
    }
  },
} as const;
