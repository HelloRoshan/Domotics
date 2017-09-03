import RPi.GPIO as GPIO
import time
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

pin = [2, 3]
GPIO.setmode(GPIO.BCM)
GPIO.setup(pin, GPIO.IN)
GPIO.setwarnings(False)

app = Flask(__name__)
CORS(app)

switches = [
    {
        'id': 1,
        'gpio': 2,
        'label': 'Switch 1',
        'name': 'a',
        'state': GPIO.input(2)
    },
    {
        'id': 2,
        'gpio': 3,
        'label': 'Switch 2',
        'name': 'be',
        'state': GPIO.input(3)
    }
]


def click(switchId):
    if switchId == 1:
        if request.json['state'] == True:
            GPIO.setup(2, GPIO.OUT)
            GPIO.output(2, GPIO.HIGH)
            return " Switch 1 is on "
        else:
            GPIO.setup(2, GPIO.OUT)
            GPIO.output(2, GPIO.LOW)
            return " Switch 1 is off "
    elif switchId == 2:
        if request.json['state'] == True:
            GPIO.setup(3, GPIO.OUT)
            GPIO.output(3, GPIO.HIGH)
            return " Switch 2 is on "
        else:
            GPIO.setup(3, GPIO.OUT)
            GPIO.output(3, GPIO.LOW)
            return " Switch 2 is off "
    else:
        print "Not a valid Switch"


def updateswitch(switchId):
    swt = [switch for switch in switches if (switch['id'] == switchId)]
    if 'state' in request.json:
        swt[0]['state'] = request.json['state']
        return jsonify(swt[0])


@app.route("/")
@cross_origin()
def hello():
    return '<h1>Hello Team Domotics</h1>'


@app.route('/api/switches', methods=['GET'])
@cross_origin()
def getAllswitch():
    return jsonify(switches)


@app.route('/api/switches/<int:switchId>', methods=['GET'])
@cross_origin()
def getswitch(switchId):
    specswitch = [switch for switch in switches if switch['id'] == switchId]
    return jsonify(specswitch)


@app.route('/api/switches/<int:switchId>', methods=['PATCH'])
@cross_origin()
def turn_switch(switchId):
    click(switchId)
    return updateswitch(switchId)


@app.route('/api/switches', methods=['POST'])
@cross_origin()
def createswitch():
    switch = {
        'id': request.json['id'],
        'gpio': request.json['gpio'],
        'label': request.json['label'],
        'name': request.json['name'],
        'state': GPIO.input(request.json['gpio'])
    }
    switches.append(switch)
    return jsonify(switches)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
