import json
from flask import Flask, request, jsonify

app = Flask(__name__)

# demo_get_profile works!
@app.route('/api/demo_get_profile', methods=['GET'])
def test_get():
  return jsonify({"username": "name", "password": "pass"})

@app.route('/api/demo_post_profile', methods=['POST'])
def test_post():
  data = request.json # Insert.
  return jsonify({"message": "posted {data}"})

if __name__ == '__main__':
  app.run(port=5000)