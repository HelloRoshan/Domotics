from flask import Flask, jsonify, request
app = Flask(__name__)


lights = [
    {
        'id' : 1,
        'gpio' : 2,
        'description': 'Whitelight',
        'state' : True
    },
    {
        'id' : 2,
        'gpio' : 3,
        'description': 'Orangelight',
        'state' : False
    }
]


@app.route("/")
def hello():
	return 'Hello People'


@app.route('/lightdb/light', methods=['GET'])
def getAllLight():
	return jsonify({'Lightdetails' :lights })


@app.route('/lightdb/light/<int:lightId>', methods=['GET'])
def getLight(lightId):
	speclight = [light for light in lights if (light['id'] == lightId)]
	return jsonify({'Lightdetail': speclight})


@app.route('/lightdb/light/<int:lightId>', methods=['PUT'])
def updateLight(lightId):
	lgt = [light for light in lights if (light['id'] == lightId)]
	if 'gpio' in request.json:
		lgt[0]['gpio'] = request.json['gpio']
	if 'state' in request.json:
		lgt[0]['state'] = request.json['state']
	return jsonify({'Lightdetail': lgt[0]})


@app.route('/lightdb/light',methods=['POST'])
def createlight():
	light = {
     	'id':request.json['id'],
     	'gpio':request.json['gpio'],
     	'description':request.json['description'],
     	'state': request.json['state'] }
 	lights.append(light)
 	return jsonify(lights)


   
if __name__ =='__main__':
	app.run(debug=True, host='0.0.0.0')
	
