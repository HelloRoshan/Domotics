#commit these and test on the Flask server

# import scripts.switchscript
import time
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
#This is hardcoded JSON must GET from the gpio pin lookup in the GPIO Library
switches = [
    {
        'id': 1,
        'gpio': 2,
        'label': 'Switch1',
        'state': True
    },
    {
        'id': 2,
        'gpio': 3,
        'label': 'Switch2',
        'state': True
    }
]


def updateswitch(switchId):
    swt = [switch for switch in switches if (switch['id'] == switchId)]
    if 'state' in request.json:
        swt[0]['state'] = request.json['state']
        return jsonify({'switchdetail': swt[0]})

@app.route("/", methods=['GET'])
def hello():
    return '<h1>Hello Team Domotics</h1>'


#update this to get the real data not  hardcoded
@app.route('/api/switches', methods=['GET'])
def getAllswitch():
    return jsonify({'switchdetails' :switches })


#same thing as above
@app.route('/api/switches/<int:switchId>', methods=['GET'])
def getswitch(switchId):
    specswitch = [switch for switch in switches if (switch['id'] == switchId)]
    return jsonify({'switchdetail': specswitch})

#put must update the database as well as target the specific switch update
@app.route('/switchdb/switch/<int:switchId>', methods=['PUT'])
def turn_switch(switchId):
    #mind if he sends the data after updating the switch or before if after must on if true
    if request.json['state'] == True:   		
        # scripts.switchscript.turn_on(pin_num)
        updateswitch(switchId)
    else:
        # scripts.switchscript.turn_off(pin_num)
        updateswitch(switchId)
        	
@app.route('/switchdb/switch',methods=['POST'])
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




#def update_switch_data(switch_id, state):
    # data[switch_id]['state']

	# Update switch with swithc_id with the provided state.
    	

#this shoudl work in postman first
# @app.route("/switches/:id", methods=['PUT'])
# def turn_switich(id):
#     data = request.json()

# 	if data.state == True:
#     	scripts.turn_on(id)
# 		update_switch_data(id, True)
# 	else:
#     	scripts.turn_off(id)
# 		update_switch_data(id, False)


	# def exactswitch(i):
	# 	switchit ={
	# 	2:
	# 	if swt[0]['state'] == 'true' and swt[0]['gpio'] == 2:
	# 	GPIO.output(2, GPIO.LOW)
	# 	3:
	# 	if swt[0]['state'] == 'true' and swt[0]['gpio'] == 3:
	# 	GPIO.output(3, GPIO.LOW)
	# else:
	# 		GPIO.output(3, GPIO.HIGH)
	# 	}
	# 	return switchit.get(i,"not a valid gpio")


	


	# }

	# if swt[0]['state'] == 'true' and swt[0]['gpio'] == 2:
	# 	GPIO.output(2, GPIO.LOW)
	# else:
	# 	GPIO.output(2, GPIO.HIGH)

	# if swt[0]['state'] == 'true' and swt[0]['gpio'] == 3:
	# 	GPIO.output(3, GPIO.LOW)
	# else:
	# 		GPIO.output(3, GPIO.HIGH)



	
