import requests
import pandas as pd
import time

df = pd.read_json('./test.json')['value'].to_list()

for webhook in df:
    request = requests.patch(f"https://api2.ploomes.com/Webhooks({webhook['Id']})", headers = {"Content-Type": "application/json", "User-Key":"5E0A056BC54D46F6420EAA74826AA4E6F085CCBE753326E6E8E3F7BF77686E0AA20F78BA2BD1E78E4BD71A1A20C1DD27D1BDE2974E8EBBCE48F82D27882BCC54"}, json={"Active": 1})
    print(request.text)
    time.sleep(1)
