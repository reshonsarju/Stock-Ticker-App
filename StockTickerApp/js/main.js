(() => {
  const API_KEY = "WKAZOIIYBKHPSES3";
  const BASE_URL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY";
  let tickerForm = document.querySelector(".stock-form");
  tickerForm.addEventListener("submit", evt => {
    evt.preventDefault();
    let currentTicker = evt.target.querySelector("[name=ticker]").value;
    let currentTickerUrl = `${BASE_URL}&symbol=${currentTicker}&interval=5min&apikey=${API_KEY}`;
    fetch(currentTickerUrl).then(response => {
      return response.json();
    }).then(ticker => {
      tickerDisplay(ticker, document.querySelector(".ticker-display"));
    }).catch(error => {
      console.log("Error thrown please handle");
      console.log(error);
    });
  });

  const tickerDisplay = (data, element) => {
    let symbol = element.querySelector(".symbol");
    let date = element.querySelector(".date");
    let currentClosePrice = element.querySelector(".close-price");
    let currentOpen = element.querySelector(".open-price");
    let high = element.querySelector(".high");
    let low = element.querySelector(".low");
    let symbolInfo = data["Meta Data"];
    let {
      "2. Symbol": tickerSymbol
    } = symbolInfo;
    tickerSymbol = tickerSymbol.toUpperCase();
    symbol.innerText = tickerSymbol;
    let tickerInfo = data["Time Series (Daily)"];
    let pulledDates = Object.keys(tickerInfo);
    let currentDate = pulledDates[0];
    let {
      "1. open": openPrice,
      "2. high": priceHigh,
      "3. low": priceLow,
      "4. close": closePrice
    } = tickerInfo[currentDate];
    date.innerText = currentDate;
    currentOpen.innerText = openPrice;
    currentClosePrice.innerText = closePrice;
    high.innerText = priceHigh;
    low.innerText = priceLow;
  };
})();
