import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BCM)
#if e import file do we import the modules imported in one file


def turn_on(lightId):
    GPIO.setmode(GPIO.BCM)
    #loop through  pins
    # for i in pinlist
    #     GPIO.setup(i, GPIO.OUT)
    #     GPIO.output(i, not GPIO.input(i))

    GPIO.setup(lightId, GPIO.OUT)
    GPIO.output(lightId, not GPIO.input(lightId))


def turn_off():
    GPIO.setmode(GPIO.BCM)
    #loop through  pins
    for i in pinlist:
        GPIO.setup(i, GPIO.OUT)
        GPIO.output(i, not GPIO.input(i))
    