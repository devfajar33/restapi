using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTO.Transactions;
using api.Interface;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/transaction")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionRepository _transactionRepo;
        public TransactionController(ITransactionRepository transactionRepo)
        {
            _transactionRepo = transactionRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var transactions = await _transactionRepo.GetAllAsync();
            var transactionDTO_ = transactions.Select(s => s.ToTransactionDTO());

            return Ok(transactionDTO_);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateTransactionRequestDTO transactionDTO)
        {
            var transModel = transactionDTO.ToTransactionFromCreateDTO();
            await _transactionRepo.CreateAsync(transModel);
            return NoContent();
        }
    }
}