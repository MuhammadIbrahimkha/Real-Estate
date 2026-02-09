using AutoMapper;
using RealEstate.Domain.Entities;
using RealEstate.Application.DTOs;

namespace RealEstate.Application.Mapping 
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CreatePropertyDto, Property>()
     .ForMember(dest => dest.WhatsappNumber, opt => opt.MapFrom(src => src.WhatsappNumber));



            CreateMap<Property, PropertyDto>()
    .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type.ToString()))
    .ForMember(dest => dest.ImageUrls, opt => opt.MapFrom(src => src.Images.Select(x => x.Url).ToList()))
   
    .ForMember(dest => dest.WhatsappNumber, opt => opt.MapFrom(src => src.WhatsappNumber));

            CreateMap<UpdatePropertyDto, Property>();



        }
    }
}