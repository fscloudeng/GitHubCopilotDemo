# GitHub Copilot Demo (ASP.NET Core MVC / Razor)

This repository is intentionally small and demo-focused. The goal is to showcase how GitHub Copilot can assist across the full development lifecycle (from ideation to CI fixes and PR review) using a simple ASP.NET Core MVC app.

The web app lives under [DemoProject/](DemoProject/) and is wired up via [`DemoProject.Program`](DemoProject/Program.cs) and [`DemoProject.Controllers.HomeController`](DemoProject/Controllers/HomeController.cs).

---

## What this demo is meant to show

Planned Copilot demonstration topics:

1. **Copilot Chat & Inline Completion**
2. **Issue-Driven Development with Copilot Agent**
3. **Autonomous PR Creation**
4. **Copilot as PR Reviewer**
5. **Security & Compliance Checks**
6. **Repo-Wide Reasoning & Architecture Awareness**

---

## App features (planned on the default page)

The default landing page is [DemoProject/Views/Home/Index.cshtml](DemoProject/Views/Home/Index.cshtml) (served by [`DemoProject.Controllers.HomeController.Index`](DemoProject/Controllers/HomeController.cs)).

Planned features to add there:

### 1) Temperature conversion
- Convert between **Celsius** and **Fahrenheit**.
- Basic validation (numeric input, reasonable range, clear errors).
- Formula reference:
  - $F = C \cdot \frac{9}{5} + 32$
  - $C = (F - 32) \cdot \frac{5}{9}$

### 2) “How do you feel?” text input + hashing
- A textbox where the user can type how they feel.
- The server will compute a hash using a strong hashing approach.
  - For demo purposes, this can be shown as a one-way transform; the app should **not** log raw user input.


Security expectations are aligned with [.github/instructions/security.instructions.md](.github/instructions/security.instructions.md) (validate input, avoid logging PII).

---

## How to run

### Prerequisites
- .NET SDK matching the project target framework in [DemoProject/DemoProject.csproj](DemoProject/DemoProject.csproj) (currently `net10.0`).

### Run locally (CLI)
From the repository root:

````sh
cd DemoProject
dotnet restore
dotnet run