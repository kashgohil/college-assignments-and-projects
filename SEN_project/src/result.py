# -*- coding: utf-8 -*-
"""
Created on Sat Mar  2 14:50:18 2019

@author: Hiren
"""

from google_drive_downloader import GoogleDriveDownloader as gdd
import PyPDF2 
import os
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords

def pdftotext():
       # pdfFileObj = urllib.urlopen("").read()
        pdfFileObj = open('/home/sanjay/data12345/ok.pdf', 'rb')
        pdfReader = PyPDF2.PdfFileReader(pdfFileObj)
        text = ""
        num_pages = pdfReader.numPages
        count = 0
        while count < num_pages:
            pageObj = pdfReader.getPage(count)
            count +=1
            text += pageObj.extractText()
        pdfFileObj.close() 
        return text

def is_number(s):
    try:
        float(s) 
    except ValueError:
        try:
            complex(s) 
        except ValueError:
            return False

    return True

def calculateScore(text, keyword_to_score_map):
    key_words = set()
    score = 0
    tokens = word_tokenize(text)
    punctuations = ['(',')',';',':','[',']',',']
    stop_words = stopwords.words('english')
    keywords = [word for word in tokens if not word in stop_words and not word in punctuations]
    f=0
    kk=0
    for word in keywords:
        if word.find('CPI') != -1:
            f=1
        if f==1 and is_number(word) and float(word)>=0 and float(word)<=10 :
            f=2 
            kk=float(word)        
        word=word.lower()
        print(word)
        if keyword_to_score_map.__contains__(word) and (not key_words.__contains__(word)):
              key_words.add(word)
              score = score + 1   
    return [score,kk]


def FileCheck(file_name):
    try:
        open(file_name,'r')
        return True
    except IOError:
        return False    

def fn(image_url,array):
    image_url=image_url.split('/')
    are=image_url[5]
    gdd.download_file_from_google_drive(file_id=are,
                               dest_path='/home/sanjay/data12345/ok.pdf',unzip=True)
    for word in array:
        word=word.lower()
    score = calculateScore(pdftotext(),array)
    return score