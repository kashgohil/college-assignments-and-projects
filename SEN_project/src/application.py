#!/usr/bin/env python3
from flask import Flask, jsonify, request, render_template, url_for, request, redirect, session,make_response
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from flask_cors import CORS
import pymongo
import bcrypt
from functools import wraps
from flask import Flask
from flask_jwt import JWT, jwt_required, current_identity
from werkzeug.security import safe_str_cmp
import smtplib
from flask_mail import Mail, Message
from flask import jsonify
from bson import json_util
import json
from bson import ObjectId
from operator import itemgetter
from result import fn
from datetime import datetime

app = Flask(__name__)
CORS(app)

app.config['MONGO_DBNAME']= 'mycv'
#app.config['MONGO_URI'] = 'mongodb+srv://sanjay:Sanjay123$@cluster0-g2uod.mongodb.net/test?retryWrites=true'
app.config['MONGO_URI'] = 'mongodb+srv://sanjay:Sanjay123$@cluster0-g2uod.mongodb.net/mycv?retryWrites=true'

mongo = PyMongo(app)

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("email") is None:
            return redirect(url_for("login", next=request.url))
        return f(*args, **kwargs)
    return decorated_function


@app.route('/', methods=['GET', 'POST'])
def index():
	return 'hello sanjay'
    #return render_template('index.html')

@app.route('/loginadmin', methods=['GET', 'POST'])
def login_admin():
    if (request.get_json()['emailid']=='sanjay'):
        if (request.get_json()['password']=='kuniya'):
            session['emailid'] = 'sanjay'
            return 'true'
    return 'false'

@app.route('/login', methods=['GET','POST'])
def login():
    if request.method == 'POST': 
        users = mongo.db.users
        login_user = users.find_one({'emailid' : request.get_json()['emailid']})
        if login_user:
            if (request.get_json()['password'] == login_user['password']):
                session['emailid'] = request.get_json()['emailid']
                return 'hello sir'
            else :
                return 'Password is wrong'
    return 'try again'

@app.route('/register', methods=['POST', 'GET'])
def signup():
    if request.method == 'POST':
        users = mongo.db.users
        existing_user = users.find_one({'emailid' : request.get_json()['emailid']})
        if existing_user is None:
            hashpass=(request.get_json()['password'])
            users.insert({'name' : request.get_json()['name'],
            'emailid' : request.get_json()['emailid'], 'password' : hashpass
            })
            session['emailid'] = request.get_json()['emailid']
            return 'successfully created an account'
        return 'That Account already exists!'
    return 'try one more time'

@app.route('/list', methods=['POST', 'GET'])
def list():
    if request.method == 'POST':
        users = mongo.db.result
        row = []
        existing_user = users.find({'job_id' : int(request.get_json()['job_id'])},{'_id':0,'emailid':1}).sort('testmarks',-1)
        for i in existing_user:
            row.append(i['emailid'])
        print(row)
        return jsonify(row)
    return 'try one more time'

@app.route('/upload', methods=['GET','POST'])
def upload():
    if request.method == 'POST': 
        users = mongo.db.cvs
        login_user = users.find_one({'emailid' : session['emailid']})
        if login_user is None:
            users.insert({'emailid': session['emailid'],'cvurl': request.get_json()['cvurl']})
            return 'cv uploaded'
        else:
            users.update({'emailid': session['emailid']},{'emailid': session['emailid'],'cvurl': request.get_json()['cvurl']})
            return 'cv updated'
    return 'try again'

global times
times = 1
@app.route("/postajob", methods=['POST', 'GET'])
def postajob():
    global times
    if request.method == 'POST':
        users = mongo.db.jobs
        users.insert({'job_id' : times,'title': request.get_json()['title'],'hires': request.get_json()['hires'],
        'cpi' : request.get_json()['cpi'],'salary' : request.get_json()['salary'],'experience': request.get_json()['experience'],
        'work' : request.get_json()['work'],'perks': request.get_json()['perks'],
        'wskills': request.get_json()['wskills'],'wcpi': request.get_json()['wcpi'],'wtest': request.get_json()['wtest'],
        'wexperience': request.get_json()['wexperience'],'deadline': request.get_json()['deadline'],'skills' : request.get_json()['skills'],
        'startdate' : request.get_json()['startdate'],'starttime' : request.get_json()['starttime'],
        'enddate' : request.get_json()['enddate'],'endtime' : request.get_json()['endtime'],'addedon' : request.get_json()['addedon'],
        'applicants' : 0, 'numberofque' : 0
        })
        #postajobreq(request.get_json()['skills'])
        times = times + 1
        return 'job posted'
    return 'nothing'

