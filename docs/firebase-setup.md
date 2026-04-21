# Firebase setup

Esta version usa una sola coleccion principal:

- `reservations`

Cada documento funciona como registro de reserva + lead CRM.

Campos recomendados:
- fullName
- birthDate
- email
- phone
- product
- interest
- appointmentDate
- appointmentType
- message
- privacyAccepted
- status
- crmStage
- source
- createdAt

Estados sugeridos:
- new
- contacted
- qualified
- visit_scheduled
- won
- lost
