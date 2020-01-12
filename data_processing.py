import pandas as pd
import glob


colnames = ['date', 'hour', 'orig', 'dest', 'count']
for file in glob.glob('data/*'):
    data = pd.read_csv(file, names=colnames)
    print(data.head)
    break