@app.route("/addquestion", methods=['POST', 'GET'])
def postaque():
    temp = request.get_json()['job_id']
    if request.method == 'POST':
        users = mongo.db.testque
        jobs = mongo.db.jobs
        jobid = jobs.find_one({'job_id' : int(temp)})
        temp1 = int(jobid['numberofque'])+1
        users.insert({'job_id' : int(request.get_json()['job_id']),'question_no': temp1,'question' : request.get_json()['question'],'option_a': request.get_json()['option_a'],
        'option_b': request.get_json()['option_b'],'option_c': request.get_json()['option_c'],'option_d': request.get_json()['option_d'],'right_answer': request.get_json()['right_answer']
        })
        jobs.update({'job_id' : int(temp)},{'job_id' : int(temp),'title': jobid['title'],'hires': jobid['hires'],
        'cpi' : jobid['cpi'],'salary' : jobid['salary'],'experience': jobid['experience'],
        'work' : jobid['work'],'perks': jobid['perks'],
        'wskills': jobid['wskills'],'wcpi': jobid['wcpi'],'wtest': jobid['wtest'],
        'wexperience': jobid['wexperience'],'deadline': jobid['deadline'],'skills' : jobid['skills'],
        'startdate' : jobid['startdate'],'starttime' : jobid['starttime'],'addedon' : jobid['addedon'],
        'enddate' : jobid['enddate'],'endtime' : jobid['endtime'],'numberofque' : temp1,
        'applicants' : jobid['applicants']
        })
        return 'question added'
    return 'nothing'

@app.route('/details', methods=['POST', 'GET'])
@login_required
def details():
    users = mongo.db.users
    e = session['emailid']
    existing_user = users.find_one({'emailid' : e},{'_id' : 0})
    if(request.method == 'POST'):
        users.update({'emailid': e},{'name' : existing_user['name'],
            'emailid' : existing_user['emailid'],'password' : request.get_json()['password']})
        return  'Details Successfully updated.'

@app.route('/edit', methods=['POST', 'GET'])
@login_required
def edit():
    rows = []
    users = mongo.db.jobs
    e = request.get_json()['job_id']
    existing_user = users.find({'job_id' : int(e)},{"_id": 0,'job_id' : 1,'title': 1,'hires': 1,
        'cpi' : 1,'salary' : 1,'experience': 1,
        'work' : 1,'perks': 1,'wskills': 1,'wcpi': 1,'wtest': 1,'wexperience': 1,'deadline': 1,'skills' : 1,
        'startdate' : 1,'starttime' : 1,'enddate' : 1,'endtime' : 1,'addedon' : 1,'applicants' : 1, 'numberofque' : 1})
    if(request.method == 'GET'):
        for i in existing_user:
            rows.append(i)
        return jsonify(rows)
    elif(request.method == 'POST'):
        existing = users.find_one({'job_id' : int(e)})
        users.update({'job_id': int(e)},{'job_id' : times,'title': request.get_json()['title'],'hires': request.get_json()['hires'],
        'cpi' : request.get_json()['cpi'],'salary' : request.get_json()['salary'],'experience': request.get_json()['experience'],
        'work' : request.get_json()['work'],'perks': request.get_json()['perks'],
        'wskills': request.get_json()['wskills'],'wcpi': request.get_json()['wcpi'],'wtest': request.get_json()['wtest'],
        'wexperience': request.get_json()['wexperience'],'deadline': request.get_json()['deadline'],'skills' : request.get_json()['skills'],
        'startdate' : request.get_json()['startdate'],'starttime' : request.get_json()['starttime'],
        'enddate' : request.get_json()['enddate'],'endtime' : request.get_json()['endtime'],'addedon' : request.get_json()['addedon'],
        'applicants' : existing['applicants'], 'numberofque' : existing['numberofque']})
        return  'Details Successfully updated.'


