from routes import db, SQLAlchemy

class User(db.Model):
	__tablename__ = "user"
	id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String(80), unique=True)
	password = db.Column(db.String(30), unique=True)

	def __init__(self, username, message):
	    self.username = username
	    self.message = message

	def __repr__(self):
	    return '<User %r>' % self.username

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    time = db.Column(db.String(20), unique=True)
    message = db.Column(db.String(200), unique=True)

    def __init__(self, time, message):
        self.time = time
        self.message = message

    def __repr__(self):
        return '<Post %r>' % self.message
 