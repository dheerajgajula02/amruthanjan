

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier

data = pd.read_csv("model\Training.csv")



del data['Unnamed: 133']

d_ss= data['prognosis']

dis_dict={}

count =0
for dis in d_ss:
  if dis not in dis_dict.keys():
    dis_dict[dis]=count
    count+=1

d_index =[]

for dis in d_ss:
  d_index.append(dis_dict[dis])



x= data.iloc[:, :-1].values


classifier = RandomForestClassifier(n_estimators=10, criterion='entropy', random_state=0)
classifier.fit(x, d_index)
randomLabel = np.random.randint(2, size=132)
print(classifier.predict_proba([randomLabel]))