@app.route('/jobs', methods=['POST', 'GET'])
def getjobs():
    jobs = mongo.db.jobs
    rows = []
    if request.method =='GET':
        existing_user = jobs.find({},{'_id' : 0,'job_id': 1,'title': 1,'addedon' : 1,'deadline' : 1,'applicants':1})
        for i in existing_user:
            rows.append(i)
        print(rows)
        return jsonify(rows)
    return 'sorry for inconvience'

@app.route('/jobsc', methods=['POST', 'GET'])
def getjobsc():
    joba = mongo.db.jobapplications
    jobs = mongo.db.jobs
    existing_user = joba.find({'app_emailid' : request.get_json()['emailid']},{'_id' : 0,'job_id': 1})
    rows = []
    row = []
    for i in existing_user:
            rows.append(i)
    print(rows)
    if request.method =='GET':
        for i in rows:
            existing_users = jobs.find_one({'job_id': i['job_id']},{'_id' : 0,'job_id': 1,'title': 1,'startdate' : 1,'endtime':1,'starttime':1,'enddate':1,'deadline':1,'salary':1})
            row.append(existing_users)
        print(row)
        return jsonify(row)
    return 'sorry for inconvience'

@app.route('/number', methods=['POST', 'GET'])
def number():
    joba = mongo.db.jobs
    existing = joba.find_one({'job_id': int(request.get_json()['job_id'])},{'_id':0,'numberofque':1})
    return jsonify(existing)

@app.route('/viewtest', methods=['POST', 'GET'])
def viewtest():
    jobs = mongo.db.jobs
    rows = []
    if request.method =='GET':
        existing_user = jobs.find({},{'_id' : 0,'job_id': 1,'title': 1,'starttime' : 1,'endtime' : 1,'startdate':1,'enddate':1,'applicants':1,'numberofque':1})
        for i in existing_user:
            rows.append(i)
        print(rows)
        return jsonify(rows)
    return 'sorry for inconvience'

@app.route('/viewtestque', methods=['POST', 'GET'])
def viewtestque():
    jobs = mongo.db.testque
    rows = []
    if request.method =='GET':
        temp = request.get_json()['job_id']
        existing_user = jobs.find({'job_id': int(temp)},{'_id' : 0,'question_no': 1,'question': 1,'option_a': 1,'option_b' : 1,'option_c' : 1,'option_d':1,'right_answer':1})
        for i in existing_user:
            rows.append(i)
        return jsonify(rows)
    return 'sorry for inconvience'

@app.route('/editque', methods=['POST', 'GET'])
@login_required
def editque():
    rows = []
    users = mongo.db.testque
    e = request.get_json()['job_id']
    f = request.get_json()['question_no']
    existing_user = users.find({'job_id' : e, 'question_no' : int(f)},{'_id' : 0,'question_no': 1,'question': 1,'option_a': 1,'option_b' : 1,'option_c' : 1,'option_d':1,'right_answer':1})
    if(request.method == 'GET'):
        for i in existing_user:
            rows.append(i) 
        print(rows)
        return jsonify(rows)
    elif(request.method == 'POST'):
        users.update({'job_id': e,'question_no': int(f)},{'job_id' : e,'question_no' : f,'question' : request.get_json()['question'],'option_a': request.get_json()['option_a'],
        'option_b': request.get_json()['option_b'],'option_c': request.get_json()['option_c'],'option_d': request.get_json()['option_d'],'right_answer': request.get_json()['right_answer']})
        return  'Details Successfully updated.'

