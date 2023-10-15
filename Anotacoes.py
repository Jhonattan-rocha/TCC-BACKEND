import requests 

req = requests.get("https://stgploomescrmprd01.blob.core.windows.net/crm-prd/20210054433B/PDF/23b9aa385ec64bc19adc793c9659afb9.pdf", headers={"Content-Type": "application/json", "User-Key":"5E0A056BC54D46F6420EAA74826AA4E6F085CCBE753326E6E8E3F7BF77686E0AA20F78BA2BD1E78E4BD71A1A20C1DD27D1BDE2974E8EBBCE48F82D27882BCC54"})

with open('./teste.pdf', 'wb') as file:
    file.write(req.content)

