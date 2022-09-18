from dis import dis
from flask import Flask, request, jsonify
from flask_cors import CORS
from array import array
from random import random
import numpy as np
import pickle

app = Flask(__name__)
CORS(app)

with open('model_pkl.pkl' , 'rb') as f:
    classifier = pickle.load(f)

disease = ['Fungal infection',
 'Allergy',
 'GERD',
 'Chronic cholestasis',
 'Drug Reaction',
 'Peptic ulcer diseae',
 'AIDS',
 'Diabetes',
 'Gastroenteritis',
 'Bronchial Asthma',
 'Hypertension ',
 'Migraine',
 'Cervical spondylosis',
 'Paralysis (brain hemorrhage)',
 'Jaundice',
 'Malaria',
 'Chicken pox',
 'Dengue',
 'Typhoid',
 'hepatitis A',
 'Hepatitis B',
 'Hepatitis C',
 'Hepatitis D',
 'Hepatitis E',
 'Alcoholic hepatitis',
 'Tuberculosis',
 'Common Cold',
 'Pneumonia',
 'Dimorphic hemmorhoids(piles)',
 'Heart attack',
 'Varicose veins',
 'Hypothyroidism',
 'Hyperthyroidism',
 'Hypoglycemia',
 'Osteoarthristis',
 'Arthritis',
 '(vertigo) Paroymsal  Positional Vertigo',
 'Acne',
 'Urinary tract infection',
 'Psoriasis',
 'Impetigo']

@app.route('/api/disease', methods=["POST"])
def testpost():
     body = request.get_json(force=True)['data']
     print(body)
     a = classifier.predict_proba([body['symptom']])[0]
     top_4_idx = list(np.argsort(a)[-4:])
     top_4_idx.reverse()
     ans=list()
     prob = {}
     for i in top_4_idx : 
        if (a[i]*100)!=0: 
            ans.append(disease[i])
            prob[disease[i]]=a[i]*100
     print(a)
     dictToReturn = {'disease':ans,'prob' : prob}
     return jsonify(dictToReturn)