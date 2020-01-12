"""Parse Bart Hourly Ridership Data and save to CSV."""
import pandas as pd
import glob


colnames = ['date', 'hour', 'orig', 'dest', 'count']
output_df = pd.DataFrame(columns=['year',
                                  'station',
                                  'hour',
                                  'start',
                                  'end',
                                  'total',
                                  ],
                         index=range(47*24*9),
                         )
# index is number of stations times number of hours in day times number of
# years with data.

# output = []
count = 0
for file in glob.glob('data/*'):
    print('Processesing file: {} ...'.format(file))
    data = pd.read_csv(file, names=colnames)
    for station in set(list(data.orig.unique()) + list(data.dest.unique())):
        for hour in range(0, 24):
            orig_station_df = data.loc[(data['orig'] == station)
                                       & (data['hour'] == hour)]
            dest_station_df = data.loc[(data['dest'] == station)
                                       & (data['hour'] == hour)]
            output_df.loc[count].year = file[-11:-7]
            output_df.loc[count].station = station
            output_df.loc[count].hour = hour
            output_df.loc[count].start = orig_station_df['count'].sum()
            output_df.loc[count].end = dest_station_df['count'].sum()
            output_df.loc[count].total = orig_station_df['count'].sum() + dest_station_df['count'].sum()
            count += 1

print(output_df)
