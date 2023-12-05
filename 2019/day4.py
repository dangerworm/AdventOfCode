part1ValidNumbers = []
doubledNumbers = {}

for i in range(128392, 643282):
  isValid = True
  for a, b in zip(str(i)[:-1], str(i)[1:]):
      if a > b:
        isValid = False

  if not isValid:
    continue

  isValid = False
  for a, b in zip(str(i)[:-1], str(i)[1:]):
    if a == b:
      isValid = True
      if i in doubledNumbers.keys():
        doubledNumbers[i].append(a)
      else:
        doubledNumbers[i] = [a]

  if isValid:
    part1ValidNumbers.append(i)

print(len(part1ValidNumbers))

part2ValidNumbers = []
for i in part1ValidNumbers:
  doubledNumbers[i] = list(set(doubledNumbers[i]))
  doubledNumbersCopy = [n for n in doubledNumbers[i]]

  for double in doubledNumbersCopy:
    for a, b, c in zip(str(i)[:-2], str(i)[1:-1], str(i)[2:]):
      if a == double and a == b and b == c:
        doubledNumbers[i].remove(double)
        break

  if len(doubledNumbers[i]) > 0:
    part2ValidNumbers.append(i)

print(len(part2ValidNumbers))
