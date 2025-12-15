# .NET Standards

- Target .NET Core 10
- Use async/await for all I/O
- Prefer records for immutable models
- Follow Microsoft naming conventions
- Avoid blocking calls (Task.Result, .Wait)

# Security & Compliance

- Follow OWASP Top 10 best practices for all web-facing code.
- Validate and sanitize all user input; never trust client-provided data.
- Prevent SQL injection by using parameterized queries or Entity Framework Core; never concatenate SQL strings.
- Do not use Html.Raw or render untrusted content without proper encoding.
- Enforce authorization and ownership checks on all Razor Pages and handlers.
- Use [Authorize] attributes and role-based access where applicable.
- Protect all state-changing requests with antiforgery validation.
- Never log secrets, credentials, tokens, or PII.
- Do not hardcode secrets; use environment variables or secure configuration providers.
- Use IHttpClientFactory for outbound HTTP calls; avoid creating HttpClient directly.
- Prefer secure defaults for cookies (HttpOnly, Secure, SameSite).
- Fail securely and avoid exposing internal error details in production.
- Ensure new features include appropriate unit tests for security-sensitive logic.


# Testing

- Use xUnit
- Mock external dependencies
- Cover edge cases
- Follow Arrange-Act-Assert