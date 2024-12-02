using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.DTO.Items;
using api.Models;

namespace api.Mappers
{
    public static class ItemMappers
    {
        public static ItemsDTO ToItemsDTO(this Items itemsModel)
        {
            return new ItemsDTO
            {
                Id = itemsModel.Id,
                Name = itemsModel.Name,
                Stock = itemsModel.Stock,
                Price = itemsModel.Price,
                Category = itemsModel.Category,
                Image = itemsModel.Image,
                Created_At = itemsModel.Created_At,
                Created_By = itemsModel.Created_By,
                Updated_At = itemsModel.Updated_At,
            };
        }

        public static Items ToItemFromCreateDTO(this CreateItemRequestDTO itemDTO)
        {
            return new Items
            {
                Name = itemDTO.Name,
                Stock = itemDTO.Stock,
                Price = itemDTO.Price,
                Category = itemDTO.Category,
                Image = itemDTO.Image,
                Created_At = itemDTO.Created_At,
                Created_By = itemDTO.Created_By,
            };
        }
    }
}