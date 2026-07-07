import urllib.request
import os

os.makedirs('public/logos', exist_ok=True)

banks = {
    'hdfc': 'https://raw.githubusercontent.com/praveenpuglia/indian-banks/main/assets/logos/hdfc/logo.svg',
    'icici': 'https://raw.githubusercontent.com/praveenpuglia/indian-banks/main/assets/logos/icic/logo.svg',
    'axis': 'https://raw.githubusercontent.com/praveenpuglia/indian-banks/main/assets/logos/utib/logo.svg',
    'sbi': 'https://raw.githubusercontent.com/praveenpuglia/indian-banks/main/assets/logos/sbin/logo.svg',
    'yes': 'https://raw.githubusercontent.com/praveenpuglia/indian-banks/main/assets/logos/yesb/logo.svg',
    'kotak': 'https://raw.githubusercontent.com/praveenpuglia/indian-banks/main/assets/logos/kkbk/logo.svg'
}

for name, url in banks.items():
    print(f"Downloading {name}.svg...")
    try:
        urllib.request.urlretrieve(url, f"public/logos/{name}.svg")
        print(f"Success: {name}")
    except Exception as e:
        print(f"Failed: {name} - {e}")
