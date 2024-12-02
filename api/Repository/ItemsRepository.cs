using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTO.Items;
using api.Interface;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class ItemsRepository : IItemsRepository
    {
        private readonly ApplicationDBContext _context;
        public ItemsRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<List<Items>> GetAllAsync()
        {
            return await _context.Items.ToListAsync();
        }
        public async Task<Items?> GetByIdAsync(int id)
        {
            return await _context.Items.FindAsync(id);
        }
        public async Task<Items> CreateAsync(Items itemModel)
        {
            await _context.Items.AddAsync(itemModel);
            await _context.SaveChangesAsync();
            return itemModel;
        }
        public async Task<Items?> UpdateAsync(int id, UpdateItemRequestDTO itemDTO)
        {
            var existingItem = await _context.Items.FirstOrDefaultAsync(x => x.Id == id);
            if(existingItem == null)
            {
                return null;
            }

            existingItem.Name = itemDTO.Name;
            existingItem.Stock = itemDTO.Stock;
            existingItem.Price = itemDTO.Price;
            existingItem.Image = itemDTO.Image;
            existingItem.Created_By = itemDTO.Created_By;
            existingItem.Updated_At = itemDTO.Updated_At;

            await _context.SaveChangesAsync();
            return existingItem;
        }
        public async Task<Items?> DeleteAsync(int id)
        {
            var itemModel = await _context.Items.FirstOrDefaultAsync(x => x.Id == id);
            if(itemModel == null) 
            {
                return null;
            }
            _context.Items.Remove(itemModel);
            await _context.SaveChangesAsync();
            return itemModel;
        }
    }
}