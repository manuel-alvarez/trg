import pandas as pd

from constants import SHEET_URL, SHEET_NAME

def get_data():
    data = pd.read_csv(f"{ SHEET_URL }/gviz/tq?tqx=out:csv&sheet={ SHEET_NAME }")
    return {
        'results': data.to_dict('records')
    }
