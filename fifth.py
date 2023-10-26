import pandas_gbq

from constants import PROJECT_ID, DATASET, TABLE_NAME

def get_data():
    sql = f"""
        SELECT direccion, latitud, longitud
        FROM `{ PROJECT_ID }.{ DATASET }.{ TABLE_NAME }`
    """
    data = pandas_gbq.read_gbq(sql, project_id=PROJECT_ID)
    return {
        'results': data.to_dict('records')
    }
