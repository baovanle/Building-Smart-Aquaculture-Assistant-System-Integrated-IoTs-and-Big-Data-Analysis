from fastapi import FastAPI, HTTPException, File, UploadFile, Form, Response, Request, Header
from fastapi.encoders import jsonable_encoder
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from fastapi.responses import JSONResponse, UJSONResponse, FileResponse
from dateutil.relativedelta import relativedelta
from functools import reduce
import openpyxl
from openpyxl.utils import range_boundaries
import random
from calendar import monthrange
from typing import List, Optional, Union
import traceback
from fastapi import FastAPI
from pydantic import BaseModel

from configparser import ConfigParser
import psycopg2
import pandas as pd

from datetime import datetime

from pytz import timezone


import traceback
from requests.auth import HTTPDigestAuth

import uvicorn

app = FastAPI()

origins = [    
    "https://hr.ailab.vn:3008",
    "https://hr.ailab.vn",
    "https://edu.ailab.vn:3010",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

hostname = 'edu.ailab.vn'                                                                          

def config(filename='config.ini', section='aiaqua'):
    # create a parser
    parser = ConfigParser()
    # read config file
    parser.read(filename)
    # print(Path(os.path.dirname(os.path.realpath(__file__)) + '/' + filename))
    # get section, default to postgresql
    db = {}
    if parser.has_section(section):
        params = parser.items(section)
        for param in params:
            db[param[0]] = param[1]
    else:
        raise Exception(
            'Section {0} not found in the {1} file'.format(section, filename))
    return db


@app.post("/mobile/fetchPE")
def fetch_fe():
    params = config()
    conn = psycopg2.connect(**params)
    cursor = conn.cursor()    

    tz = timezone('Asia/Ho_chi_Minh')
    loc_dt = tz.localize(datetime.now())
    created_date = loc_dt.strftime("%Y-%m-%d %H:%M:%S")
    snapshot_date = loc_dt.strftime("%Y-%m-%d")

    sql = """
        select * from sensor_data
        limit 50
    """

    df_sql = pd.read_sql(sql, conn)
    
    response_json = df_sql.to_dict('records')
    return response_json

if __name__ == "__main__":
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=5013,        
        )
