using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.DTO.Transactions;
using api.Models;

namespace api.Mappers
{
    public static class TransactionMapper
    {
        public static TransactionDTO ToTransactionDTO(this Transactions transactionModel)
        {
            return new TransactionDTO
            {
                Id = transactionModel.Id,
                IdItems = transactionModel.IdItems,
                Stock = transactionModel.Stock,
                Price = transactionModel.Price,
                TotalPrice = transactionModel.TotalPrice,
                Created_By = transactionModel.Created_By,
                Created_At = transactionModel.Created_At,
                Updated_At = transactionModel.Updated_At,
            };
        }

        public static Transactions ToTransactionFromCreateDTO(this CreateTransactionRequestDTO transactionDTO)
        {
            return new Transactions
            {
                IdItems = transactionDTO.IdItems,
                Stock = transactionDTO.Stock,
                Price = transactionDTO.Price,
                TotalPrice = transactionDTO.TotalPrice,
                Created_By = transactionDTO.Created_By,
                Created_At = transactionDTO.Created_At,
            };
        }
    }
}