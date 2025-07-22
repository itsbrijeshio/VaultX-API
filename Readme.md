# 🔐 VaultX – Secure Vault for Tokens and Secrets

**VaultX** is a secure, developer-friendly backend service for storing, managing, and retrieving API keys, secrets. Built with Node.js, Express, and MongoDB, VaultX ensures safety and easy access to your sensitive data.

---

## 🚀 Features

- 🔐 User Authentication (JWT-based)
- 🧠 Create, update, delete **Vaults**
- 🔑 Inside vaults, manage multiple **Secrets** (token, password, keys)
- 📤 Secure APIs with input validation

---

## 🧩 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT
- **Security**: Helmet, CORS, Rate Limiting
- **Mailing**: Nodemailer (SMTP / Ethereal for testing)
- **Deployment**: Render / Railway / Vercel (Backend)

---

## 🗂️ Project Structure
```

VaultX/
├── src/
│ ├── config/ # Environment & service configs
│ ├── controllers/ # Request logic
│ ├── routes/ # All route definitions
│ ├── models/ # Mongoose models (User, Vault, Secret)
│ ├── middlewares/ # Auth, error, etc.
│ ├── services/ # Mail, tokens, etc.
│ ├── utils/ # Helpers and validators
│ └── app.ts # Main server file
├── server.ts
├── .env
├── package.json
└── README.md


---

## 📦 API Endpoints

---

## ✅ **/api/auth/**

| Method | Endpoint      | Auth   | Body / Params / Query             | Description                            |
| ------ | ------------- | ------ | --------------------------------- | -------------------------------------- |
| POST   | `/register`   | ❌      | Body: `{ name, email, password }` | Register a new user                   |
| POST   | `/login`      | ❌      | Body: `{ email, password }`       | Log in and receive tokens             |
| GET    | `/me`         | ✅ auth | -                                 | Get current logged-in user's profile  |
| GET    | `/logout`     | ✅ auth | -                                 | Logout user and clear auth cookies    |

---

## 🔐 **/api/vaults/**

| Method | Endpoint                  | Auth   | Body / Params / Query                                 | Description                            |
| ------ | ------------------------- | ------ | ---------------------------------------------------   | -------------------------------------- |
| POST   | `/`                       | ✅ auth | Body: `{ name, description }`                        | Create a new vault                     |
| GET    | `/`                       | ✅ auth | Query: `{  q, page, limit }`                         | Get all vaults created by current user |
| GET    | `/:vaultId`               | ✅ auth | Params: `{ vaultId }`                                | Get get specific vault by vault ID     |
| POST   | `/:vaultId/secrets`       | ✅ auth | Body: `{ label, key, value }`                        | Create a new Secret                    |
| GET    | `/:vaultId/secrets`       | ✅ auth | Query: `{ q, page, limit }`                          | Get all secret inside the vault        |
| PUT    | `/:vaultId`               | ✅ auth | Params: `{ vaultId }`, Body: `{ name, description }` | Update vault details                   |
| DELETE | `/:vaultId`               | ✅ auth | Params: `{ vaultId }`                                | Delete a vault                         |

---

## 🔑 **/api/secrets/**

| Method | Endpoint           | Auth   | Body / Params / Query                           | Description                             |
| ------ | ------------------ | ------ | ----------------------------------------------- | --------------------------------------- |
| GET    | `/`                | ✅ auth | Query: `{ page, limit }`                        | Get all secrets created by current user |
| GET    | `/:secretId`       | ✅ auth | Params: `{ vaultId }`                           | Get get specific secret by secret ID  |
| PUT    | `/:secretId`       | ✅ auth | Params: `{ secretId }`, Body: `{ key, label }`  | Update key or label of a secret         |
| DELETE | `/:secretId`       | ✅ auth | Params: `{ secretId }`                          | Delete a secret                         |


---

## 🛠️ Setup & Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/itsbrijeshio/VaultX-API.git
cd VaultX-API

# 2. Install dependencies
npm install

# 3. Create a `.env.dev` file
cp .env.example .env.dev

# 4. Start the server
npm run dev
````

---

## 🧪 Coming Soon

- [ ] Role-based Access Control (RBAC)
- [ ] Multi-tenant Workspaces
- [ ] Real-time sync using Socket.IO
- [ ] Web Dashboard (React)

---

## 🧠 Author

Made with ❤️ by [@itsbrijeshio](https://github.com/itsbrijeshio)

---

## 📄 License

This project is licensed under the MIT License.
