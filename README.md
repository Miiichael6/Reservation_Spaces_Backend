# usage user 

```typescript
{
    "id": 0,
    "username": "michael_canales",
    "name": "Jerry",
    "lastname": "Canales",
    "password": "michael123",
    "description": "Canales",
    "email": "Michael444@gmail.com"
}
```
¡Entendido! Vamos a describir las **tablas** y sus **relaciones** de manera teórica, sin entrar en detalles de código.

---

### **Tablas del Modelo**

1. **Tabla: Usuarios**
   - **Descripción**: Esta tabla almacena los datos de los usuarios que pueden hacer reservas en la aplicación.
   - **Campos**:
     - **ID de usuario** (clave primaria): Un identificador único para cada usuario.
     - **Nombre**: El nombre del usuario.
     - **Correo electrónico**: Dirección de correo del usuario.
     - **Teléfono**: (Opcional) Número de teléfono del usuario.
     - **Fecha de registro**: La fecha en la que el usuario se registró en la aplicación.

2. **Tabla: Slots**
   - **Descripción**: Esta tabla define los intervalos de tiempo (slots) disponibles para que los usuarios puedan hacer reservas.
   - **Campos**:
     - **ID de slot** (clave primaria): Un identificador único para cada slot.
     - **Hora de inicio**: La hora en la que comienza el slot (por ejemplo, 6:00 AM).
     - **Hora de fin**: La hora en la que finaliza el slot (por ejemplo, 7:00 AM).

3. **Tabla: Reservas**
   - **Descripción**: Esta tabla almacena las reservas hechas por los usuarios, asociando a qué usuario le pertenece cada reserva y qué slot ha reservado.
   - **Campos**:
     - **ID de reserva** (clave primaria): Un identificador único para cada reserva.
     - **ID de usuario** (clave foránea): El identificador del usuario que hizo la reserva, vinculado con la tabla **Usuarios**.
     - **ID de slot** (clave foránea): El identificador del slot que fue reservado, vinculado con la tabla **Slots**.
     - **Fecha de reserva**: La fecha en que el usuario hizo la reserva (puede ser la fecha del día de la reserva o la fecha futura).

---

### **Relaciones entre las Tablas**

1. **Usuarios ↔ Reservas**:  
   - Un usuario puede hacer múltiples reservas, pero cada reserva está asociada a un único usuario.  
   - Relación: **Uno a Muchos**. Un usuario puede tener muchas reservas, pero cada reserva pertenece a un solo usuario.

2. **Slots ↔ Reservas**:  
   - Un slot puede ser reservado por múltiples usuarios a lo largo del tiempo, pero cada reserva se refiere a un único slot en un día específico.  
   - Relación: **Uno a Muchos**. Un slot puede ser asociado a muchas reservas, pero cada reserva se refiere a un solo slot.

3. **Restricción de reserva**:  
   - Un usuario solo puede hacer hasta 3 reservas por día. Esta es una restricción lógica que se impone a nivel de la aplicación o sistema, no en la estructura de las tablas, pero es importante tenerla en cuenta para evitar que un usuario haga más de 3 reservas.

---

### **Diagrama Conceptual**

1. **Usuarios**
   - Un usuario tiene varias **reservas**.
   - Cada **reserva** tiene un único **slot** asociado.

2. **Slots**
   - Un slot puede ser reservado por múltiples usuarios (en diferentes días o en la misma fecha).
   - Un **slot** tiene muchas **reservas**.

3. **Reservas**
   - Cada reserva está vinculada a un **usuario** y a un **slot** específico.
   - Las reservas están limitadas a un máximo de 3 por día por usuario.

---

### **Resumen de las Tablas y Relaciones**

| **Usuarios**          | **Reservas**            | **Slots**              |
|-----------------------|-------------------------|------------------------|
| ID de usuario (PK)    | ID de reserva (PK)      | ID de slot (PK)        |
| Nombre                | ID de usuario (FK)      | Hora de inicio         |
| Correo electrónico    | ID de slot (FK)         | Hora de fin            |
| Teléfono (opcional)   | Fecha de reserva        |                        |
| Fecha de registro     |                         |                        |

---

**Relaciones**:
- **Usuarios → Reservas**: Un usuario puede tener muchas reservas.
- **Reservas → Slots**: Cada reserva está asociada a un solo slot.
- **Restricción de reserva**: Un usuario solo puede tener un máximo de 3 reservas por día.

Este modelo conceptual cubre los aspectos principales de tu aplicación de reservas para el gimnasio. ¡Todo listo para implementarlo!