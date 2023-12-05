file = open('data.txt', 'r')
data = [line for line in file]

def part1(mass):
  return  max(0, mass // 3 - 2)

def part2(mass):
  fuel = part1(mass)
  return fuel if fuel < 9 else fuel + part2(fuel)

print("Part 1: %d" % (sum([part1(int(line)) for line in data])))
print("Part 2: %d" % (sum([part2(int(line)) for line in data])))