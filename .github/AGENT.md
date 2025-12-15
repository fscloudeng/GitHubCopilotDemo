# Copilot Coding Agent Instructions - DemoProject

## Project Overview
This is an ASP.NET Core 10 MVC application demonstrating temperature conversion and sentiment hashing features. The agent should follow all standards defined in [.github/copilot-instructions.md](.github/copilot-instructions.md).

---

## Feature Implementation Guidelines

### Temperature Conversion Feature
**Objective:** Add a temperature converter to the home page that converts between Celsius and Fahrenheit.

**Requirements:**
- Create a view model `TemperatureConversionModel` as a record with `CelsiusInput`, `FahrenheitInput`, and `ConversionResult` properties
- Implement conversion logic using formulas: $F = C \cdot \frac{9}{5} + 32$ and $C = (F - 32) \cdot \frac{5}{9}$
- Add `ConvertTemperature` action method to [DemoProject/Controllers/HomeController.cs](DemoProject/Controllers/HomeController.cs) with async support
- Validate numeric input and ensure values are within reasonable ranges (e.g., -273.15°C absolute zero minimum)
- Return clear error messages for invalid input
- Create partial view `_TemperatureConverter.cshtml` in [DemoProject/Views/Home/](DemoProject/Views/Home/)
- Render partial in [DemoProject/Views/Home/Index.cshtml](DemoProject/Views/Home/Index.cshtml)

**Security Considerations:**
- Validate all input server-side; never trust client data
- Sanitize numeric inputs to prevent injection attacks
- Use model validation attributes

---

### Sentiment Hashing Feature
**Objective:** Add a "How do you feel?" input that hashes user sentiment securely.

**Requirements:**
- Create a view model `SentimentHashModel` as a record with `SentimentText` and `HashResult` properties
- Implement async action method `HashSentiment` in [DemoProject/Controllers/HomeController.cs](DemoProject/Controllers/HomeController.cs)
- Use `System.Security.Cryptography.SHA256` for hashing (one-way transform)
- Apply antiforgery token validation for form submission
- Create partial view `_SentimentHasher.cshtml` in [DemoProject/Views/Home/](DemoProject/Views/Home/)

**Security Considerations:**
- **Never log raw user input or sentiment text**
- Only log the hash result for audit purposes
- Validate input length (e.g., max 500 characters)
- Return hashed value only; do not reveal hash algorithm details in output
- Use `[ValidateAntiForgeryToken]` on POST actions
- Encode all output to prevent XSS attacks

---

## Code Style & Standards

### .NET Requirements
- Target framework: **net10.0** (as defined in [DemoProject/DemoProject.csproj](DemoProject/DemoProject.csproj))
- Use `async/await` for all I/O operations (no `Task.Result` or `.Wait()`)
- Prefer records over classes for immutable view models
- Follow [Microsoft C# naming conventions](https://learn.microsoft.com/dotnet/csharp/fundamentals/coding-style/naming-conventions)

### View & Controller Patterns
- All views must be strongly-typed (inherit from `@model`)
- Use `asp-*` tag helpers instead of HTML helpers
- Implement POST-Redirect-GET pattern for form submissions
- Use `[HttpPost]` attribute to distinguish POST actions
- Apply `[ValidateAntiForgeryToken]` to all state-changing endpoints

### Data Validation
- Use `System.ComponentModel.DataAnnotations` attributes (`[Required]`, `[Range]`, `[StringLength]`)
- Perform server-side validation in action methods
- Return `ModelState.IsValid` check results
- Provide user-friendly error messages via `ModelState` or `TempData`

---

## Testing Requirements

### Unit Test Standards
- Use **xUnit** framework for all tests
- Create test file: `DemoProject.Tests/Controllers/HomeControllerTests.cs`
- Follow **Arrange-Act-Assert** pattern
- Mock external dependencies (e.g., loggers, external APIs)
- Test edge cases:
  - Boundary temperatures (absolute zero, extreme values)
  - Empty or null input
  - Invalid numeric formats
  - Max-length sentiment strings

### Test Example Structure
```csharp
[Fact]
public async Task ConvertTemperature_WithValidCelsius_ReturnsCorrectFahrenheit()
{
    // Arrange
    var controller = new HomeController();
    var model = new TemperatureConversionModel { CelsiusInput = 0 };

    // Act
    var result = await controller.ConvertTemperature(model);

    // Assert
    Assert.NotNull(result);
    Assert.Equal(32, model.ConversionResult);
}
```

---

## Security Checklist

- [ ] Input validation on all controller actions
- [ ] No SQL injection vectors (N/A for this demo, but apply if database added)
- [ ] No `Html.Raw()` used on user input
- [ ] `[ValidateAntiForgeryToken]` on POST endpoints
- [ ] No hardcoded secrets in code
- [ ] Use `appsettings.json` for configuration (reviewed in [DemoProject/appsettings.json](DemoProject/appsettings.json))
- [ ] No PII or raw user sentiment logged to console/file
- [ ] All outputs encoded to prevent XSS
- [ ] Error pages don't expose stack traces in production

---

## Git Workflow

- Create feature branches: `feature/temperature-converter`, `feature/sentiment-hasher`
- Reference this workspace's [.github/copilot-instructions.md](.github/copilot-instructions.md) in commit messages
- Ensure all tests pass before PR submission
- Target merge to `dev` branch (current branch is `dev`; default branch is `main`)

---

## File Locations Reference

- **Controllers:** [DemoProject/Controllers/HomeController.cs](DemoProject/Controllers/HomeController.cs)
- **Views - Home:** [DemoProject/Views/Home/](DemoProject/Views/Home/)
- **Models:** [DemoProject/Models/](DemoProject/Models/)
- **Project File:** [DemoProject/DemoProject.csproj](DemoProject/DemoProject.csproj)
- **Configuration:** [DemoProject/appsettings.json](DemoProject/appsettings.json)
- **Program Setup:** [DemoProject/Program.cs](DemoProject/Program.cs)

---

## Deployment Notes

- Application runs on `http://localhost:5214` (HTTP) and `https://localhost:7058` (HTTPS) locally
- Docker support enabled (see [DemoProject/Dockerfile](DemoProject/Dockerfile))
- HTTPS redirection enabled in non-development environments
- HSTS configured with default 30-day policy
