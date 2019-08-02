import os
import pandas as pd
from flask import Flask, render_template, flash, request, redirect, url_for
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = '/uploads'
ALLOWED_EXTENSIONS = {'csv'}

def allowed_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'jcoin_app.sqlite'),
        UPLOAD_FOLDER=UPLOAD_FOLDER,
    )
    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # create the folders when setting up your app
    os.makedirs(os.path.join(app.instance_path, 'csv'), exist_ok=True)

    @app.route('/', methods=['GET', 'POST'])
    def index():
        if request.method == 'POST':
            # check if the post request has the file part
            if 'file' not in request.files:
                flash('No file part')
                return redirect(request.url)
            file = request.files['file']
            # if user does not select file, browser also
            # submit an empty part without filename
            if file.filename == '':
                flash('No selected file')
                return redirect(request.url)
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                pathname = os.path.join(app.instance_path, 'csv', secure_filename(filename))
                file.save(pathname)
                datafile = pd.read_csv(pathname)
                columns = list(datafile)
                data = [list(datafile[d]) for d in columns]
                return render_template("dashboard.html", data=data, columns = columns)
        return render_template("index.html")


    @app.route('/dashboard')
    def dashboard():
        return render_template("dashboard.html")



    @app.route('/jfund')
    def jfund():
        return render_template("jfund.html")

    return app