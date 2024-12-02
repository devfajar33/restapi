using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Transactions
    {
        public int Id { get; set; }
        public int IdItems { get; set; }
        public decimal Stock { get; set; }
        public decimal Price{ get; set; }
        public decimal TotalPrice{ get; set; }
        public int Created_By { get; set; }
        public DateTime? Created_At { get; set; }
        public DateTime? Updated_At { get; set; }
    }
}