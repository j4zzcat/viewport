from jinja2 import Environment, PackageLoader, select_autoescape


class GridLayout:
    def __init__(self, rows, columns):
        self.rows = rows
        self.columns = columns

    def render(self, player_urls):
        env = Environment(
            loader=PackageLoader("backend.ui", "templates"),
            autoescape=select_autoescape()
        )

        template = env.get_template("grid.html")
        return template.render(layout=self, player_urls=player_urls)

    def to1fr(self, n):
        return "".join(["1fr " for i in range(n)])
