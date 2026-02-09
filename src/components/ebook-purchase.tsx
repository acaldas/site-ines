import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type Control } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import mbwayLogo from "@/assets/logo-mbway.svg";
import creditCardLogo from "@/assets/logo-credit-card.png";
import { useState, useCallback } from "react";
import {
  ebookFormSchema,
  actions,
  type EbookFormValues,
  type PaymentMethod,
} from "@/lib/ebook";

// --- Payment method field components ---

type PaymentFieldsProps = {
  control: Control<EbookFormValues>;
};

function MbWayFields({ control }: PaymentFieldsProps) {
  return (
    <Controller
      name="mobileNumber"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid || undefined}>
          <FieldLabel htmlFor="mobileNumber">
            Telemóvel <span className="text-red">*</span>
          </FieldLabel>
          <Input
            {...field}
            id="mobileNumber"
            type="tel"
            placeholder="912 345 678"
            className="bg-bg"
            maxLength={9}
            value={field.value ?? ""}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

function CreditCardFields(_props: PaymentFieldsProps) {
  return null;
}

const paymentFieldComponents: Record<
  PaymentMethod,
  React.FC<PaymentFieldsProps>
> = {
  mbway: MbWayFields,
  "credit-card": CreditCardFields,
};

// --- Main component ---

export default function EbookPurchase() {
  const [showForm, setShowForm] = useState(false);

  const form = useForm<EbookFormValues>({
    resolver: zodResolver(ebookFormSchema),
    defaultValues: {
      nome: "",
      apelido: "",
      email: "",
      nif: "",
    },
  });

  const selectedMethod = form.watch("paymentMethod");
  const PaymentFields = selectedMethod
    ? paymentFieldComponents[selectedMethod]
    : null;

  const onSubmit = useCallback(async (data: EbookFormValues) => {
    const result = await actions.buyEbook(data);
    if ("PaymentUrl" in result) {
      window.location.href = result.PaymentUrl as string;
    }
  }, []);

  if (!showForm) {
    return (
      <div className="text-lg">
        <p className="mb-5">
          Este <em>ebook</em> surgiu da necessidade de colmatar uma lacuna que
          identifiquei na área das Perturbações do Comportamento Alimentar: a
          escassez de literatura em português que apresente informação clara e
          fundamentada. Ao longo da minha prática, percebi que tanto
          profissionais de saúde como familiares e as próprias pessoas com estas
          perturbações procuravam compreendê-las melhor.
        </p>
        <p className="mb-5">
          Este guia desmistifica as Perturbações do Comportamento Alimentar e
          explora sinais e sintomas, mitos, tratamentos, riscos físicos e
          psicológicos. O <em>ebook</em> inclui ainda conselhos práticos sobre o
          pedido de ajuda, para o próprio leitor ou para uma pessoa próxima.
        </p>
        <p className="mb-8">
          O ponto de partida para qualquer pessoa (profissional de saúde, ou
          não) que pretende, em linguagem acessível, aprender mais sobre o mundo
          das Perturbações do Comportamento Alimentar.
        </p>
        <div className="bg-bgDark rounded-lg p-5 text-center">
          <p className="text-sm text-text/70">Investimento</p>
          <p className="text-3xl font-bold text-red mb-4">22,50€</p>
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="inline-block bg-red text-white px-8 py-3 rounded-xl font-medium shadow-lg shadow-red/50 hover:bg-red/90 hover:shadow-red/40 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Comprar eBook
          </button>
        </div>
        <p className="text-xs text-text/90 pt-5 text-center italic px-2">
          *Este e-book tem fins exclusivamente informativos e educativos, não
          devendo ser utilizado como instrumento de autodiagnóstico ou de
          tratamento autónomo.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-bgDark rounded-lg p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text">Dados de compra</h3>
        <Button
          variant="link"
          onClick={() => {
            setShowForm(false);
            form.reset();
          }}
          className="text-text/60 hover:text-text text-sm"
        >
          Voltar
        </Button>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="nome"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid || undefined}>
                  <FieldLabel htmlFor="nome">
                    Nome <span className="text-red">*</span>
                  </FieldLabel>
                  <Input {...field} id="nome" className="bg-bg" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="apelido"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid || undefined}>
                  <FieldLabel htmlFor="apelido">
                    Apelido <span className="text-red">*</span>
                  </FieldLabel>
                  <Input {...field} id="apelido" className="bg-bg" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid || undefined}>
                <FieldLabel htmlFor="email">
                  Email <span className="text-red">*</span>
                </FieldLabel>
                <Input {...field} id="email" type="email" className="bg-bg" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="nif"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor="nif">
                  NIF{" "}
                  <span className="text-text/50 text-xs font-normal">
                    (opcional)
                  </span>
                </FieldLabel>
                <Input {...field} id="nif" className="bg-bg" />
              </Field>
            )}
          />
          <Controller
            name="paymentMethod"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid || undefined}>
                <FieldLabel>
                  Método de pagamento <span className="text-red">*</span>
                </FieldLabel>
                <ToggleGroup
                  type="single"
                  value={field.value ?? ""}
                  onValueChange={(value) => {
                    if (value) field.onChange(value);
                  }}
                  className="flex flex-col xs:flex-row gap-3"
                >
                  <ToggleGroupItem
                    value="mbway"
                    aria-label="MB WAY"
                    className="w-full xs:flex-1 rounded-lg border-2 border-text/20 bg-bg px-3 py-4 xs:py-6 text-xs font-medium text-text/70 hover:border-text/40 data-[state=on]:border-red data-[state=on]:bg-red/10 data-[state=on]:text-red"
                  >
                    <img src={mbwayLogo.src} alt="MB WAY" className="h-7" />
                    MB WAY
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="credit-card"
                    aria-label="Cartão de Crédito"
                    className="w-full xs:flex-1 rounded-lg border-2 border-text/20 bg-bg px-2 py-4 xs:py-6 text-xs font-medium text-text/70 hover:border-text/40 data-[state=on]:border-red data-[state=on]:bg-red/10 data-[state=on]:text-red"
                  >
                    <img
                      src={creditCardLogo.src}
                      alt="Cartão de Crédito"
                      className="h-5"
                    />
                    Cartão de Crédito
                  </ToggleGroupItem>
                </ToggleGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {PaymentFields && <PaymentFields control={form.control} />}
          <div className="flex items-center justify-end gap-2 pt-2">
            <span className="text text-text font-bold">Total:</span>
            <span className="text-xl font-bold text-red">22,50€</span>
          </div>
          <Button
            type="submit"
            className="w-full bg-red text-white px-8 py-3 rounded-xl font-medium shadow-lg shadow-red/50 hover:bg-red/90 hover:shadow-red/40 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Comprar
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
