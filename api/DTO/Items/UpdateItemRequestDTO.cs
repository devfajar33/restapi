using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTO.Items
{
    public class UpdateItemRequestDTO
    {
        public string Name { get; set; } = null!;
        public decimal Price{ get; set; }
        public decimal Stock { get; set; }
        public int Category { get; set; } 
        public string? Image{ get; set; } = null;
        public int Created_By { get; set; }
        public DateTime? Updated_At { get; set; }
    }
}