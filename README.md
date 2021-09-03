# NODE-Martian-Robots
OBJECTIVE:
This code solves a problem of moving agents that must follow a series of commands on a board of limited area.
When the agent has executed all the commands it must indicate the coordinate where it is located and the direction to which it is pointing.
But in case the agent has left the limits of the board, it must indicate which was the last coordinate in which it was and the direction to which it was pointing in the movement before it crossed the limits, accompanied by the message "LOST". In addition, the agent must leave a message for the following agents warning them not to perform the same action that made him leave the board and, if it is among the instructions of the new agent, to ignore it.

INPUT:
In the first line of the input we specify the coordinate of the upper right corner, being the coordinate (0,0) the lower left corner, with this we can set the board where the agents move.
Then we introduce as many lines as agents we want to test, always appearing in pairs:
- First we indicate the initial coordinate of the agent on the board and the direction to which it points.
- Second, the sequence of actions to be performed is indicated, being the possible actions:
  * "L": turn left
  * "R": turn right
  * "F": move forward one square in the direction to which it points.

EXAMPLE OF USE:
Input
5 3
1 1 E
RFRFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFLFLFLFL
Output
1 1 E
3 3 N LOST
2 3 S

CODE EXECUTION:

Translated with www.DeepL.com/Translator (free version)
