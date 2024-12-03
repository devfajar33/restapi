using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.DTO.Transactions;
using api.Models;

namespace api.Interface
{
    public interface ITransactionRepository
    {
        Task<List<Transactions>> GetAllAsync();
        Task<Transactions?> GetByIdAsync(int id);
        Task<Transactions> CreateAsync(Transactions transactionModel);
        Task<List<ViewTransactionDTO>> GetJoinAsync();
    }
}