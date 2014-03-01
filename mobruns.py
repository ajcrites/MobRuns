import os
from flask import Flask, request

app = Flask(__name__)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/js/<path:asset_path>')
@app.route('/css/<path:asset_path>')
def asset(asset_path):
    type = request.path.split('/')[1]
    return app.send_static_file(type + "/" + asset_path)

if __name__ == "__main__":
    app.debug = True
    app.run()
