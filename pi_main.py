#commit these and test on the Flask server

import scripts.switchscript
import time
from flask import Flask, jsonify, request

app = Flask(__name__)

lights = [
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


def updateLight(lightId):
    lgt = [light for light in lights if (light['id'] == lightId)]
    if 'gpio' in request.json:
        lgt[0]['gpio'] = request.json['gpio']
    if 'state' in request.json:
        lgt[0]['state'] = request.json['state']
        return jsonify({'Lightdetail': lgt[0]})

@app.route("/")
def hello():	
	return '<h1>Hello Team Domotics</h1>'

#update this to get the real data not  hardcoded
@app.route('/lightdb/light', methods=['GET'])
def getAllLight():
	return jsonify({'Lightdetails' :lights })

#same thing as above
@app.route('/lightdb/light/<int:lightId>', methods=['GET'])
def getLight(lightId):
	speclight = [light for light in lights if (light['id'] == lightId)]
	return jsonify({'Lightdetail': speclight})


@app.route('/lightdb/light/<int:lightId>', methods=['PUT'])
def turn_switch(lightId):
    if request.json['state'] == True:   		
        scripts.switchscript.turn_off(lightId)
        updateLight(lightId)
    else:
        scripts.switchscripts.turn_on(lightId)
        updateLight(lightId)
        	
@app.route('/lightdb/light',methods=['POST'])
def createlight():
	light = {
	'id': request.json['id'],
	'gpio':request.json['gpio'],
	'description':request.json['description'],
	'state': request.json['state']}
	lights.append(light)
	return jsonify(lights)
	
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
	# 	if lgt[0]['state'] == 'true' and lgt[0]['gpio'] == 2:
	# 	GPIO.output(2, GPIO.LOW)
	# 	3:
	# 	if lgt[0]['state'] == 'true' and lgt[0]['gpio'] == 3:
	# 	GPIO.output(3, GPIO.LOW)
	# else:
	# 		GPIO.output(3, GPIO.HIGH)
	# 	}
	# 	return switchit.get(i,"not a valid gpio")


	


	# }

	# if lgt[0]['state'] == 'true' and lgt[0]['gpio'] == 2:
	# 	GPIO.output(2, GPIO.LOW)
	# else:
	# 	GPIO.output(2, GPIO.HIGH)

	# if lgt[0]['state'] == 'true' and lgt[0]['gpio'] == 3:
	# 	GPIO.output(3, GPIO.LOW)
	# else:
	# 		GPIO.output(3, GPIO.HIGH)



	