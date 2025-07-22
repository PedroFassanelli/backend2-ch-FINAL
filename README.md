# 🛒 Ecommerce Backend - Proyecto Final

Este es un servidor backend para un ecommerce desarrollado como entrega final del curso de Backend de Coderhouse. El objetivo fue mejorar la arquitectura del servidor aplicando patrones de diseño, manejo de roles, autorización y una lógica de compra robusta.

---

## 🧱 Tecnologías utilizadas

- **Node.js**
- **Express**
- **MongoDB + Mongoose**
- **JWT para autenticación**
- **Nodemailer**
- **dotenv**
- **bcrypt**
- **uuid**
- **Handlebars**
- **Mongoose Paginate**

---

## 🧑‍💻 Rutas principales

### Usuarios

- `POST /api/users` – Crear usuario
- `GET /api/users` – Obtener todos los usuarios (**solo admin**)
- `GET /api/users/:uid` – Obtener usuario por ID (**solo admin**)
- `PUT /api/users/:uid` – Editar usuario (**solo admin**)
- `DELETE /api/users/:uid` – Eliminar usuario (**solo admin**)

---

### 🔐 Auth
- `POST /api/sessions/register` – Registro de usuario
- `POST /api/sessions/login` – Login de usuario
- `GET /api/sessions/current` – Obtener info del usuario logueado (protección por JWT)

### 🔁 Recuperación de contraseña
- `POST /api/sessions/forgot-password` – Enviar correo con enlace para recuperar contraseña
- `POST /api/sessions/restore-password` – Establecer nueva contraseña (válido 1 hora)

---

### 🛍️ Productos

- `GET /api/products` – Listar productos (con paginación, orden y filtros)
- `GET /api/products/:id` – Obtener producto por ID
- `POST /api/products` – Crear producto (**solo admin**)
- `PUT /api/products/:id` – Actualizar producto (**solo admin**)
- `DELETE /api/products/:id` – Eliminar producto (**solo admin**)

---

### 🛒 Carrito

- `GET /api/carts/:cid` – Obtener carrito por ID
- `POST /api/carts` – Crear carrito
- `POST /api/carts/:cid/product/:pid` – Agregar producto al carrito (**solo dueño del carrito**)
- `DELETE /api/carts/:cid/product/:pid` – Eliminar producto del carrito (**solo dueño del carrito**)
- `PUT /api/carts/:cid` – Reemplazar todos los productos (**solo dueño del carrito**)
- `PUT /api/carts/:cid/product/:pid` – Actualizar cantidad (**solo dueño del carrito**)
- `DELETE /api/carts/:cid` – Vaciar carrito (**solo dueño del carrito**)
- `POST /api/carts/:cid/purchase` – Finalizar compra y generar **ticket** 

---

## 🛡️ Roles y Autorizaciones

Se implementaron **roles de usuario** para limitar el acceso:

| Rol        | Acciones habilitadas                |
|------------|-------------------------------------|
| `user`     | Comprar productos, gestionar carrito |
| `admin`    | Gestionar productos, ver usuarios    |

Middleware:
- Autorización por rol: `authorizeRoles('admin')`, `authorizeRoles('user')`
- Verificar dueño de carrito: `isCartOwner`

---

## 🧠 Arquitectura aplicada

- **DAO (Data Access Object)**: Acceso desacoplado a la persistencia
- **Repository Pattern**: Lógica intermedia entre servicios y DAOs
- **Service Layer**: Contiene la lógica de negocio
- **Controller Layer**: Recibe las peticiones HTTP
- **DTO (Data Transfer Object)**: Formato seguro de datos para rutas como `/current`

---

## 💌 Recuperación de contraseña

- Se envía un **correo con enlace único** (válido por 1 hora).
- No se permite restablecer la contraseña con la misma que la anterior.

---

## ✅ Lógica de compra

1. El usuario realiza un `POST` a `/api/carts/:cid/purchase`.
2. Se verifica el stock de cada producto.
3. Se descuentan cantidades disponibles y se devuelve el resto.
4. Se genera un **ticket de compra** con:
   - Código UUID
   - Fecha
   - Monto total
   - Email del comprador
   - Lista de productos comprados

## ⚙️ Configuración del entorno

Crear un archivo `.env` con el siguiente contenido:

```env
PORT=8080
MONGO_URL=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/ecommerce?retryWrites=true&w=majority
JWT_SECRET=clave_secreta
MAIL_USER=correo
MAIL_PASS=password
