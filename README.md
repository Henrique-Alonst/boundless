# Boundless

![PHP](https://img.shields.io/badge/PHP-8.x-777BB4?logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.x-4479A1?logo=mysql&logoColor=white)
![Vanilla JS](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)

---

## Arquitetura

```
boundless/
├── api/                # Endpoints REST-like (CRUD por módulo)
├── assets/
│   ├── css/            # Estilos e tema visual de caderno vintage
│   ├── img/            # Imagens e uploads estáticos
│   └── js/             # Scripts por seção e utilitários compartilhados
├── includes/           # Conexão com banco e funções reutilizáveis
├── pages/              # Partials HTML carregadas dinamicamente
├── uploads/            # Arquivos enviados pelos usuários
└── index.php           # Ponto de entrada da aplicação

```                                                                                                                                                              
### Requisitos

- PHP 8+
- MySQL 8+
- Servidor local (XAMPP, Laragon ou similar)

