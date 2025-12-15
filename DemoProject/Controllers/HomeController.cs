using System.Diagnostics;
using System.Security.Cryptography;
using System.Text;
using DemoProject.Models;
using Microsoft.AspNetCore.Mvc;

namespace DemoProject.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            ViewData["HashResult"] = TempData["HashResult"] as string;
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Feel([FromForm] string? text)
        {
            if (string.IsNullOrWhiteSpace(text))
            {
                TempData["HashResult"] = "Please enter how you feel.";
                return RedirectToAction(nameof(Index));
            }

            var hash = SHA256.HashData(Encoding.UTF8.GetBytes(text.Trim()));
            var hex = Convert.ToHexString(hash);

            TempData["HashResult"] = $"SHA-256: {hex}";
            return RedirectToAction(nameof(Index));
        }
    }
}
