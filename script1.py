import RPIO as GPIO
import time

#refers to pins that is being referred are physical ins
GPIO.setmode(GPIO.BOARD)
GPIO.setup(7,GPIO.OUT)#sets pin 7 as an output

for i in range(25):
	GPIO.output(7,True)
	time.sleep(1)#causes 1 seconds before  moving to other command
	GPIO.output(7,False)
	time.sleep(1)

GPIO.cleanup()