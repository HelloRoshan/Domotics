import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BCM)

#initialize pin numbers
pinlist = [2, 3, 4, 14, 15, 17, 18, 22, 23, 24, 27]

#loop through  pins
for i in pinlist:
    GPIO.setup(i, GPIO.OUT)
    GPIO.output(i, not GPIO.input(i))
