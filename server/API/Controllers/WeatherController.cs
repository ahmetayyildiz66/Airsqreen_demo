using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class WeatherController : ControllerBase {
        private readonly IHttpClientFactory _httpClientFactory;
        private string BASE_URL = "http://api.openweathermap.org/data/2.5/weather?lat=";
        private const string API_KEY = "3d0a6ad4bbacf716528bb7665da805df";

        public WeatherController (IHttpClientFactory httpClientFactory) {
            _httpClientFactory = httpClientFactory;
        }

        private async Task<string> GetWeatherForecast (Location value) {
            var url = BASE_URL + value.latitude + "&lon=" + value.longitude + "&APPID=" + API_KEY;
            string data = "";

            using (var httpClient = new HttpClient ()) {
                using (var response = await httpClient.GetAsync (url)) {
                    data = await response.Content.ReadAsStringAsync ();
                }
            }

            return data;
        }

        // POST api/values
        [HttpPost]
        public async Task<string> Post ([FromBody] Location value) {
            var result = await GetWeatherForecast (value);
            return result;
        }

    }
}