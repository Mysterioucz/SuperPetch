import yfinance as yf
import matplotlib.pyplot as plt

stock_data = yf.Ticker("AAPL")
data = stock_data.history(period="1y")

data['Close'].plot(title="AAPL Stock Price Over the Last Year")
plt.xlabel("Date")
plt.ylabel("Closing Price (USD)")
plt.show()
print(type(data))

