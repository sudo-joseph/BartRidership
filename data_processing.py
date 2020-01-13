"""Parse Bart Hourly Ridership Data and save to CSV."""
import pandas as pd
# import glob
from datetime import datetime, timedelta
from collections import OrderedDict

colnames = ['date', 'hour', 'orig', 'dest', 'count']
output_df = pd.DataFrame(columns=['year',
                                  'station',
                                  'hour',
                                  'start',
                                  'end',
                                  ],
                         index=range(24),
                         )
# index is number of stations times number of hours in day times number of
# years with data.

# output = []
# count = 0
# for file in glob.glob('data/*'):
#     print('Processesing file: {} ...'.format(file))
#     data = pd.read_csv(file, names=colnames)
#     for station in set(list(data.orig.unique()) + list(data.dest.unique())):
#         for hour in range(0, 24):
#             orig_station_df = data.loc[(data['orig'] == station)
#                                        & (data['hour'] == hour)]
#             dest_station_df = data.loc[(data['dest'] == station)
#                                        & (data['hour'] == hour)]
#             output_df.loc[count].year = file[-11:-7]
#             output_df.loc[count].station = station
#             output_df.loc[count].hour = hour
#             output_df.loc[count].start = orig_station_df['count'].sum()
#             output_df.loc[count].end = dest_station_df['count'].sum()
#             output_df.loc[count].total = orig_station_df['count'].sum() \
#                + dest_station_df['count'].sum()
#             count += 1
#
# print(output_df)

count = 0
data = pd.read_csv('data/date-hour-soo-dest-2019.csv.gz', names=colnames)
data.set_index(['date'])
station = 'EMBR'
day = '2019-12-02'
# for station in set(list(data.orig.unique()) + list(data.dest.unique())):


# dates = ["2014-10-10", "2016-01-07"]
# start, end = [datetime.strptime(_, "%Y-%m-%d") for _ in dates]
# OrderedDict(((start + timedelta(_)).strftime(r"%b-%y"), None) for _ in xrange((end - start).days)).keys()

# pd.date_range('2019-12-01', '2019-12-31', freq='D').strftime("%Y-%m-%d").tolist()
# data.loc[data.date.between('2019-12-01', '2019-12-31')]
#

for hour in range(0, 24):
    orig_station_df = data.loc[(data['orig'] == station)
                               & (data['hour'] == hour)
                               & (data['date'] == day)]
    dest_station_df = data.loc[(data['dest'] == station)
                               & (data['hour'] == hour)
                               & (data['date'] == day)]
    output_df.loc[count].year = 2019
    output_df.loc[count].station = station
    output_df.loc[count].hour = hour
    output_df.loc[count].start = orig_station_df['count'].sum()
    output_df.loc[count].end = dest_station_df['count'].sum()
    print(output_df.loc[count])
    count += 1
print(output_df)