@app.route("/deleteque", methods=['POST', 'GET'])
def deleteque():
    temp = request.get_json()['job_id']
    if request.method == 'POST':
        users = mongo.db.testque
        jobs = mongo.db.jobs
        jobid = jobs.find_one({'job_id' : int(temp)})
        temp1 = int(request.get_json()['question_no'])
        questions = users.find({'job_id' : int(temp)})
        print(questions)
        for i in questions:
            if (i['question_no']>temp1):
                #print(i['question_no'])
                users.update({'job_id': int(temp),'question_no': int(i['question_no'])},{'job_id' : int(temp),'question_no' : int(i['question_no'])-1,'question' : i['question'],'option_a': i['option_a'],
                'option_b': i['option_b'],'option_c': i['option_c'],'option_d': i['option_d'],'right_answer': i['right_answer']})
        jobs.update({'job_id' : int(temp)},{'job_id' : int(temp),'title': jobid['title'],'hires': jobid['hires'],
        'cpi' : jobid['cpi'],'salary' : jobid['salary'],'experience': jobid['experience'],
        'work' : jobid['work'],'perks': jobid['perks'],
        'wskills': jobid['wskills'],'wcpi': jobid['wcpi'],'wtest': jobid['wtest'],
        'wexperience': jobid['wexperience'],'deadline': jobid['deadline'],'skills' : jobid['skills'],
        'startdate' : jobid['startdate'],'starttime' : jobid['starttime'],'addedon' : jobid['addedon'],
        'enddate' : jobid['enddate'],'endtime' : jobid['endtime'],'numberofque' : int(jobid['numberofque'])-1,
        'applicants' : jobid['applicants']
        })
        users.delete_one({'job_id' : int(temp),'question_no': temp1})
        return 'question deleted'
    return 'nothing'

@app.route('/viewtestquec', methods=['POST', 'GET'])
def viewtestquec():
    jobs = mongo.db.testque
    rows = []
    joba = mongo.db.jobapplications
    temp = request.get_json()['job_id']
    existing = joba.find_one({'job_id' : int(temp),'app_emailid' : session['emailid']})
    job = mongo.db.jobs
    empty = job.find_one({'job_id': int(temp)})
    print(empty['startdate'])
    datetime_object1 = datetime.strptime(empty['startdate'], '%b %d %Y %I:%M%p')
    if now.strftime()>datetime_object1:
        print(1)
    if request.method =='GET' and existing is not None:
        existing_user = jobs.find({'job_id': temp},{'_id' : 0,'question_no': 1,'question': 1,'option_a': 1,'option_b' : 1,'option_c' : 1,'option_d':1})
        for i in existing_user:
            rows.append(i)
        return jsonify(rows)
    return 'sorry for inconvience'

@app.route('/submit1', methods=['POST', 'GET'])
def submit1():
    jobs = mongo.db.testque
    a = mongo.db.attemp
    result = mongo.db.results
    if request.method =='POST':
        temp = request.get_json()['job_id']
        s = request.get_json()['answer']
        attemp = a.find_one({'job_id': int(temp), 'emailid' : session['emailid']})
        answer = jobs.find({ 'job_id': int(temp)},{'_id' : 0,'question_no':1,'right_answer':1})
        count =0
        if attemp is None:
            for i in s:
                for j in answer:
                    if (i['ques_no']==j['question_no'] and i['answer']==j['right_answer']):
                        count = count + 1
            a.insert({'job_id': int(temp), 'emailid' : session['emailid']})
            skill = mongo.db.skills
            existing = skill.find_one({'emailid': session['emailid']},{'_id':0,'skillmarks':1,'cpi':1})
            jobaa = mongo.db.jobs
            existing_user = jobaa.find_one({'job_id': int(temp)})
            total = count*int(existing_user['wtest']) + int(existing['skillmarks'])*int(existing_user['wskills']) + int(existing['cpi'])*int(existing_user['wcpi'])
            result.insert({'job_id': int(temp), 'emailid' : session['emailid'], 'testmarks': total})
            return 'test done'
        return 'you have already tried this test'
    return 'nothing'

@app.route('/view', methods=['POST', 'GET'])
def view():
    jobs = mongo.db.jobs
    rows = []
    if request.method =='GET' or request.mathod == 'POST':
        existing_user = jobs.find({'job_id': int(request.get_json()['job_id'])},{'_id' : 0})
        #print(existing_user)
        for i in existing_user:
            rows.append(i)
        return jsonify(rows)
    return 'sorry for inconvience'

@app.route('/delete', methods=['POST', 'GET'])
def delete():
    jobs = mongo.db.jobs
    if request.method =='POST':
        jobs.delete_one( { 'job_id': int(request.get_json()['job_id']) } )
        return 'job deleted'
    return 'sorry for inconvience'

