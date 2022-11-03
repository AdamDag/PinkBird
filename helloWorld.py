#prompt for input
import os

counter = 0
while (True):
    
    counter+=1
    print("Fill in the blank: ____Bird")
    print("hint: it's a color")
    answer = input()
    #clear the screen
    os.system('cls')
    if answer == "Pink" or answer == "pink":
        print("Correct! Welcome to PinkBird")
        break
    else:
        
        print("Incorrect, try again")
        if counter == 1:
            print("hint: the first letter is P")
        elif counter == 2:
            print("hint: the second letter is I")
        elif counter == 3:
            print("hint: the third letter is N")
        elif counter == 4:
            print("hint: the fourth letter is K")
        elif counter >= 5:
            print("We've pretty much given you the answer already.")
        
    