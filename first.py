import pandas as pd

def get_data():
    data = pd.read_csv('./data/first.csv')
    return {
        'results': data.to_dict('records')
    }
