using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace api.Handler
{
    public class ApiResponse
    {
        public bool Status { get; set; }
        public HttpStatusCode StatusCode {get; set;}
        public dynamic Data { get; set; }
    }
}