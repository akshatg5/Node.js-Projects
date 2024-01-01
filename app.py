import yfinance as yf
from flask import Flask,request,render_template,jsonify

app = Flask(__name__,template_folder='templates')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/stock_data',methods=['POST'])
def stock_data():
    stock = request.get_json()['ticker']
    data = yf.Ticker(stock + '.NS').history(period='1y')
    return jsonify({
        'currentPrice' : data.iloc[-1].Close,
        'openPrice' : data.iloc[-1].Open  
    })


if __name__ == "__main__":
    app.run(debug=True)

