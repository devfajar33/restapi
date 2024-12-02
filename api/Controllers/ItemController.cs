using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTO.Items;
using api.Interface;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/stock")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly IItemsRepository _itemRepo;
        public ItemController(IItemsRepository itemsRepo)
        {
            _itemRepo = itemsRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var items = await _itemRepo.GetAllAsync();
            var itemsDTO_ = items.Select(s => s.ToItemsDTO());

            return Ok(itemsDTO_);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var items = await _itemRepo.GetByIdAsync(id);
            if(items == null)
            {
                return NotFound();
            }
            return Ok(items.ToItemsDTO());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateItemRequestDTO itemDTO)
        {
            var itemModel = itemDTO.ToItemFromCreateDTO();
            await _itemRepo.CreateAsync(itemModel);
            return CreatedAtAction(nameof(GetById), new { id = itemModel.Id }, itemModel);
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateItemRequestDTO updateDTO)
        {
            var itemModel = await _itemRepo.UpdateAsync(id, updateDTO);
            if(itemModel == null)
            {
                return NotFound();
            }

            return Ok(itemModel.ToItemsDTO());
        }

        [HttpDelete]
        [Route("{id}")]

        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var itemModel = await _itemRepo.DeleteAsync(id);
            if(itemModel == null)
            {
                return NotFound();
            }
            
            return NoContent();
        }
    }
}