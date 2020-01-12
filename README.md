# Bart Ridership Data Visualization
This project aims to visualize the delta between passengers arriving at leaving
at each station over the course of a 24 hour period. Initial visualization will
be done for Embaracdero station over the December, 2019. Once basic proof of
concept is established, additional work will be completed to determine this
delta for all available ridership data.


## Data Source:
Bart provides various ridership data in .xlsx format. Data containing hourly
trips between station pairs has been downloaded and is available in the data
directory of this repo. Original data data can be found here:
 * [Bart Ridership Reports](https://www.bart.gov/about/reports/ridership)
 * [Hourly Ridership by Origin-Destination Pairs](http://64.111.127.166/origin-destination/)

## Data Visualization
Data will be visualized with a Mirror Bar Chart to determine arrival and
departure imbalance at each station. The x-axis of this chart will be the hour
of the day, with the arrival and departure totals on the y-axis. Bars will be
used allow for comparison of passengers arriving and leaving the chosen station
hour by hour.
