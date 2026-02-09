using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using RealEstate.Application.Interfaces;
using RealEstate.Domain.Interfaces;

namespace RealEstate.Infrastructure.Services
{
    public class FileService : IFileService
    {
        private readonly IWebHostEnvironment _env;

        public FileService(IWebHostEnvironment env)
        {
            _env = env;
        }

       
      
        public async Task<string> SaveFileAsync(IFormFile file, string folderName)
        {
            // 1. Get the path to wwwroot/uploads/properties
            // Note: Ensure your API project has a 'wwwroot' folder created
            var wwwrootPath = _env.WebRootPath;
            if (string.IsNullOrEmpty(wwwrootPath))
            {
                // Fallback for some environments where WebRootPath might be null
                wwwrootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            }

            var uploadDir = Path.Combine(wwwrootPath, "uploads", folderName);

            if (!Directory.Exists(uploadDir))
                Directory.CreateDirectory(uploadDir);

            // 2. Create a unique file name to avoid overwriting
            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            var filePath = Path.Combine(uploadDir, fileName);

            // 3. Save the file to physical storage
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // 4. Return the relative path for the database 'Url' property
            return $"/uploads/{folderName}/{fileName}";
        }

        public void DeleteFile(string fileName)
        {
            // Implementation for deleting files if needed
        }

    }
}