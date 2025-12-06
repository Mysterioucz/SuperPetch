import yfinance as yf
import matplotlib.pyplot as plt

last_date_of_months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

data = yf.download("VFVA", start="2018-03-30", end="2025-07-31", auto_adjust=False)
first_date_data = data.resample('ME').first()
last_date_data = data.resample('ME').last()
monthly_returns = (last_date_data['Adj Close'] - first_date_data['Adj Close']) / first_date_data['Adj Close']

monthly_returns.plot(title="VFVA Monthly Returns")
plt.xlabel("Date")
plt.ylabel("Returns")
plt.show()
monthly_returns.to_csv("VFVA_1y.csv")
