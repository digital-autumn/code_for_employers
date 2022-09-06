import asyncio
import sqlite3
import json
import tornado.web
import tornado.escape
import server_helper
import database_manager

port: int = 3000
db_manager = database_manager.DatabaseManager()


class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("<h1>aWeber Assesesment</h1>")


class CreateWidgetHandler(tornado.web.RequestHandler):
    def post(self):
        conn = db_manager.open_conn()
        c = conn.cursor()

        req_body: object = tornado.escape.json_decode(self.request.body)

        if not server_helper.req_body_exist(req_body) and len(req_body) != 3:
            self.set_status(400)
            self.write('No body was sent')

        id: str = str(req_body['id'])
        name: str = str(req_body['name'])
        num_of_parts: int = int(req_body['num_of_parts'])
        created_date: str = db_manager.date_formatted()
        modified_date: str = None

        try:
            c.execute("""INSERT INTO widgets(id, name,
                      num_of_parts, created_date, modified_date)
                      VALUES('{}', '{}', '{}', '{}', '{}');"""
                      .format(id, name, num_of_parts,
                              created_date, modified_date))

            self.write('Widget was successfully created')
            conn.commit()
            c.close()

        except sqlite3.Error as e:
            self.write(f'Error creating a widget in the database: {e}')


class ReadWidgetHandler(tornado.web.RequestHandler):
    def get(self):
        conn = db_manager.open_conn()
        c = conn.cursor()

        req_body: object = tornado.escape.json_decode(self.request.body)

        if not server_helper.req_body_exist(req_body) and len(req_body) != 1:
            self.set_status(400)
            self.write('No body was sent')

        id: str = str(req_body['id'])

        try:
            c.execute("SELECT * FROM widgets WHERE id='{}';".format(id))

        except sqlite3.Error as e:
            self.set_status(404)
            self.write(f'Error reading from database: {e}')

        converted_to_json = json.dumps(c.fetchall())
        self.write(converted_to_json)
        c.close()


class UpdateWidgetHandler(tornado.web.RequestHandler):
    def put(self):
        conn = db_manager.open_conn()
        c = conn.cursor()

        req_body: object = tornado.escape.json_decode(self.request.body)

        if not server_helper.req_body_exist(req_body) and len(req_body) != 3:
            self.set_status(400)
            self.write('No body was sent')

        id: str = str(req_body['id'])
        name: str = str(req_body['name'])
        num_of_parts: int = int(req_body['num_of_parts'])

        try:
            c.execute(""""UPDATE widgets SET name='{}', num_of_parts='{}',
                      modified_date='{}' WHERE id='{}';"""
                      .format(
                              name, num_of_parts, db_manager.date_formatted(),
                              id))
            self.write('Widget was sucessfully updated')
            conn.commit()
            c.close()
        except sqlite3.Error as e:
            self.write(f'Error updating database: {e}')


class ListWidgetsHandler(tornado.web.RequestHandler):
    def get(self):
        conn = db_manager.open_conn()
        c = conn.cursor()

        req_body: object = tornado.escape.json_decode(self.request.body)

        if not server_helper.req_body_exist(req_body) and len(req_body) != 1:
            self.set_status(400)
            self.write('No body was sent')

        num_of_parts: int = int(req_body['num_of_parts'])

        try:
            c.execute("SELECT * FROM widgets WHERE num_of_parts='{}';"
                      .format(num_of_parts))

        except sqlite3.Error as e:
            self.write(f'Could not get a list of widgets: {e}')

        converted_to_json = json.dumps(c.fetchall())
        self.write(converted_to_json)
        c.close()


class DeleteWidgetHandler(tornado.web.RequestHandler):
    def delete(self):
        conn = db_manager.open_conn()
        c = conn.cursor()

        req_body: object = tornado.escape.json_decode(self.request.body)

        if not server_helper.req_body_exist(req_body) and len(req_body) != 1:
            self.set_status(400)
            self.write('No body was sent')

        id: str = str(req_body['id'])

        try:
            c.execute("DELETE FROM widgets WHERE id='{}';".format(id))
            self.write('Widget was sucessfully deleted')
            conn.commit()
            c.close()

        except sqlite3.Error as e:
            self.write(f'Error, widget was not successfully deleted: {e}')


def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
        (r"/create_widget", CreateWidgetHandler),
        (r"/get_widget", ReadWidgetHandler),
        (r"/update_widget", UpdateWidgetHandler),
        (r"/get_list_of_widgets", ListWidgetsHandler),
        (r"/delete_widget", DeleteWidgetHandler)
    ])


async def main():
    app = make_app()
    app.listen(port)
    await asyncio.Event().wait()

if __name__ == "__main__":
    asyncio.run(main())