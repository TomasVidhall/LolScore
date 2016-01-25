
import urllib
import requests


def get_images_for_league(leagueSlug):
    r = requests.get('http://api.lolesports.com/api/v1/leagues?slug=' + leagueSlug)
    data = r.json()
    tournament = {}
    for tour in data['highlanderTournaments']:
        if 'startDate' in tour:
            tournament = tour
    for league in data['leagues']:
        urllib.urlretrieve(league['logoUrl'],'images/leagues/' + leagueSlug + '.png')

    for team in data['teams']:
        urllib.urlretrieve(team['logoUrl'],'images/teams/' + team['acronym'] + '.png')
        r2 = requests.get('http://api.lolesports.com/api/v1/teams?slug=' + team['slug'] +
        "&tournament=" + tournament['league'])
        data2 = r2.json()
        for player in data2['players']:
            urllib.urlretrieve(player['photoUrl'],'images/players/' + player['name'] + '.png')



get_images_for_league("na-lcs")
get_images_for_league("eu-lcs")
get_images_for_league("lck")
get_images_for_league("lpl-china")
get_images_for_league("lms")
