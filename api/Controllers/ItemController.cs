using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTO.Items;
using api.Handler;
using api.Interface;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Authorize]
    [Route("api/stock")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly IItemsRepository _itemRepo;
        private ApiResponse _apiResponse;
        public ItemController(IItemsRepository itemsRepo)
        {
            _itemRepo = itemsRepo;
            _apiResponse = new ApiResponse();
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var items = await _itemRepo.GetAllAsync();
            _apiResponse.Data = items.Select(s => s.ToItemsDTO());
            _apiResponse.Status = true;
            _apiResponse.StatusCode = System.Net.HttpStatusCode.OK;

            return Ok(_apiResponse);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var items = await _itemRepo.GetByIdAsync(id);
            if(items == null)
            {
                return NotFound();
            }
            
            _apiResponse.Data = items.ToItemsDTO();
            _apiResponse.Status = true;
            _apiResponse.StatusCode = System.Net.HttpStatusCode.OK;

            return Ok(_apiResponse);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateItemRequestDTO itemDTO)
        {
            var itemModel = itemDTO.ToItemFromCreateDTO();
            await _itemRepo.CreateAsync(itemModel);
            
            _apiResponse.Data = itemModel;
            _apiResponse.Status = true;
            _apiResponse.StatusCode = System.Net.HttpStatusCode.OK;

            return Ok(_apiResponse);
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
            
            _apiResponse.Data = itemModel.ToItemsDTO();
            _apiResponse.Status = true;
            _apiResponse.StatusCode = System.Net.HttpStatusCode.OK;

            return Ok(_apiResponse);
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

            _apiResponse.Data = itemModel.ToItemsDTO();
            _apiResponse.Status = true;
            _apiResponse.StatusCode = System.Net.HttpStatusCode.OK;
            
            return Ok(_apiResponse);
        }
    }
}