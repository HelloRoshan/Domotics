# commit these and test on the Flask server

import scripts.test
import time
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
#pin_num = request.json['gpio']
#This is hardcoded JSON must GET from the gpio pin lookup in the GPIO Library
switches = [
    {
        'id': 1,
        # 'gpio': 2,
        'label': 'Switch 1',
        'name': 'a',
        'state': True
    },
    {
        'id': 2,
        # 'gpio': 3,
        'label': 'Switch 2',
        'name': 'be',
        'state': False
    }
]


def updateswitch(switchId):
    swt = [switch for switch in switches if (switch['id'] == switchId)]
    if 'state' in request.json:
        swt[0]['state'] = request.json['state']
        return jsonify(swt[0])

@app.route("/")
@cross_origin()
def hello():
    return '<h1>Hello Team Domotics</h1>'


#update this to get the real data not  hardcoded
@app.route('/api/switches', methods=['GET'])
@cross_origin()
def getAllswitch():
    return jsonify(switches)


#same thing as above
@app.route('/api/switches/<int:switchId>', methods=['GET'])
@cross_origin()
def getswitch(switchId):
    specswitch = [switch for switch in switches if switch['id'] == switchId ]
    return jsonify(specswitch)

#put must update the database as well as target the specific switch update

@app.route('/api/switches/<int:switchId>', methods=['PATCH'])
@cross_origin()
def turn_switch(switchId):
    # if request.json['id'] == switchId:
    if request.json['state'] == True:
        scripts.test.click()
        return updateswitch(switchId)       
    else:
        scripts.test.click()
        return updateswitch(switchId)
        

@app.route('/api/switches',methods=['POST'])
@cross_origin()
def createswitch():
    switch = {
        'id': request.json['id'],
        'gpio':request.json['gpio'],
        'description':request.json['description'],
        'state': request.json['state']
    }
    switches.append(switch)
    return jsonify(switches)

if __name__ =='__main__':
    app.run(debug=True, host='0.0.0.0')
