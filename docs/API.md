# 📡 Documentação da API - Portal Casa & Terra

Esta documentação descreve a API REST do Portal Casa & Terra (quando implementada).

## 🔗 Base URL

- **Desenvolvimento**: `http://localhost:5000/api`
- **Produção**: `https://api.casaterra.com/api`

## 🔐 Autenticação

A API utiliza JWT (JSON Web Tokens) para autenticação.

### Headers Obrigatórios

```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

## 📋 Endpoints

### 🔑 Autenticação

#### POST /auth/login
Autentica usuário via Active Directory.

**Request:**
```json
{
  "email": "usuario@casaterra.com",
  "password": "senha123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123",
    "name": "João Silva",
    "email": "joao@casaterra.com",
    "department": "Financeiro",
    "permissions": ["financeiro", "administrativo"]
  },
  "expiresAt": "2025-01-30T18:00:00Z"
}
```

**Response (401):**
```json
{
  "message": "Credenciais inválidas"
}
```

#### GET /auth/validate
Valida token JWT atual.

**Headers:**
```http
Authorization: Bearer <jwt_token>
```

**Response (200):**
```json
{
  "id": "123",
  "name": "João Silva",
  "email": "joao@casaterra.com",
  "department": "Financeiro",
  "permissions": ["financeiro", "administrativo"]
}
```

#### POST /auth/logout
Faz logout do usuário.

**Response (200):**
```json
{
  "message": "Logout realizado com sucesso"
}
```

### 🏢 Departamentos

#### GET /departments
Retorna departamentos disponíveis para o usuário.

**Response (200):**
```json
[
  {
    "id": "financeiro",
    "name": "Financeiro",
    "description": "Gestão financeira e contábil",
    "icon": "DollarSign",
    "color": "green",
    "hasAccess": true,
    "applications": [
      {
        "id": "sap",
        "name": "SAP",
        "description": "Sistema integrado de gestão",
        "url": "https://sap.casaterra.com",
        "icon": "Database",
        "category": "ERP"
      }
    ],
    "reports": [
      {
        "id": "balancete",
        "name": "Balancete Mensal",
        "description": "Relatório financeiro mensal",
        "url": "/reports/balancete",
        "type": "pdf"
      }
    ]
  }
]
```

#### GET /departments/{id}
Retorna detalhes de um departamento específico.

**Response (200):**
```json
{
  "id": "financeiro",
  "name": "Financeiro",
  "description": "Gestão financeira e contábil",
  "icon": "DollarSign",
  "color": "green",
  "hasAccess": true,
  "applications": [...],
  "reports": [...]
}
```

**Response (404):**
```json
{
  "message": "Departamento não encontrado ou sem permissão de acesso"
}
```

#### GET /departments/{id}/applications
Retorna aplicações de um departamento.

**Response (200):**
```json
[
  {
    "id": "sap",
    "name": "SAP",
    "description": "Sistema integrado de gestão",
    "url": "https://sap.casaterra.com",
    "icon": "Database",
    "category": "ERP",
    "isActive": true,
    "lastUpdated": "2025-01-30T10:00:00Z"
  }
]
```

#### GET /departments/{id}/reports
Retorna relatórios de um departamento.

**Response (200):**
```json
[
  {
    "id": "balancete",
    "name": "Balancete Mensal",
    "description": "Relatório financeiro mensal",
    "url": "/reports/balancete",
    "type": "pdf",
    "isActive": true,
    "lastGenerated": "2025-01-30T08:00:00Z"
  }
]
```

#### GET /departments/search?searchTerm={term}
Busca departamentos por termo.

**Query Parameters:**
- `searchTerm` (string): Termo de busca

**Response (200):**
```json
[
  {
    "id": "financeiro",
    "name": "Financeiro",
    "description": "Gestão financeira e contábil",
    "hasAccess": true
  }
]
```

### 👥 Usuários (Admin)

#### GET /users
Lista todos os usuários (apenas admins).

**Response (200):**
```json
[
  {
    "id": "123",
    "name": "João Silva",
    "email": "joao@casaterra.com",
    "department": "Financeiro",
    "isActive": true,
    "lastLogin": "2025-01-30T09:00:00Z"
  }
]
```

#### GET /users/{id}
Retorna detalhes de um usuário.

**Response (200):**
```json
{
  "id": "123",
  "name": "João Silva",
  "email": "joao@casaterra.com",
  "department": "Financeiro",
  "permissions": ["financeiro", "administrativo"],
  "isActive": true,
  "lastLogin": "2025-01-30T09:00:00Z"
}
```

## 🚨 Códigos de Status

| Código | Descrição |
|--------|-----------|
| 200 | Sucesso |
| 201 | Criado |
| 400 | Requisição inválida |
| 401 | Não autorizado |
| 403 | Proibido |
| 404 | Não encontrado |
| 500 | Erro interno do servidor |

## 📝 Modelos de Dados

### User
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  permissions: string[];
  avatar?: string;
  isActive: boolean;
  lastLogin: Date;
}
```

