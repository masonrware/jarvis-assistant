from optparse import TitledHelpFormatter
from tracemalloc import start
from flask import Flask, render_template, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import datetime
from flask_marshmallow import Marshmallow

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:plat4life@localhost/jarvisDB'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)


# TASKS SECTION:

class Articles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    body = db.Column(db.Text())
    date = db.Column(db.DateTime, default=datetime.datetime.now)

    def __init__(self, title, body):
        self.title = title
        self.body = body


class ArticleSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'body', 'date')


article_schema = ArticleSchema()
articles_schema = ArticleSchema(many=True)


@app.route('/get', methods=['GET'])
def get_articles():
    all_articles = Articles.query.all()
    result = articles_schema.dump(all_articles)
    return jsonify(result)


@app.route('/get/<id>/', methods=['GET'])
def post_details(id):
    article = Articles.query.get(id)
    return article_schema.jsonify(article)


@app.route('/add', methods=['POST'])
def add_article():
    title = request.json['title']
    body = request.json['body']

    articles = Articles(title, body)
    db.session.add(articles)
    db.session.commit()
    return article_schema.jsonify(articles)


@app.route('/update/<id>/', methods=['PUT'])
def update_article(id):
    article = Articles.query.get(id)

    title = request.json['title']
    body = request.json['body']
    article.title = title
    article.body = body

    db.session.commit()
    return article_schema.jsonify(article)


@app.route('/delete/<id>/', methods=['DELETE'])
def article_delete(id):
    article = Articles.query.get(id)

    db.session.delete(article)
    db.session.commit()
    return article_schema.jsonify(article)


# COURSE SECTION:

class Courses(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    days = db.Column(db.String(100))
    start_time = db.Column(db.String(100))
    end_time = db.Column(db.String(100))

    def __init__(self, name, days, start_time, end_time):
        self.name = name
        self.days = days
        self.start_time = start_time
        self.end_time = end_time


class CourseSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'days', 'start_time', 'end_time')


course_schema = CourseSchema()
courses_schema = CourseSchema(many=True)


@app.route('/getCourse/', methods=['GET'])
def get_courses():
    all_courses = Courses.query.all()
    result = courses_schema.dump(all_courses)
    return jsonify(result)


@app.route('/getCourse/<id>/', methods=['GET'])
def course_details(id):
    course = Courses.query.get(id)
    return course_schema.jsonify(course)


@app.route('/addCourse/', methods=['POST'])
def add_course():
    name = request.json['name']
    days = str(request.json['days'])
    start_time = request.json['start_time']
    end_time = request.json['end_time']

    course = Courses(name, days, start_time, end_time)
    db.session.add(course)
    db.session.commit()
    return course_schema.jsonify(course)


@app.route('/updateCourse/<id>/', methods=['PUT'])
def update_course(id):
    course = Courses.query.get(id)

    name = request.json['name']
    days = request.json['days']
    start_time = request.json['start_time']
    end_time = request.json['end_time']

    course.name = name
    course.days = days
    course.start_time = start_time
    course.end_time = end_time

    db.session.commit()
    return article_schema.jsonify(course)


@app.route('/deleteCourse/<id>/', methods=['DELETE'])
def course_delete(id):
    course = Courses.query.get(id)

    db.session.delete(course)
    db.session.commit()
    return article_schema.jsonify(course)


if __name__ == '__main__':
    app.run(host='localhost', debug=True)
