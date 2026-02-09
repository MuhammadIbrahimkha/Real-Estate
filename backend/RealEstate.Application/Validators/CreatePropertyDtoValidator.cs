using FluentValidation;
using RealEstate.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RealEstate.Application.Validators
{
    public class CreatePropertyDtoValidator : AbstractValidator<CreatePropertyDto>
    {

        public CreatePropertyDtoValidator()
        {
            RuleFor(p => p.Title)
                .NotEmpty().WithMessage("Title is required.")
                .MinimumLength(10).WithMessage("Title must be at least 10 characters.")
                .MaximumLength(100).WithMessage("Title cannot exceed 100 characters.");

            RuleFor(p => p.Price)
            .GreaterThan(0).WithMessage("Price must be a positive number.");

            RuleFor(p => p.Description)
                .MaximumLength(500).WithMessage("Description is too long.");
        }
    }
}