### Department
```typescript
interface Department {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  hasAccess: boolean;
  applications: Application[];
  reports: Report[];
}
```

### Application
```typescript
interface Application {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: string;
  category: string;
  isActive: boolean;
  lastUpdated: Date;
}
```

### Report
```typescript
interface Report {
  id: string;
  name: string;
  description: string;
  url: string;
  type: 'dashboard' | 'pdf' | 'excel';
  isActive: boolean;
  lastGenerated: Date;
}
```

## 🔍 Filtros e Paginação

### Query Parameters Comuns

- `page` (number): Número da página (padrão: 1)
- `limit` (number): Itens por página (padrão: 20, máximo: 100)
- `sort` (string): Campo para ordenação
- `order` (string): Direção da ordenação ('asc' ou 'desc')
- `search` (string): Termo de busca

### Exemplo
```http
GET /departments?page=1&limit=10&sort=name&order=asc&search=financeiro
```

### Response com Paginação
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 21,
    "pages": 3,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## 🛡️ Segurança

### Rate Limiting
- 100 requisições por minuto por IP
- 1000 requisições por hora por usuário autenticado

### CORS
Origens permitidas:
- `http://localhost:5173` (desenvolvimento)
- `https://portal.casaterra.com` (produção)

### Headers de Segurança
```http
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000
```

## 🧪 Exemplos de Uso

### JavaScript/TypeScript
```typescript
// Login
const login = async (email: string, password: string) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  
  if (response.ok) {
    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data.user;
  }
  
  throw new Error('Login failed');
};

// Buscar departamentos
const getDepartments = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch('/api/departments', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  
  return response.json();
};
```

### cURL
```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@casaterra.com","password":"123456"}'

# Buscar departamentos
curl -X GET http://localhost:5000/api/departments \
  -H "Authorization: Bearer <jwt_token>" \
  -H "Content-Type: application/json"
```

## 📊 Monitoramento

### Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "Healthy",
  "timestamp": "2025-01-30T10:00:00Z",
  "version": "1.0.0",
  "services": {
    "database": "Healthy",
    "activeDirectory": "Healthy",
    "cache": "Healthy"
  }
}
```

## 🐛 Tratamento de Erros

### Formato Padrão de Erro
```json
{
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Credenciais inválidas",
    "details": "Email ou senha incorretos",
    "timestamp": "2025-01-30T10:00:00Z",
    "path": "/api/auth/login"
  }
}
```

### Códigos de Erro Comuns
- `INVALID_CREDENTIALS`: Credenciais inválidas
- `TOKEN_EXPIRED`: Token expirado
- `INSUFFICIENT_PERMISSIONS`: Permissões insuficientes
- `RESOURCE_NOT_FOUND`: Recurso não encontrado
- `VALIDATION_ERROR`: Erro de validação
- `INTERNAL_ERROR`: Erro interno do servidor

## 📚 Recursos Adicionais

- **Swagger UI**: `/swagger` (quando implementado)
- **Postman Collection**: [Download](./postman/casa-terra-portal.json)
- **OpenAPI Spec**: [Download](./openapi/api-spec.yaml)

---

**Última atualização**: Janeiro 2025
**Versão da API**: 1.0.0