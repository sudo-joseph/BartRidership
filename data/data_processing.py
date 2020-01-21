"""Parse Bart Hourly Ridership Data and save to JSON."""
import pandas as pd
# import glob

# BuisnessDay Calculation from here
# https://stackoverflow.com/a/33480745/12000941
from pandas.tseries.holiday import USFederalHolidayCalendar
from pandas.tseries.offsets import CustomBusinessDay
import copy
import json

us_bd = CustomBusinessDay(calendar=USFederalHolidayCalendar())
colnames = ['date', 'hour', 'orig', 'dest', 'count']
output = {}
# for file in glob.glob('data/*'):
#     print('Processesing file: {} ...'.format(file))
print('Loading Data...')
data = pd.read_csv('data/raw/date-hour-soo-dest-2019.csv.gz', names=colnames)
data['date'] = pd.to_datetime(data['date'])
data.set_index(['date'])

# Aggregate rows by day:
# https://stackoverflow.com/questions/48772271/merging-rows-and-summing-values-by-date-in-python
arrival_data = data.groupby(['date', 'hour', 'dest'],
                            as_index=False,
                            ).agg({'count': 'sum'})
depature_data = data.groupby(['date', 'hour', 'orig'],
                             as_index=False,
                             ).agg({'count': 'sum'})

year = '2019'
months = {'Jan': '01-01',
          'Feb': '02-01',
          'Mar': '03-01',
          'Apr': '04-01',
          'May': '05-01',
          'Jun': '06-01',
          'Jul': '07-01',
          'Aug': '08-01',
          'Sep': '09-01',
          'Oct': '10-01',
          'Nov': '11-01',
          'Dec': '12-01',
          }

stations = list(set(list(data.orig.unique()) + list(data.dest.unique())))
output[year] = copy.deepcopy(months)

for month in months:

    output[year][month] = {stn: {'arriving': None,
                                 'departing': None} for stn in stations}

    # Generate weekday + weekend dataframes for current month
    start = pd.Timestamp('{}-{}'.format(year, months[month])).date()
    end = (pd.Timestamp('{}-{}'.format(year, months[month]))
           + pd.offsets.MonthEnd(0)).date()
    daysOfMonth = pd.date_range(start, end, freq='D')
    weekdays = pd.bdate_range(start, end, freq=us_bd)
    arrival_data_weekday = arrival_data.loc[arrival_data['date'].isin(weekdays)]
    arrival_data_weekend = arrival_data.loc[(~arrival_data['date'].isin(weekdays))
                                            & arrival_data['date'].isin(daysOfMonth)]
    depature_data_weekday = depature_data.loc[depature_data['date'].isin(weekdays)]
    depature_data_weekend = depature_data.loc[(~depature_data['date'].isin(weekdays))
                                               & depature_data['date'].isin(daysOfMonth)]

    for station in stations:

        wd_average_arival_hourly, wd_average_depart_hourly = [], []
        we_average_arival_hourly, we_average_depart_hourly = [], []
        for hour in range(0, 24):
            # weekday average hourly arrival and depature:
            wd_depature_station_df = depature_data_weekday.loc[
                                            (depature_data_weekday['orig'] == station)
                                            & (depature_data_weekday['hour'] == hour)
                                            ]
            wd_arrival_station_df = arrival_data_weekday.loc[
                                            (arrival_data_weekday['dest'] == station)
                                            & (arrival_data_weekday['hour'] == hour)
                                            ]
            weekday_average_arrival = wd_arrival_station_df['count'].mean()
            weekday_average_depature = wd_depature_station_df['count'].mean()
            wd_average_arival_hourly.append(int(weekday_average_arrival))
            wd_average_depart_hourly.append(int(weekday_average_depature))

            we_depature_station_df = depature_data_weekend.loc[
                                            (depature_data_weekend['orig'] == station)
                                            & (depature_data_weekend['hour'] == hour)
                                            ]
            we_arrival_station_df = arrival_data_weekend.loc[
                                            (arrival_data_weekend['dest'] == station)
                                            & (arrival_data_weekend['hour'] == hour)
                                            ]

            we_average_arival_hourly.append(
                                    int(we_arrival_station_df['count'].mean()))
            we_average_depart_hourly.append(
                                    int(we_depature_station_df['count'].mean()))
            print('Calculating Year: {}, Month: {}, Station: {}, Hour: {}'.format(year,month,station,hour))

        output[year][month][station]['arriving'] = {'weekday': wd_average_arival_hourly,
                                                    'weekend': we_average_arival_hourly}
        output[year][month][station]['departing'] = {'weekday': wd_average_depart_hourly,
                                                    'weekend': we_average_depart_hourly}


with open('data/ridership_data.json', 'w') as outfile:
    json.dump(output, outfile)
