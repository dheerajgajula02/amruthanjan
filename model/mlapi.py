from array import array
from random import random
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import pickle

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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

@app.post('/disease')
async def sample(body:dict) : 
    # print(body['symptom'])
    # randomLabel = np.random.randint(2, size=132)
    a = classifier.predict_proba([body['symptom']])[0]
    top_4_idx = list(np.argsort(a)[-4:])
    # top_2_values = [a[i] for i in top_2_idx]
    # dict(sorted(x.items(), key=lambda item: item[1]))
    # print(disease[top_2_idx[0]])
    ans = [disease[i] for i in top_4_idx]
    return {"prediction": ans}