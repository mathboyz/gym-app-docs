# MercadoPago

**Categoría:** Pagos · **Prioridad:** 🟡 Media

---

## Por qué importa en este proyecto

Proveedor principal de pagos en Chile. Cobros manuales desde la app, suscripciones recurrentes, y webhooks para confirmar pagos en tiempo real.

## Casos de uso

| Caso | API |
|------|-----|
| Pago único (atleta paga plan) | Preference + Checkout |
| Suscripción recurrente | Subscriptions API |
| Tokenizar tarjeta | Card Token |
| Confirmar pago en tiempo real | Webhooks |

## Pago único — Preference

```ts
const mp = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN })
const preference = new Preference(mp)

const result = await preference.create({
  body: {
    items: [{
      title: `Plan ${plan.name} - ${gym.name}`,
      quantity: 1,
      unit_price: plan.priceCLP,
      currency_id: 'CLP',
    }],
    external_reference: `membership:${membershipId}`,
    notification_url: `${API_URL}/webhooks/mercadopago`,
    back_urls: {
      success: `${APP_URL}/payment/success`,
      failure: `${APP_URL}/payment/failure`,
    },
  }
})

// Redirigir al atleta a result.init_point
```

## Webhooks — confirmar pago

```ts
@Post('/webhooks/mercadopago')
async handleWebhook(@Body() body: MPWebhookDto, @Headers() headers: Record<string, string>) {
  // 1. Verificar firma del webhook
  const isValid = verifyMPSignature(body, headers['x-signature'], headers['x-request-id'])
  if (!isValid) throw new UnauthorizedException()

  // 2. Procesar evento
  if (body.type === 'payment' && body.action === 'payment.updated') {
    const payment = await mp.payment.get({ id: body.data.id })
    if (payment.status === 'approved') {
      const membershipId = payment.external_reference.split(':')[1]
      await this.paymentService.confirmPayment(membershipId, payment.id)
    }
  }
}
```

## Suscripciones recurrentes (Preapproval)

```ts
// Crear suscripción
const subscription = await preapproval.create({
  body: {
    reason: `Plan ${plan.name}`,
    payer_email: member.email,
    auto_recurring: {
      frequency: 1,
      frequency_type: 'months',
      transaction_amount: plan.priceCLP,
      currency_id: 'CLP',
    },
    back_url: `${APP_URL}/subscription/callback`,
    external_reference: `membership:${membershipId}`,
  }
})
```

## Importante para Chile

- Usar `currency_id: 'CLP'` — sin decimales
- Khipu como alternativa para transferencias bancarias (más popular en Chile que tarjeta)
- Testear con credenciales de sandbox antes de producción
- Los webhooks llegan con delay — siempre consultar el estado actual con `payment.get`

## Recursos
- [MP Developers Chile](https://www.mercadopago.cl/developers/es)
- [MP Node SDK](https://github.com/mercadopago/sdk-nodejs)
- [Webhooks guide](https://www.mercadopago.cl/developers/es/docs/your-integrations/notifications/webhooks)
