class GridLayout:
    def __init__(self, rows, columns):
        self.rows = rows
        self.columns = columns

    def render(self):
        rows = "".join(["1fr " for i in range(self.rows)])
        columns = "".join(["1fr " for i in range(self.columns)])

        rendered = """
            display: grid;
            grid-template-rows: {rows};
            grid-template-columns: {columns};
            width: 100%;
            height: 100%;""".format(rows=rows, columns=columns)

        return rendered