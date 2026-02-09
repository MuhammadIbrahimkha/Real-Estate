using FluentValidation;
using Microsoft.AspNetCore.Http;
using RealEstate.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RealEstate.Application.Validators
{
    public class PropertyImageUploadDtoValidator : AbstractValidator<PropertyImageUploadDto>
    {

        public PropertyImageUploadDtoValidator()
        {
            //RuleFor(x => x.PropertyId)
            //    .NotEmpty().WithMessage("Property ID is required.");

            RuleFor(x => x.File)
            .NotNull().WithMessage("Please select an image file.")
            .Must(BeAValidImage).WithMessage("Only .jpg, .jpeg, and .png files are allowed.")
            .Must(BeWithinSizeLimit).WithMessage("Image size must be less than 5MB.");
        }

        // Helper method: Check file extension
        private bool BeAValidImage(IFormFile file)
        {
            if (file == null) return false;

            var extensions = new[] { ".jpg", ".jpeg", ".png" };
            var fileExtension = Path.GetExtension(file.FileName).ToLower();

            return extensions.Contains(fileExtension);
        }

        // Helper method: Check file size (5MB = 5 * 1024 * 1024 bytes)
        private bool BeWithinSizeLimit(IFormFile file)
        {
            if (file == null) return false;
            return file.Length <= 5 * 1024 * 1024;
        }
    }
}


