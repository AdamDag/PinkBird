#prompt for input
while (True):
    print("Fill in the blank: ____Bird")
    print("hint: it's a color")
    answer = input()
    if answer == "Pink" or answer == "pink":
        print("Correct! Welcome to PinkBird")
        break
    else:
        print("Incorrect, try again")
    