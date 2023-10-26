import pandas_gbq
import s2cell

from constants import PROJECT_ID, DATASET, TABLE_NAME


def tokenize(row):
    token = s2cell.cell_id_to_token(int(row.cellId))
    return token

def get_data():
    sql = f"""
        WITH S2cells AS
        (SELECT S2_CELLIDFROMPOINT(ST_GEOGPOINT(longitud, latitud), 10) AS cellId
            FROM `{ PROJECT_ID }.{ DATASET }.{ TABLE_NAME }`),
        totals AS 
        (SELECT cellId, COUNT(*) AS count
        FROM S2cells
        GROUP BY cellId)
        SELECT cellId, count / (MAX(count) OVER ()) AS value, count
        FROM totals
    """
    data = pandas_gbq.read_gbq(sql, project_id=PROJECT_ID)
    data['token'] = data.apply(tokenize, axis=1)
    return {
        'results': data.to_dict('records')
    }
