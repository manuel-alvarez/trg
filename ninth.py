import pandas_gbq
import h3


from constants import PROJECT_ID, DATASET, TABLE_NAME

def h3_group(row):
    return h3.latlng_to_cell(row.latitud, row.longitud, 6)

def normalize_value(row):
    return row['count'] / row['max']

def get_data():
    sql = f"""
        SELECT direccion, latitud, longitud
        FROM `{ PROJECT_ID }.{ DATASET }.{ TABLE_NAME }`
    """
    data = pandas_gbq.read_gbq(sql, project_id=PROJECT_ID)
    data['hex'] = data.apply(h3_group, axis=1)
    data = data.groupby(['hex'])['hex'].agg('count').reset_index(name='count')
    data['max'] = data['count'].max()
    data['value'] = data.apply(normalize_value, axis=1)

    return {
        'results': data.to_dict('records')
    }
