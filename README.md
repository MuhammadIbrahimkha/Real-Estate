# 🏠 RealEstate API - Professional Portfolio Project

A robust, production-grade **ASP.NET Core Web API** built with **Clean Architecture** principles. This project serves as a comprehensive backend for a real estate marketplace, featuring secure user authentication, property management, and advanced search capabilities.

---

## 🚀 Key Features

* **Secure Authentication:** Integrated **Microsoft Identity** with **JWT (JSON Web Tokens)** for stateless, secure user sessions.
* **Resource-Based Authorization:** Custom logic ensuring only the property owner can edit or delete their listings.
* **Advanced Search & Pagination:** High-performance filtering (Price, Location, Title) with server-side pagination to handle large datasets.
* **Image Management:** Custom `FileService` for handling physical image uploads with size and extension validation.
* **Validation:** Strict data integrity using **FluentValidation** for all DTOs.
* **Logging & Monitoring:** Structured logging to daily files using **Serilog**.
* **Global Error Handling:** Custom middleware to provide consistent, secure JSON error responses.

---

## 🏗️ Technical Stack

* **Framework:** .NET 8 / ASP.NET Core Web API
* **Architecture:** Clean Architecture (Domain, Application, Infrastructure, API)
* **Database:** SQL Server
* **ORM:** Entity Framework Core (Code-First)
* **Mapping:** AutoMapper
* **Validation:** FluentValidation
* **Logging:** Serilog (File Sink)

---

## 📂 Project Structure



* **RealEstate.Api:** Controllers, Middleware, and API Configurations.
* **RealEstate.Application:** Application logic, Interfaces, DTOs, Mapping, and Validators.
* **RealEstate.Domain:** Core Entities, Base Entities, and Repository Interfaces.
* **RealEstate.Infrastructure:** Data Access, DB Context, Migrations, and Repository Implementations.

---

## 🛠️ Getting Started

### Prerequisites
* .NET 8 SDK
* SQL Server (LocalDB or Express)

### Installation
1. **Clone the repository:**
   ```bash
git clone https://github.com/MuhammadIbrahimkha/Real-Estate.git
