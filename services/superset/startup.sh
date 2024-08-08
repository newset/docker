#!/bin/sh

pip install -i https://pypi.tuna.tsinghua.edu.cn/simple clickhouse-connect

# create admin account
superset fab create-admin \
  --username admin \
  --firstname Superset \
  --lastname Admin \
  --email admin@superset.com \
  --password admin​
# upgrade database
superset db upgrade

# load examples
#superset load_examples​
# set up roles
superset init
