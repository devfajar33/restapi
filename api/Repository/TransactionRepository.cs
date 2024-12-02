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
    public class TransactionRepository : ITransactionRepository
    {
        private readonly ApplicationDBContext _context;
        public TransactionRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<List<Transactions>> GetAllAsync()
        {
            return await _context.Transactions.ToListAsync();
        }
        public async Task<Transactions?> GetByIdAsync(int id)
        {
            return await _context.Transactions.FindAsync(id);
        }
        public async Task<Transactions> CreateAsync(Transactions transactionModel)
        {
            var existingItem = await _context.Items.FirstOrDefaultAsync(x => x.Id == transactionModel.IdItems);
            if(existingItem == null)
            {
                return null;
            }

            existingItem.Stock = existingItem.Stock - transactionModel.Stock;
            // await _context.SaveChangesAsync();

            await _context.Transactions.AddAsync(transactionModel);
            await _context.SaveChangesAsync();
            return transactionModel;
        }
    }
}