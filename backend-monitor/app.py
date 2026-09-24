from flask import Flask, jsonify, request
from flask_cors import CORS
import time
app=Flask(__name__); CORS(app, resources={r'/api/*': {'origins':'*'}})
START=time.time(); SERVICE='shadow-nexus-monitor'
@app.get('/')
def root(): return jsonify(service=SERVICE,status='online',version='1.0')
@app.get('/health')
def health(): return jsonify(service=SERVICE,status='ok',uptime=round(time.time()-START,1),version='1.0')
@app.post('/api/echo')
def echo(): return jsonify(received=request.get_json(silent=True) or {})
@app.post('/api/check')
def check():
    data=request.get_json(silent=True) or {}; return jsonify(ok=True,note='Only check systems you own or are authorized to assess.',target=data.get('url'))
