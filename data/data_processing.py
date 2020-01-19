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

    output[year][month] = {station: {'arriving': None, 'departing': None} for station in stations}

    # Generate weekday + weekend dataframes for current month
    start = pd.Timestamp('{}-{}'.format(year, months[month])).date()
    end = (pd.Timestamp('{}-{}'.format(year, months[month]))
           + pd.offsets.MonthEnd(0)).date()
    daysOfMonth = pd.date_range(start, end, freq='D')
    weekdays = pd.bdate_range(start, end, freq=us_bd)
    data_weekday = data.loc[data['date'].isin(weekdays)]
    data_weekend = data.loc[(~data['date'].isin(weekdays))
                            & data['date'].isin(daysOfMonth)]

    for station in stations:

        wd_average_arival_hourly, wd_average_depart_hourly = [], []
        we_average_arival_hourly, we_average_depart_hourly = [], []
        for hour in range(0, 24):

            wd_orig_station_df = data_weekday.loc[
                                            (data_weekday['orig'] == station)
                                            & (data_weekday['hour'] == hour)
                                            ]
            wd_dest_station_df = data_weekday.loc[
                                            (data_weekday['dest'] == station)
                                            & (data_weekday['hour'] == hour)
                                            ]
            weekday_average_arrival = wd_dest_station_df['count'].sum()
            weekday_average_depature = wd_orig_station_df['count'].sum()
            wd_average_arival_hourly.append(int(weekday_average_arrival))
            wd_average_depart_hourly.append(int(weekday_average_depature))


            we_orig_station_df = data_weekday.loc[
                                            (data_weekday['orig'] == station)
                                            & (data_weekday['hour'] == hour)
                                            ]
            we_dest_station_df = data_weekday.loc[
                                            (data_weekday['dest'] == station)
                                            & (data_weekday['hour'] == hour)
                                            ]

            we_average_arival_hourly.append(
                                    int(we_dest_station_df['count'].sum()))
            we_average_depart_hourly.append(
                                    int(we_orig_station_df['count'].sum()))
            print('Calculating Year: {}, Month: {}, Station: {}, Hour: {}'.format(year,month,station,hour))

        output[year][month][station]['arriving'] = {'weekday': wd_average_arival_hourly,
                                                    'weekend': we_average_arival_hourly}
        output[year][month][station]['departing'] = {'weekday': wd_average_depart_hourly,
                                                    'weekend': we_average_depart_hourly}


with open('data/ridership_data.json', 'w') as outfile:
    json.dump(output, outfile)
