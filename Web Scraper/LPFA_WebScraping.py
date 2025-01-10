from bs4 import BeautifulSoup
import pandas as pd
import requests
import time
from io import StringIO

all_teams = []

base_url = "https://fbref.com"
html = requests.get(f"{base_url}/en/comps/21/Liga-Profesional-Argentina-Stats").text
soup = BeautifulSoup(html, 'lxml')
table = soup.find_all('table', class_='stats_table')[0]

links = [l.get("href") for l in table.find_all('a')]
links = [l for l in links if '/squads/' in l]

team_urls = [f"{base_url}{l}" for l in links]

for team_url in team_urls:
    team_name = team_url.split("/")[-1].replace("-Stats", "")
    print(f"Fetching data for {team_name}")
    
    try:
        data = requests.get(team_url).text
        soup = BeautifulSoup(data, 'lxml')
        
        stats_tables = soup.find_all('table', class_='stats_table')
        if not stats_tables:
            print(f"No stats table found for {team_name}")
            continue
        
        stats = stats_tables[0]

        cleaned_html = str(stats).replace(',','-')

        team_data = pd.read_html(StringIO(cleaned_html))[0]
        team_data["Team"] = team_name
        all_teams.append(team_data)
    except Exception as e:
        print(f"Error fetching data for {team_name}: {e}")
    
    time.sleep(5)

if all_teams:
    stat_df = pd.concat(all_teams)
    stat_df.to_csv("LPFA_stats.csv", index=False)
    print("Data saved to stats.csv")
else:
    print("No data was collected.")
