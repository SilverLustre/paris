import json

data = [ { 'a' : 1, 'b' : 2, 'c' : 3, 'd' : 4, 'e' : 5 } ]

jdata = json.dumps(data)

print(type(jdata))

print(jdata)
