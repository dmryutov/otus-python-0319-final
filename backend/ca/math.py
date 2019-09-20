import pandas as pd
import prince


def calculate_correspondence(data, sup_rows=None, sup_cols=None):
    """
    Calculate correspondence analysis

    Args:
        data (list[list[float]]): Input factor data
        sup_rows (list[int]): Supplementary rows indexes
        sup_cols (list[int]): Supplementary columns indexes

    Returns:
        dict: Calculation results
    """
    if sup_rows is None:
        sup_rows = []
    if sup_cols is None:
        sup_cols = []
    # Calculate correspondence
    df = pd.DataFrame(data)
    df2 = df.loc[~df.index.isin(sup_rows), ~df.columns.isin(sup_cols)]
    ca = prince.CA(n_components=min(df2.shape) - 1).fit(df2)
    # Calculate supplementary factors
    sup_row_res, sup_col_res = None, None
    if sup_rows:
        sup_df = df.loc[df.index.isin(sup_rows), ~df.columns.isin(sup_cols)]
        sup_row_res = sup_df.divide(sup_df.sum(axis=1), axis=0) @ ca.V_.T
    if sup_cols:
        sup_df = df.loc[~df.index.isin(sup_rows), df.columns.isin(sup_cols)]
        sup_col_res = sup_df.divide(sup_df.sum(axis=0), axis=1).T @ ca.U_
    # Calculate quality
    rows = pd.concat([ca.row_coordinates(df2), sup_row_res]).sort_index()
    rows2 = rows ** 2
    rows_quality = rows2.divide(rows2.sum(axis=1), axis=0).loc[:, :1].sum(axis=1)
    rows_quality.loc[rows_quality.index.isin(sup_rows)] = 0
    cols = pd.concat([ca.column_coordinates(df2), sup_col_res]).sort_index()
    cols2 = cols ** 2
    cols_quality = cols2.divide(cols2.sum(axis=1), axis=0).loc[:, :1].sum(axis=1)
    cols_quality.loc[cols_quality.index.isin(sup_rows)] = 0
    # Prepare result data
    return {
        'rows': rows.loc[:, :1].values.tolist(),
        'cols': cols.loc[:, :1].values.tolist(),
        'rows_quality': rows_quality.values.tolist(),
        'cols_quality': cols_quality.values.tolist(),
        'explained': [x * 100 for x in ca.explained_inertia_[:2]],
        'eigenvalues': ca.eigenvalues_[:2],
    }
