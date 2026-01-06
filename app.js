/* Pokemon Clock App - iOS 12 Compatible */
(function() {
    'use strict';

    // Pokemon sprite data (base64 encoded simple pixel art)
    var pokemonSprites = {
        pikachu: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect fill="#ffcb05" x="20" y="16" width="24" height="28" rx="8"/><rect fill="#ffcb05" x="16" y="8" width="8" height="16"/><rect fill="#ffcb05" x="40" y="8" width="8" height="16"/><rect fill="#1a1a1a" x="18" y="10" width="4" height="8"/><rect fill="#1a1a1a" x="42" y="10" width="4" height="8"/><circle fill="#1a1a1a" cx="28" cy="28" r="3"/><circle fill="#1a1a1a" cx="36" cy="28" r="3"/><circle fill="#ffffff" cx="27" cy="27" r="1"/><circle fill="#ffffff" cx="35" cy="27" r="1"/><ellipse fill="#ff6b6b" cx="22" cy="34" rx="4" ry="2"/><ellipse fill="#ff6b6b" cx="42" cy="34" rx="4" ry="2"/><path fill="#1a1a1a" d="M30 36 L32 38 L34 36" stroke="#1a1a1a" stroke-width="1"/></svg>'),
        charmander: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect fill="#ff7f50" x="20" y="18" width="24" height="26" rx="8"/><rect fill="#ff7f50" x="16" y="12" width="6" height="10" rx="2"/><rect fill="#ff7f50" x="42" y="12" width="6" height="10" rx="2"/><circle fill="#1a1a1a" cx="28" cy="28" r="3"/><circle fill="#1a1a1a" cx="36" cy="28" r="3"/><circle fill="#ffffff" cx="27" cy="27" r="1"/><circle fill="#ffffff" cx="35" cy="27" r="1"/><ellipse fill="#ffe4b5" cx="32" cy="38" rx="8" ry="6"/><path fill="#ff4500" d="M44 48 Q48 44 46 40 Q50 44 48 50 Q46 48 44 48" /></svg>'),
        bulbasaur: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect fill="#78c850" x="18" y="22" width="28" height="22" rx="10"/><rect fill="#78c850" x="14" y="18" width="8" height="10" rx="2"/><rect fill="#78c850" x="42" y="18" width="8" height="10" rx="2"/><circle fill="#ff1a1a" cx="26" cy="30" r="4"/><circle fill="#ff1a1a" cx="38" cy="30" r="4"/><circle fill="#1a1a1a" cx="26" cy="30" r="2"/><circle fill="#1a1a1a" cx="38" cy="30" r="2"/><ellipse fill="#228b22" cx="32" cy="16" rx="10" ry="8"/><ellipse fill="#2e8b2e" cx="32" cy="14" rx="6" ry="5"/></svg>'),
        squirtle: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect fill="#6890f0" x="20" y="18" width="24" height="26" rx="10"/><rect fill="#6890f0" x="16" y="14" width="6" height="8" rx="2"/><rect fill="#6890f0" x="42" y="14" width="6" height="8" rx="2"/><circle fill="#1a1a1a" cx="28" cy="28" r="3"/><circle fill="#1a1a1a" cx="36" cy="28" r="3"/><circle fill="#ffffff" cx="27" cy="27" r="1"/><circle fill="#ffffff" cx="35" cy="27" r="1"/><ellipse fill="#ffe4b5" cx="32" cy="38" rx="8" ry="5"/><ellipse fill="#8b4513" cx="32" cy="50" rx="12" ry="6"/></svg>'),
        eevee: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect fill="#c4a484" x="20" y="20" width="24" height="24" rx="10"/><polygon fill="#c4a484" points="16,10 22,24 10,24"/><polygon fill="#c4a484" points="48,10 42,24 54,24"/><polygon fill="#f5e6d3" points="17,14 21,22 13,22"/><polygon fill="#f5e6d3" points="47,14 43,22 51,22"/><circle fill="#1a1a1a" cx="28" cy="30" r="3"/><circle fill="#1a1a1a" cx="36" cy="30" r="3"/><circle fill="#ffffff" cx="27" cy="29" r="1"/><circle fill="#ffffff" cx="35" cy="29" r="1"/><ellipse fill="#f5e6d3" cx="32" cy="42" rx="6" ry="4"/><circle fill="#1a1a1a" cx="32" cy="36" r="2"/></svg>'),
        jigglypuff: 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle fill="#ffb6c1" cx="32" cy="32" r="20"/><ellipse fill="#ffb6c1" cx="14" cy="26" rx="6" ry="8"/><ellipse fill="#ffb6c1" cx="50" cy="26" rx="6" ry="8"/><circle fill="#1a1a1a" cx="26" cy="30" r="4"/><circle fill="#1a1a1a" cx="38" cy="30" r="4"/><circle fill="#87ceeb" cx="25" cy="29" r="2"/><circle fill="#87ceeb" cx="37" cy="29" r="2"/><circle fill="#ffffff" cx="24" cy="28" r="1"/><circle fill="#ffffff" cx="36" cy="28" r="1"/><ellipse fill="#1a1a1a" cx="32" cy="38" rx="3" ry="2"/><path fill="none" stroke="#ffb6c1" stroke-width="3" d="M28 12 Q32 8 36 12 Q40 16 36 20"/></svg>')
    };

    var pokemonNames = ['pikachu', 'charmander', 'bulbasaur', 'squirtle', 'eevee', 'jigglypuff'];

    // DOM elements
    var hoursEl = document.getElementById('hours');
    var minutesEl = document.getElementById('minutes');
    var secondsEl = document.getElementById('seconds');
    var periodEl = document.getElementById('period');
    var dateDisplayEl = document.getElementById('date-display');
    var calendarTitleEl = document.getElementById('calendar-title');
    var calendarDaysEl = document.getElementById('calendar-days');
    var prevMonthBtn = document.getElementById('prev-month');
    var nextMonthBtn = document.getElementById('next-month');
    var sprite1El = document.getElementById('pokemon-sprite');
    var sprite2El = document.getElementById('pokemon-sprite-2');

    // Calendar state
    var currentMonth = new Date().getMonth();
    var currentYear = new Date().getFullYear();

    // Weather elements
    var weatherTempEl = document.getElementById('weather-temp');
    var weatherConditionEl = document.getElementById('weather-condition');
    var weatherHighEl = document.getElementById('weather-high');
    var weatherLowEl = document.getElementById('weather-low');
    var weatherLocationEl = document.getElementById('weather-location');
    var weatherIconEl = document.getElementById('weather-icon');

    // Weather code descriptions and icons (WMO Weather interpretation codes)
    var weatherCodes = {
        0: { desc: 'Clear sky', icon: 'sun' },
        1: { desc: 'Mainly clear', icon: 'sun' },
        2: { desc: 'Partly cloudy', icon: 'partly-cloudy' },
        3: { desc: 'Overcast', icon: 'cloudy' },
        45: { desc: 'Foggy', icon: 'fog' },
        48: { desc: 'Depositing fog', icon: 'fog' },
        51: { desc: 'Light drizzle', icon: 'drizzle' },
        53: { desc: 'Moderate drizzle', icon: 'drizzle' },
        55: { desc: 'Dense drizzle', icon: 'drizzle' },
        56: { desc: 'Freezing drizzle', icon: 'drizzle' },
        57: { desc: 'Freezing drizzle', icon: 'drizzle' },
        61: { desc: 'Slight rain', icon: 'rain' },
        63: { desc: 'Moderate rain', icon: 'rain' },
        65: { desc: 'Heavy rain', icon: 'rain' },
        66: { desc: 'Freezing rain', icon: 'rain' },
        67: { desc: 'Freezing rain', icon: 'rain' },
        71: { desc: 'Slight snow', icon: 'snow' },
        73: { desc: 'Moderate snow', icon: 'snow' },
        75: { desc: 'Heavy snow', icon: 'snow' },
        77: { desc: 'Snow grains', icon: 'snow' },
        80: { desc: 'Slight showers', icon: 'rain' },
        81: { desc: 'Moderate showers', icon: 'rain' },
        82: { desc: 'Violent showers', icon: 'rain' },
        85: { desc: 'Snow showers', icon: 'snow' },
        86: { desc: 'Heavy snow showers', icon: 'snow' },
        95: { desc: 'Thunderstorm', icon: 'storm' },
        96: { desc: 'Thunderstorm with hail', icon: 'storm' },
        99: { desc: 'Thunderstorm with hail', icon: 'storm' }
    };

    // Weather SVG icons
    var weatherIcons = {
        sun: '<svg viewBox="0 0 64 64" class="weather-svg"><circle cx="32" cy="32" r="14" fill="#ffcb05"/><g stroke="#ffcb05" stroke-width="3" stroke-linecap="round"><line x1="32" y1="8" x2="32" y2="14"/><line x1="32" y1="50" x2="32" y2="56"/><line x1="8" y1="32" x2="14" y2="32"/><line x1="50" y1="32" x2="56" y2="32"/><line x1="15" y1="15" x2="19" y2="19"/><line x1="45" y1="45" x2="49" y2="49"/><line x1="15" y1="49" x2="19" y2="45"/><line x1="45" y1="19" x2="49" y2="15"/></g></svg>',
        'partly-cloudy': '<svg viewBox="0 0 64 64" class="weather-svg"><circle cx="22" cy="22" r="10" fill="#ffcb05"/><g stroke="#ffcb05" stroke-width="2" stroke-linecap="round"><line x1="22" y1="5" x2="22" y2="9"/><line x1="22" y1="35" x2="22" y2="39"/><line x1="5" y1="22" x2="9" y2="22"/><line x1="35" y1="22" x2="39" y2="22"/><line x1="10" y1="10" x2="13" y2="13"/><line x1="31" y1="31" x2="34" y2="34"/><line x1="10" y1="34" x2="13" y2="31"/><line x1="31" y1="13" x2="34" y2="10"/></g><ellipse cx="38" cy="42" rx="18" ry="12" fill="#74b9ff"/><ellipse cx="28" cy="38" rx="12" ry="10" fill="#74b9ff"/><ellipse cx="48" cy="40" rx="10" ry="8" fill="#74b9ff"/></svg>',
        cloudy: '<svg viewBox="0 0 64 64" class="weather-svg"><ellipse cx="32" cy="38" rx="22" ry="14" fill="#74b9ff"/><ellipse cx="20" cy="32" rx="14" ry="12" fill="#74b9ff"/><ellipse cx="44" cy="34" rx="12" ry="10" fill="#74b9ff"/><ellipse cx="32" cy="28" rx="10" ry="8" fill="#a8d4ff"/></svg>',
        fog: '<svg viewBox="0 0 64 64" class="weather-svg"><g stroke="#74b9ff" stroke-width="4" stroke-linecap="round" opacity="0.7"><line x1="10" y1="24" x2="54" y2="24"/><line x1="14" y1="34" x2="50" y2="34"/><line x1="10" y1="44" x2="54" y2="44"/></g></svg>',
        drizzle: '<svg viewBox="0 0 64 64" class="weather-svg"><ellipse cx="32" cy="24" rx="18" ry="12" fill="#74b9ff"/><ellipse cx="22" cy="20" rx="12" ry="10" fill="#74b9ff"/><ellipse cx="42" cy="22" rx="10" ry="8" fill="#74b9ff"/><g stroke="#6890f0" stroke-width="2" stroke-linecap="round"><line x1="20" y1="40" x2="18" y2="46"/><line x1="32" y1="42" x2="30" y2="48"/><line x1="44" y1="40" x2="42" y2="46"/><line x1="26" y1="50" x2="24" y2="56"/><line x1="38" y1="50" x2="36" y2="56"/></g></svg>',
        rain: '<svg viewBox="0 0 64 64" class="weather-svg"><ellipse cx="32" cy="22" rx="18" ry="12" fill="#74b9ff"/><ellipse cx="22" cy="18" rx="12" ry="10" fill="#74b9ff"/><ellipse cx="42" cy="20" rx="10" ry="8" fill="#74b9ff"/><g stroke="#3466af" stroke-width="3" stroke-linecap="round"><line x1="18" y1="38" x2="14" y2="50"/><line x1="30" y1="40" x2="26" y2="52"/><line x1="42" y1="38" x2="38" y2="50"/><line x1="50" y1="42" x2="48" y2="50"/></g></svg>',
        snow: '<svg viewBox="0 0 64 64" class="weather-svg"><ellipse cx="32" cy="22" rx="18" ry="12" fill="#74b9ff"/><ellipse cx="22" cy="18" rx="12" ry="10" fill="#74b9ff"/><ellipse cx="42" cy="20" rx="10" ry="8" fill="#74b9ff"/><g fill="#ffffff"><circle cx="18" cy="42" r="3"/><circle cx="32" cy="46" r="3"/><circle cx="46" cy="42" r="3"/><circle cx="24" cy="54" r="3"/><circle cx="40" cy="54" r="3"/></g></svg>',
        storm: '<svg viewBox="0 0 64 64" class="weather-svg"><ellipse cx="32" cy="20" rx="18" ry="12" fill="#74b9ff"/><ellipse cx="22" cy="16" rx="12" ry="10" fill="#74b9ff"/><ellipse cx="42" cy="18" rx="10" ry="8" fill="#74b9ff"/><polygon points="34,30 28,42 34,42 30,56 42,40 36,40 42,30" fill="#ffcb05"/><g stroke="#3466af" stroke-width="2" stroke-linecap="round"><line x1="16" y1="36" x2="14" y2="44"/><line x1="48" y1="36" x2="46" y2="44"/></g></svg>'
    };

    // Days and months names
    var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'];

    // Pad number with leading zero
    function padZero(num) {
        return num < 10 ? '0' + num : String(num);
    }

    // Update clock
    function updateClock() {
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
        var period = hours >= 12 ? 'PM' : 'AM';

        // Convert to 12-hour format
        var displayHours = hours % 12;
        if (displayHours === 0) displayHours = 12;

        hoursEl.textContent = padZero(displayHours);
        minutesEl.textContent = padZero(minutes);
        secondsEl.textContent = padZero(seconds);
        periodEl.textContent = period;

        // Update date
        var dayName = dayNames[now.getDay()];
        var monthName = monthNames[now.getMonth()];
        var date = now.getDate();
        var year = now.getFullYear();

        dateDisplayEl.textContent = dayName + ', ' + monthName + ' ' + date + ', ' + year;
    }

    // Get days in month
    function getDaysInMonth(year, month) {
        return new Date(year, month + 1, 0).getDate();
    }

    // Get first day of month (0 = Sunday)
    function getFirstDayOfMonth(year, month) {
        return new Date(year, month, 1).getDay();
    }

    // Render calendar
    function renderCalendar() {
        var today = new Date();
        var todayDate = today.getDate();
        var todayMonth = today.getMonth();
        var todayYear = today.getFullYear();

        // Update title
        calendarTitleEl.textContent = monthNames[currentMonth] + ' ' + currentYear;

        // Clear calendar
        calendarDaysEl.innerHTML = '';

        var daysInMonth = getDaysInMonth(currentYear, currentMonth);
        var firstDay = getFirstDayOfMonth(currentYear, currentMonth);
        var daysInPrevMonth = getDaysInMonth(currentYear, currentMonth - 1);

        // Previous month days
        for (var i = firstDay - 1; i >= 0; i--) {
            var dayEl = document.createElement('div');
            dayEl.className = 'day other-month';
            if (firstDay - 1 - i === 0 || firstDay - 1 - i === 6) {
                dayEl.className += ' weekend';
            }
            dayEl.textContent = daysInPrevMonth - i;
            calendarDaysEl.appendChild(dayEl);
        }

        // Current month days
        for (var day = 1; day <= daysInMonth; day++) {
            var dayEl = document.createElement('div');
            dayEl.className = 'day';

            var dayOfWeek = (firstDay + day - 1) % 7;
            if (dayOfWeek === 0 || dayOfWeek === 6) {
                dayEl.className += ' weekend';
            }

            if (day === todayDate && currentMonth === todayMonth && currentYear === todayYear) {
                dayEl.className += ' today';
            }

            dayEl.textContent = day;
            calendarDaysEl.appendChild(dayEl);
        }

        // Next month days (fill remaining grid)
        var totalCells = firstDay + daysInMonth;
        var remainingCells = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);

        for (var i = 1; i <= remainingCells; i++) {
            var dayEl = document.createElement('div');
            dayEl.className = 'day other-month';
            var dayOfWeek = (totalCells + i - 1) % 7;
            if (dayOfWeek === 0 || dayOfWeek === 6) {
                dayEl.className += ' weekend';
            }
            dayEl.textContent = i;
            calendarDaysEl.appendChild(dayEl);
        }
    }

    // Navigate months
    function prevMonth() {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    }

    function nextMonth() {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    }

    // Set random Pokemon sprites
    function setRandomSprites() {
        var index1 = Math.floor(Math.random() * pokemonNames.length);
        var index2 = Math.floor(Math.random() * pokemonNames.length);

        // Make sure they're different
        while (index2 === index1) {
            index2 = Math.floor(Math.random() * pokemonNames.length);
        }

        var pokemon1 = pokemonNames[index1];
        var pokemon2 = pokemonNames[index2];

        sprite1El.style.backgroundImage = 'url("' + pokemonSprites[pokemon1] + '")';
        sprite2El.style.backgroundImage = 'url("' + pokemonSprites[pokemon2] + '")';
    }

    // Keep screen awake (request wake lock if available)
    function requestWakeLock() {
        if ('wakeLock' in navigator) {
            navigator.wakeLock.request('screen').catch(function(err) {
                console.log('Wake lock not available:', err);
            });
        }
    }

    // Register service worker
    function registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js').then(function(registration) {
                console.log('ServiceWorker registered:', registration.scope);
            }).catch(function(error) {
                console.log('ServiceWorker registration failed:', error);
            });
        }
    }

    // Prevent screen dimming by simulating activity
    function preventDimming() {
        // Touch the DOM periodically to keep screen active
        document.body.style.opacity = '0.999';
        setTimeout(function() {
            document.body.style.opacity = '1';
        }, 100);
    }

    // Update weather icon
    function updateWeatherIcon(iconType) {
        var icon = weatherIcons[iconType] || weatherIcons.sun;
        weatherIconEl.innerHTML = icon;
    }

    // Get weather description and icon from code
    function getWeatherInfo(code) {
        return weatherCodes[code] || { desc: 'Unknown', icon: 'sun' };
    }

    // Round temperature to nearest integer
    function roundTemp(temp) {
        return Math.round(temp);
    }

    // Fetch weather from Open-Meteo API (free, no API key required)
    function fetchWeather(latitude, longitude) {
        var url = 'https://api.open-meteo.com/v1/forecast?' +
            'latitude=' + latitude +
            '&longitude=' + longitude +
            '&current=temperature_2m,weather_code' +
            '&daily=temperature_2m_max,temperature_2m_min' +
            '&temperature_unit=fahrenheit' +
            '&timezone=auto' +
            '&forecast_days=1';

        fetch(url)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Weather fetch failed');
                }
                return response.json();
            })
            .then(function(data) {
                // Update current temperature
                var currentTemp = roundTemp(data.current.temperature_2m);
                weatherTempEl.textContent = currentTemp + '°F';

                // Update weather condition and icon
                var weatherInfo = getWeatherInfo(data.current.weather_code);
                weatherConditionEl.textContent = weatherInfo.desc;
                updateWeatherIcon(weatherInfo.icon);

                // Update high/low from daily forecast
                var highTemp = roundTemp(data.daily.temperature_2m_max[0]);
                var lowTemp = roundTemp(data.daily.temperature_2m_min[0]);
                weatherHighEl.textContent = 'H: ' + highTemp + '°';
                weatherLowEl.textContent = 'L: ' + lowTemp + '°';

                console.log('Weather updated successfully');
            })
            .catch(function(error) {
                console.log('Weather fetch error:', error);
                weatherConditionEl.textContent = 'Weather unavailable';
            });
    }

    // Reverse geocode to get location name
    function getLocationName(latitude, longitude) {
        // Using Open-Meteo's geocoding in reverse via a simple approach
        // We'll use a free reverse geocoding API
        var url = 'https://nominatim.openstreetmap.org/reverse?' +
            'lat=' + latitude +
            '&lon=' + longitude +
            '&format=json';

        fetch(url, {
            headers: {
                'User-Agent': 'PokemonClock/1.0'
            }
        })
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                var city = data.address.city ||
                           data.address.town ||
                           data.address.village ||
                           data.address.county ||
                           data.address.state ||
                           'Unknown Location';
                weatherLocationEl.textContent = city;
            })
            .catch(function(error) {
                // Fallback to coordinates if geocoding fails
                weatherLocationEl.textContent = latitude.toFixed(2) + '°, ' + longitude.toFixed(2) + '°';
            });
    }

    // Get user's location and fetch weather
    function initWeather() {
        if ('geolocation' in navigator) {
            weatherLocationEl.textContent = 'Getting location...';

            navigator.geolocation.getCurrentPosition(
                function(position) {
                    var lat = position.coords.latitude;
                    var lon = position.coords.longitude;

                    // Fetch weather data
                    fetchWeather(lat, lon);

                    // Get location name
                    getLocationName(lat, lon);

                    // Refresh weather every 15 minutes
                    setInterval(function() {
                        fetchWeather(lat, lon);
                    }, 15 * 60 * 1000);
                },
                function(error) {
                    console.log('Geolocation error:', error);
                    weatherLocationEl.textContent = 'Location access denied';
                    weatherConditionEl.textContent = 'Enable location for weather';
                    weatherTempEl.textContent = '--°';
                },
                {
                    enableHighAccuracy: false,
                    timeout: 10000,
                    maximumAge: 300000 // Cache location for 5 minutes
                }
            );
        } else {
            weatherLocationEl.textContent = 'Geolocation not supported';
            weatherConditionEl.textContent = 'Weather unavailable';
        }
    }

    // Initialize
    function init() {
        // Register service worker for offline support
        registerServiceWorker();

        // Set Pokemon sprites
        setRandomSprites();

        // Change sprites every 30 minutes
        setInterval(setRandomSprites, 30 * 60 * 1000);

        // Update clock immediately and every second
        updateClock();
        setInterval(updateClock, 1000);

        // Render calendar
        renderCalendar();

        // Initialize weather
        initWeather();

        // Event listeners for calendar navigation
        prevMonthBtn.addEventListener('click', prevMonth);
        nextMonthBtn.addEventListener('click', nextMonth);

        // Try to keep screen awake
        requestWakeLock();

        // Prevent dimming every 30 seconds
        setInterval(preventDimming, 30000);

        // Re-request wake lock on visibility change
        document.addEventListener('visibilitychange', function() {
            if (document.visibilityState === 'visible') {
                requestWakeLock();
            }
        });

        console.log('Pokemon Clock initialized!');
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
