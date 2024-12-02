using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.DTO.Items;
using api.Models;

namespace api.Interface
{
    public interface IItemsRepository
    {
        Task<List<Items>> GetAllAsync();
        Task<Items?> GetByIdAsync(int id);
        Task<Items> CreateAsync(Items itemModel);
        Task<Items?> UpdateAsync(int id, UpdateItemRequestDTO itemDTO);
        Task<Items?> DeleteAsync(int id);
    }
}