@app.route('/que', methods=['POST', 'GET'])
def que():
    jobs = mongo.db.testque
    if request.method =='GET':
        temp = request.get_json()['job_id']
        temp1 = request.get_json()['question_no']
        ques = jobs.find_one({ 'job_id': int(temp), 'question_no' : int(temp1)},{'_id' : 0,'question_no':1,'question':1,'option_a':1,'option_b':1,'option_c':1,'option_d':1})
        return jsonify(ques)
    return 'sorry for inconvience'

#},{'app_emailid' : session['emailid']
@app.route('/apply', methods=['POST', 'GET'])
def applyjob():
    temp = request.get_json()['job_id']
    if request.method =='POST':
        users = mongo.db.jobapplications
        existing = users.find_one({'job_id' : int(temp),'app_emailid' : session['emailid']})
        if existing is None:
            jobs = mongo.db.jobs
            url = mongo.db.cvs
            urls = url.find_one({'emailid': session['emailid']})
            print(temp)
            jobid = jobs.find_one({'job_id' : int(temp)})
            print(jobid)
            temp1 = int(jobid['applicants'])+1
            users.insert({'job_id': int(request.get_json()['job_id']),'app_emailid': session['emailid']})
            jobs.update({'job_id' : int(temp)},{'job_id' : int(temp),'title': jobid['title'],'hires': jobid['hires'],
            'cpi' : jobid['cpi'],'salary' : jobid['salary'],'experience': jobid['experience'],
            'work' : jobid['work'],'perks': jobid['perks'],
            'wskills': jobid['wskills'],'wcpi': jobid['wcpi'],'wtest': jobid['wtest'],
            'wexperience': jobid['wexperience'],'deadline': jobid['deadline'],'skills' : jobid['skills'],
            'startdate' : jobid['startdate'],'starttime' : jobid['starttime'],
            'enddate' : jobid['enddate'],'endtime' : jobid['endtime'],
            'applicants' : temp1, 'numberofque' : jobid['numberofque']
            })
            temp = fn(urls['cvurl'],jobid['skills'])
            skill = mongo.db.skills
            skill.insert({'emailid': session['emailid'],'skillmarks': temp[0],'cpi': temp[1]})
            return 'succesfully applied for job'
        return 'you already applied for this job'
    return 'sorry for inconvience'

@app.route('/cancle', methods=['POST', 'GET'])
def cancle():
    temp = request.get_json()['job_id']
    if request.method =='POST':
        users = mongo.db.jobapplications
        existing = users.find_one({'job_id' : int(temp),'app_emailid' : request.get_json()['emailid']})
        if existing is not None:
            jobs = mongo.db.jobs
            jobid = jobs.find_one({'job_id' : int(temp)})
            temp1 = int(jobid['applicants'])-1
            users.delete_one({'job_id': int(request.get_json()['job_id']),'app_emailid': request.get_json()['emailid']})
            jobs.update({'job_id' : int(temp)},{'job_id' : int(temp),'title': jobid['title'],'hires': jobid['hires'],
            'cpi' : jobid['cpi'],'salary' : jobid['salary'],'experience': jobid['experience'],
            'work' : jobid['work'],'perks': jobid['perks'],
            'wskills': jobid['wskills'],'wcpi': jobid['wcpi'],'wtest': jobid['wtest'],
            'wexperience': jobid['wexperience'],'deadline': jobid['deadline'],'skills' : jobid['skills'],
            'startdate' : jobid['startdate'],'starttime' : jobid['starttime'],
            'enddate' : jobid['enddate'],'endtime' : jobid['endtime'],
            'applicants' : temp1, 'numberofque' : jobid['numberofque']
            })
            return 'succesfully cancle the registration for job'
        return 'you already applied for this job'
    return 'sorry for inconvience'

@app.route('/logout')
def logout():
	session.clear()
	return redirect(url_for('index'))

@app.route('/help')
def help():
    return render_template('help.html')
@app.route('/after_login')
@login_required
def after_login():
	return render_template('after_login.html')

app.secret_key = 'mysecret'

if __name__ == '__main__':  
    app.run(debug=True)
