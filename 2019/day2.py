from functools import reduce

class Computer():
  def __init__(self, debug):
    self.debug = debug
    self.opcodes = {
      1: [Computer.add, 4],
      2: [Computer.multiply, 4]
    }

  def init(self, program):
    self.memory = [int(code) for code in program]
    self.ip = 0

  def run(self):
    while self.memory[self.ip] != 99:
      operation = self.opcodes[self.memory[self.ip]]
      outputRegister = self.getValue(self.ip+(operation[1]-1))
      params = [self.getByRef(self.ip+i) for i in range(1, operation[1]-1)]

      if self.debug:
        op = "computer.memory[%s] = %s(%s)" % (outputRegister, operation[0], params)
        print(op)

      computer.memory[outputRegister] = operation[0](params)
      self.ip += operation[1]

  def getByRef(self, address):
    return self.getValue(self.memory[address])

  def getValue(self, address):
    return self.memory[address]

  def getOutput(self):
    return self.getValue(0)

  def add(params):
    return sum(params)

  def multiply(params):
    return reduce(lambda x, y : x * y, params)

lines = [line for line in open('data.txt', 'r')]
computer = Computer(debug=False)
program = lines[0].split(',')

for i in [m for m in range(99)]:
  for j in [n for n in range(99)]:
    program[1] = str(i)
    program[2] = str(j)
    
    computer.init(program)
    computer.run()
    output = computer.getOutput()

    if [i,j] == [12,2] or output == 19690720:
      print("(%d, %d) -> Output: %s" % (i, j, output))

