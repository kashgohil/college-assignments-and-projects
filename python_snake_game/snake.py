#import necessary files
import random
import math
import pygame
import tkinter as tk
from tkinter import messagebox

class cube(object): #cube object
    rows = 20
    width = 500

    def __init__(self,start,dirnx=1,dirny=0,color=(255,0,0)): #initializing cubes
        self.pos = start
        self.dirnx = 1
        self.dirny = 0
        self.color = color

    def draw(self,surface,eyes=False): #drawing the cube
        dis = self.width // self.rows
        pygame.draw.rect(surface, self.color,((self.pos[0])*dis, (self.pos[1])*dis, dis-2, dis-2)) #drawing cube using rect 
        if eyes: #eyes for the head of snake
            centre = dis // 2
            radius = 3
            circleMiddle1 = (self.pos[0]*dis+centre-radius,self.pos[1]*dis+8)
            circleMiddle2 = (self.pos[0]*dis + dis -radius*2, self.pos[1]*dis+8)
            pygame.draw.circle(surface, (0,0,0), circleMiddle1, radius)
            pygame.draw.circle(surface, (0,0,0), circleMiddle2, radius)
    
    
class snake(object): #snake object
    body = [] #body of the snake
    turns = {} #list or directory of the positions on which the snake is going to turn

    def __init__(self,color,pos): #initializing snake 
        self.color = color
        self.head = cube(pos) #head of the snake
        self.body.append(self.head)
        self.dirnx = 0 
        self.dirny = 1

    def move(self): #moving the snake
        for event in pygame.event.get(): #waiting for event
            if event.type == pygame.QUIT: #close the game
                pygame.quit()

        keys = pygame.key.get_pressed() 

        for key in keys:
            if keys[pygame.K_LEFT]: #change of direction for the snake on key press
                self.dirnx = -1
                self.dirny = 0
                self.turns[self.head.pos[:]] = [self.dirnx, self.dirny]

            elif keys[pygame.K_RIGHT]:
                self.dirnx = 1
                self.dirny = 0
                self.turns[self.head.pos[:]] = [self.dirnx, self.dirny]

            elif keys[pygame.K_UP]:
                self.dirnx = 0
                self.dirny = -1
                self.turns[self.head.pos[:]] = [self.dirnx, self.dirny]

            elif keys[pygame.K_DOWN]:
                self.dirnx = 0
                self.dirny = 1
                self.turns[self.head.pos[:]] = [self.dirnx, self.dirny]

        for i,c in enumerate(self.body): #changing the direction of whole snake body
            p = c.pos[:]
            if p in self.turns:
                turn = self.turns[p]
                c.dirnx = turn[0]
                c.dirny = turn[1]
                c.pos = (c.pos[0]+c.dirnx, c.pos[1]+c.dirny)
                
                #c.move(turn[0],turn[1])
                if i == len(self.body)-1: #when tail of the snake departs the cell, the directions on  the cell is popped out of the list
                    self.turns.pop(p)
            else: #corner cases for the movement of the snake body
                if c.dirnx == -1 and c.pos[0]<=0: c.pos = (c.rows-1, c.pos[1])
                elif c.dirnx == 1 and c.pos[0]>=c.rows-1: c.pos = (0, c.pos[1])
                elif c.dirny == -1 and c.pos[1]<=0: c.pos = (c.pos[0], c.rows-1)
                elif c.dirny == 1 and c.pos[1]>=c.rows-1: c.pos = (c.pos[0], 0)
                else:
                    c.pos = (c.pos[0]+c.dirnx, c.pos[1]+c.dirny)

    def draw(self, surface): #drawing the snake body
        for i,c in enumerate(self.body):
            if i == 0:
                c.draw(surface,True)
            else:
                c.draw(surface)

    def addCube(self): #adding cube after the snake ate the snack
        last = self.body[-1]
        x,y = last.dirnx,last.dirny

        if x == 1 and y == 0: #cases for the snake body growth direction
            self.body.append(cube((last.pos[0]-1,last.pos[1])))
        elif x == -1 and y == 0:
            self.body.append(cube((last.pos[0]+1,last.pos[1])))
        elif x == 0 and y == 1:
            self.body.append(cube((last.pos[0],last.pos[1]-1)))
        elif x == 0 and y == -1:
            self.body.append(cube((last.pos[0],last.pos[1]+1)))

        self.body[-1].dirnx = x #giving direction to the increamented part of the body
        self.body[-1].dirny = y

    def reset(self, start): #reset function to restart the game
        self.head = cube(start)
        self.body = []
        self.body.append(self.head)
        self.turns = {}
        self.dirnx = 0
        self.dirny = 1
            

def randomSnack(rows, snake): #random snack generator
    snake_pos = snake.body

    while True:
        x = random.randrange(rows)
        y = random.randrange(rows)

        if len(list(filter(lambda a:a.pos == (x,y), snake_pos))): #length of  the list of the filter that gives the positions where the snake and snack both are present so we need to choose another place for the snack
            continue
        else:
            break

    return (x,y)
    

def drawBoard(surface, rows, width): #draws the lines on the game board
    distance = width // rows

    x = 0
    y = 0

    for i in range(rows):
        x = x + distance
        y = y + distance

        pygame.draw.line(surface, (255,255,255), (x,0), (x,width))
        pygame.draw.line(surface, (255,255,255), (0,y), (width,y))

def message_box(subject, content): #message box when you lose
    root = tk.Tk()
    root.attributes("-topmost",True)
    root.withdraw()
    messagebox.showinfo(subject, content)
    try:
        root.destroy() 
    except:
        pass

def main():
    global width, rows, s
    width = 500
    rows = 20
    window = pygame.display.set_mode((width, width))
    s = snake((255,0,0), (10,10)) #snake object
    snack = cube(randomSnack(rows, s), color = (0,255,0)) #snack object
    pygame.display.update()
    flag = True
    clock = pygame.time.Clock()

    while flag:
        pygame.time.delay(50) #delaying every block traversal by 50 ms
        clock.tick(10) #goes less than 10 frames per second, updates time after each block traversal
        s.move()
        if s.body[0].pos == snack.pos: #when snake eats the snack
            s.addCube()
            snack = cube(randomSnack(rows, s), color = (0,255,0))

        if s.body[0].pos in list(map(lambda z:z.pos,s.body[1:])): #list of the mapping of snake body's current positions to check if it collides with the face of the snake
            print("score:",len(s.body))
            message_box('You Lost!','Play Again...')
            s.reset((10,10))
            
        window.fill((0,0,0)) #drawing all the stuff after one iteration of the snake moving loop
        drawBoard(window, rows, width)
        s.draw(window)
        snack.draw(window)
        pygame.display.update()
        
        

main()
