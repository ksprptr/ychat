# YChat

> Chat application built as a school project, focusing on real-time communication and basic client–server interaction.

- [Prerequisites](#Prerequisites)
- [Dependencies](#Dependencies)
- [Installation](#Installation)
- [Configuration](#Configuration)
- [License](#License)

## Prerequisites

- Node.js 20+ ([Download](https://nodejs.org/en/download/))
- Container runtime ([Docker (recommended)](https://www.docker.com/), Colima, ...)
- IDE ([VS Code](https://code.visualstudio.com/), WebStorm, ...)
- Package manager ([pnpm (recommended)](https://pnpm.io/installation), npm, ...)

## Dependencies

- **Database** _(started automatically via `docker compose` during installation)_
  - Postgres

## Installation

1. Go to the project root: `cd ychat/`
2. Install all dependencies: `pnpm install`
3. Copy `.env.example` to `.env` in the project root (Docker infrastructure)
   and in all applications (`apps/*`), then adjust the values accordingly.
4. Start required services: `docker compose up -d`
5. **First run only:** Apply database migrations, generate Prisma client, and seed the database: `docker compose exec ychat-api npx prisma migrate deploy && docker compose exec ychat-api npx prisma db seed`
6. Start the application: `pnpm run dev --filter app`

> Note: The desktop Electron application runs locally and connects to backend services running in Docker.

## Configuration

> Application

| Description       | Values                 |
| ----------------- | ---------------------- |
| **Ports:**        | 5173                   |
| **Technologies:** | Electron-Vite          |
| **URL:**          | http://localhost:5173/ |

> Server

| Description       | Values                        |
| ----------------- | ----------------------------- |
| **Ports:**        | 4000                          |
| **Technologies:** | NestJS, Prisma                |
| **URL:**          | http://localhost:4000/        |
| **Swagger:**      | http://localhost:4000/swagger |

> Database

| Description       | Values                             |
| ----------------- | ---------------------------------- |
| **Ports:**        | 5432                               |
| **Technologies:** | Postgres                           |
| **Databases:**    | postgres                           |
| **Credentials:**  | `root:password` (development only) |

## License

> This software is developed by **Petr Kašpar** and is licensed under the MIT License.  
> For more details, please refer to the LICENSE file.
