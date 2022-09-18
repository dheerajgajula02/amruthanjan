import React, { useState, useRef, useEffect } from "react";
//import Navbar from "./Navbar";
import './Symptom.css'
import axios from 'axios'
import Multiselect from "multiselect-react-dropdown"

const opt = ['itching', 'skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing', 'shivering', 'chills', 'joint_pain', 'stomach_pain', 'acidity', 'ulcers_on_tongue', 'muscle_wasting', 'vomiting', 'burning_micturition', 'spotting_urination', 'fatigue', 'weight_gain', 'anxiety', 'cold_hands_and_feets', 'mood_swings', 'weight_loss', 'restlessness', 'lethargy', 'patches_in_throat', 'irregular_sugar_level', 'cough', 'high_fever', 'sunken_eyes', 'breathlessness', 'sweating', 'dehydration', 'indigestion', 'headache', 'yellowish_skin', 'dark_urine', 'nausea', 'loss_of_appetite', 'pain_behind_the_eyes', 'back_pain', 'constipation', 'abdominal_pain', 'diarrhoea', 'mild_fever', 'yellow_urine', 'yellowing_of_eyes', 'acute_liver_failure', 'fluid_overload', 'swelling_of_stomach', 'swelled_lymph_nodes', 'malaise', 'blurred_and_distorted_vision', 'phlegm', 'throat_irritation', 'redness_of_eyes', 'sinus_pressure', 'runny_nose', 'congestion', 'chest_pain', 'weakness_in_limbs', 'fast_heart_rate', 'pain_during_bowel_movements', 'pain_in_anal_region', 'bloody_stool', 'irritation_in_anus', 'neck_pain', 'dizziness', 'cramps', 'bruising', 'obesity', 'swollen_legs', 'swollen_blood_vessels', 'puffy_face_and_eyes', 'enlarged_thyroid', 'brittle_nails', 'swollen_extremeties', 'excessive_hunger', 'extra_marital_contacts', 'drying_and_tingling_lips', 'slurred_speech', 'knee_pain', 'hip_joint_pain', 'muscle_weakness', 'stiff_neck', 'swelling_joints', 'movement_stiffness', 'spinning_movements', 'loss_of_balance', 'unsteadiness', 'weakness_of_one_body_side', 'loss_of_smell', 'bladder_discomfort', 'foul_smell_ofurine', 'continuous_feel_of_urine', 'passage_of_gases', 'internal_itching', 'toxic_look_(typhos)', 'depression', 'irritability', 'muscle_pain', 'altered_sensorium', 'red_spots_over_body', 'belly_pain', 'abnormal_menstruation', 'dischromic_patches', 'watering_from_eyes', 'increased_appetite', 'polyuria', 'family_history', 'mucoid_sputum', 'rusty_sputum', 'lack_of_concentration', 'visual_disturbances', 'receiving_blood_transfusion', 'receiving_unsterile_injections', 'coma', 'stomach_bleeding', 'distention_of_abdomen', 'history_of_alcohol_consumption', 'fluid_overload', 'blood_in_sputum', 'prominent_veins_on_calf', 'palpitations', 'painful_walking', 'pus_filled_pimples', 'blackheads', 'scurring', 'skin_peeling', 'silver_like_dusting', 'small_dents_in_nails', 'inflammatory_nails', 'blister', 'red_sore_around_nose', 'yellow_crust_ooze']
const ddesc = {
    'Gastroenteritis': 'An intestinal infection marked by diarrhoea, cramps, nausea, vomiting and fever.', 'hepatitis A': 'A highly contagious liver infection caused by the hepatitis A virus.', 'Hepatitis B': "A serious liver infection caused by the hepatitis B virus that's easily preventable by a vaccine.", 'Hepatitis C': 'An infection caused by a virus that attacks the liver and leads to inflammation.', 'Alcoholic hepatitis': 'Liver inflammation caused by drinking too much alcohol.', 'Common Cold': 'A common viral infection of the nose and throat.', 'Pneumonia': 'Infection that inflames air sacs in one or both lungs, which may fill with fluid.', 'Hypoglycemia': "Low blood sugar, the body's main source of energy.", 'Osteoarthristis': 'A type of arthritis that occurs when flexible tissue at the ends of bones wears down.', 'Urinary tract infection': 'An infection in any part of the urinary system, the kidneys, bladder or urethra.', 'Acne': 'Acne is a skin condition that occurs when your hair follicles become plugged with oil and dead skin cells. It causes whiteheads, blackheads or pimples. Acne is most common among teenagers, though it affects people of all ages.', 'Fungal infection': 'A fungal infection, also called mycosis, is a skin disease caused by a fungus. There are millions of species of fungi. They live in the dirt, on plants, on household surfaces, and on your skin. Sometimes, they can lead to skin problems like rashes or bumps.26-Jan-2022', 'Allergy': "Allergies occur when your immune system reacts to a foreign substance — such as pollen, bee venom or pet dander — or a food that doesn't cause a reaction in most people. Your immune system produces substances known as antibodies.05-Aug-2022", 'GERD': 'Gastroesophageal reflux disease (GERD) occurs when stomach acid repeatedly flows back into the tube connecting your mouth and stomach (esophagus). This backwash (acid reflux) can irritate the lining of your esophagus. Many people experience acid reflux from time to time.26-Jul-2022', 'Chronic cholestasis': 'Chronic cholestatic diseases, whether occurring in infancy, childhood or adulthood, are characterized by defective bile acid transport from the liver to the intestine, which is caused by primary damage to the biliary epithelium in most cases.', 'Drug Reaction': 'A drug allergy is the abnormal reaction of your immune system to a medication. Any medication — over-the-counter, prescription or herbal — is capable of inducing a drug allergy. However, a drug allergy is more likely with certain medications. The most common signs and symptoms of drug allergy are hives, rash or fever.15-Oct-2020', 'Peptic ulcer diseae': 'Peptic ulcers occur when acid in the digestive tract eats away at the inner surface of the stomach or small intestine. The acid can create a painful open sore that may bleed. Your digestive tract is coated with a mucous layer that normally protects against acid.11-Jun-2022', 'AIDS': "Acquired immunodeficiency syndrome (AIDS) is a chronic, potentially life-threatening condition caused by the human immunodeficiency virus (HIV\n). By damaging your immune system, HIV interferes with your body's ability to fight infection and disease.29-Jul-2022", 'Diabetes': 'Diabetes is a chronic (long-lasting) health condition that affects how your body turns food into energy. Your body breaks down most of the food you eat into sugar (glucose) and releases it into your bloodstream. When your blood sugar goes up, it signals your pancreas to release insulin.', 'Bronchial Asthma': "Asthma, also called bronchial asthma, is a disease that affects your lungs. It's a chronic (ongoing) condition, meaning it doesn't go away and needs ongoing medical management. Asthma affects more than 25 million people in the U.S. currently. This total includes more than 5 million children.19-Jan-2022", 'Hypertension ': 'Hypertension is when blood pressure is too high. Blood pressure is written as two numbers. The first (systolic) number represents the pressure in blood vessels when the heart contracts or beats. The second (diastolic) number represents the pressure in the vessels when the heart rests between beats.25-Aug-2021', 'Migraine': "A migraine is a headache that can cause severe throbbing pain or a pulsing sensation, usually on one side of the head. It's often accompanied by nausea, vomiting, and extreme sensitivity to light and sound.02-Jul-2021", 'Cervical spondylosis': 'Cervical spondylosis is the degeneration of the bones and disks in the neck. This condition can lead to a variety of problems, including herniated disks and bone spurs. As people age, the structures that make up the backbone and neck gradually develop wear and tear. These changes can include: Dehydrated disks.14-Jun-2022', 'Paralysis (brain hemorrhage)': 'About Hemorrhagic Stroke and Facial Paralysis\nA hemorrhagic stroke occurs when a blood vessel in the brain bursts, spilling blood into nearby tissues. The resulting pressure and blood flow interruption cause damage that may include facial paralysis — inability to move the muscles of the face on one or both sides.', 'Jaundice': "Jaundice is a condition in which the skin, whites of the eyes and mucous membranes turn yellow because of a high level of bilirubin, a yellow-orange bile pigment. Jaundice has many causes, including hepatitis, gallstones and tumors. In adults, jaundice usually doesn't need to be treated. Prevention.23-Jul-2018", 'Malaria': 'Malaria is a life-threatening disease caused by parasites that are transmitted to people through the bites of infected female Anopheles mosquitoes. It is preventable and curable. In 2020, there were an estimated 241 million cases of malaria worldwide. The estimated number of malaria deaths stood at 627 000 in 2020.26-Jul-2022', 'Chicken pox': 'Chickenpox is a highly contagious disease caused by the varicella-zoster virus (VZV). It can cause an itchy, blister-like rash. The rash first appears on the chest, back, and face, and then spreads over the entire body, causing between 250 and 500 itchy blisters.', 'Dengue': "Dengue viruses are spread to people through the bite of an infected Aedes species (Ae. aegypti or Ae. albopictus) mosquito. Almost half of the world's population, about 4 billion people, live in areas with a risk of dengue. Dengue is often a leading cause of illness in areas with risk.", 'Typhoid': "Typhoid fever is a bacterial infection that can spread throughout the body, affecting many organs. Without prompt treatment, it can cause serious complications and can be fatal. It's caused by a bacterium called Salmonella typhi, which is related to the bacteria that cause salmonella food poisoning.", 'Hepatitis D': 'Hepatitis D only occurs in people who are also infected with the hepatitis B virus\n. Hepatitis D is spread when blood or other body fluids from a person infected with the virus enters the body of someone who is not infected. Hepatitis D can be an acute, short-term infection or become a long-term, chronic infection.', 'Hepatitis E': 'Hepatitis E is a liver infection caused by the hepatitis E virus (HEV). HEV is found in the stool of an infected person. It is spread when someone unknowingly ingests the virus – even in microscopic amounts.22-Jun-2020', 'Tuberculosis': 'Overview. Tuberculosis (TB) is a potentially serious infectious disease that mainly affects the lungs. The bacteria that cause tuberculosis are spread from person to person through tiny droplets released into the air via coughs and sneezes.03-Apr-2021', 'Dimorphic hemmorhoids(piles)': 'Hemorrhoids (HEM-uh-roids), also called piles, are swollen veins in your anus and lower rectum, similar to varicose veins. Hemorrhoids can develop inside the rectum (internal hemorrhoids) or under the skin around the anus (external hemorrhoids). Nearly three out of four adults will have hemorrhoids from time to time', 'Heart attack': "A heart attack, also called a myocardial infarction, happens when a part of the heart muscle doesn't get enough blood. The more time that passes without treatment to restore blood flow, the greater the damage to the heart muscle. Coronary artery disease (CAD\n) is the main cause of heart attack.12-Jul-2022", 'Varicose veins': "Varicose veins are twisted, enlarged veins. Any vein that is close to the skin's surface (superficial) can become varicosed. Varicose veins most commonly affect the veins in the legs. That's because standing and walking increase the pressure in the veins of the lower body.03-Mar-2022", 'Hypothyroidism': "Hypothyroidism results when the thyroid gland fails to produce enough hormones. Hypothyroidism may be due to a number of factors, including: Autoimmune disease. The most common cause of hypothyroidism is an autoimmune disorder known as Hashimoto's thyroiditis.19-Nov-2020", 'Hyperthyroidism': "Hyperthyroidism (overactive thyroid) occurs when your thyroid gland produces too much of the hormone thyroxine. Hyperthyroidism can accelerate your body's metabolism, causing unintentional weight loss and a rapid or irregular heartbeat. Several treatments are available for hyperthyroidism.14-Nov-2020", 'Arthritis': 'Arthritis is the swelling and tenderness of one or more joints. The main symptoms of arthritis are joint pain and stiffness, which typically worsen with age. The most common types of arthritis are osteoarthritis and rheumatoid arthritis.15-Sept-2021', '(vertigo) Paroymsal  Positional Vertigo': "Overview. Benign paroxysmal positional vertigo (BPPV) is one of the most common causes of vertigo — the sudden sensation that you're spinning or that the inside of your head is spinning. BPPV causes brief episodes of mild to intense dizziness. It is usually triggered by specific changes in your head's position.05-Aug-2022", 'Psoriasis': 'Psoriasis is a skin disease that causes a rash with itchy, scaly patches, most commonly on the knees, elbows, trunk and scalp. Psoriasis is a common, long-term (chronic) disease with no cure. It can be painful, interfere with sleep and make it hard to concentrate.04-Jun-2022', 'Impetigo': 'In general, impetigo is a mild infection that can occur anywhere on the body. It most often affects exposed skin, such as around the nose and mouth or on the arms or legs. Symptoms include red, itchy sores that break open and leak a clear fluid or pus for a few days.'
}
var obj = { 'itching': 0, 'skin_rash': 1, 'nodal_skin_eruptions': 2, 'continuous_sneezing': 3, 'shivering': 4, 'chills': 5, 'joint_pain': 6, 'stomach_pain': 7, 'acidity': 8, 'ulcers_on_tongue': 9, 'muscle_wasting': 10, 'vomiting': 11, 'burning_micturition': 12, 'spotting_urination': 13, 'fatigue': 14, 'weight_gain': 15, 'anxiety': 16, 'cold_hands_and_feets': 17, 'mood_swings': 18, 'weight_loss': 19, 'restlessness': 20, 'lethargy': 21, 'patches_in_throat': 22, 'irregular_sugar_level': 23, 'cough': 24, 'high_fever': 25, 'sunken_eyes': 26, 'breathlessness': 27, 'sweating': 28, 'dehydration': 29, 'indigestion': 30, 'headache': 31, 'yellowish_skin': 32, 'dark_urine': 33, 'nausea': 34, 'loss_of_appetite': 35, 'pain_behind_the_eyes': 36, 'back_pain': 37, 'constipation': 38, 'abdominal_pain': 39, 'diarrhoea': 40, 'mild_fever': 41, 'yellow_urine': 42, 'yellowing_of_eyes': 43, 'acute_liver_failure': 44, 'fluid_overload': 117, 'swelling_of_stomach': 46, 'swelled_lymph_nodes': 47, 'malaise': 48, 'blurred_and_distorted_vision': 49, 'phlegm': 50, 'throat_irritation': 51, 'redness_of_eyes': 52, 'sinus_pressure': 53, 'runny_nose': 54, 'congestion': 55, 'chest_pain': 56, 'weakness_in_limbs': 57, 'fast_heart_rate': 58, 'pain_during_bowel_movements': 59, 'pain_in_anal_region': 60, 'bloody_stool': 61, 'irritation_in_anus': 62, 'neck_pain': 63, 'dizziness': 64, 'cramps': 65, 'bruising': 66, 'obesity': 67, 'swollen_legs': 68, 'swollen_blood_vessels': 69, 'puffy_face_and_eyes': 70, 'enlarged_thyroid': 71, 'brittle_nails': 72, 'swollen_extremeties': 73, 'excessive_hunger': 74, 'extra_marital_contacts': 75, 'drying_and_tingling_lips': 76, 'slurred_speech': 77, 'knee_pain': 78, 'hip_joint_pain': 79, 'muscle_weakness': 80, 'stiff_neck': 81, 'swelling_joints': 82, 'movement_stiffness': 83, 'spinning_movements': 84, 'loss_of_balance': 85, 'unsteadiness': 86, 'weakness_of_one_body_side': 87, 'loss_of_smell': 88, 'bladder_discomfort': 89, 'foul_smell_ofurine': 90, 'continuous_feel_of_urine': 91, 'passage_of_gases': 92, 'internal_itching': 93, 'toxic_look_(typhos)': 94, 'depression': 95, 'irritability': 96, 'muscle_pain': 97, 'altered_sensorium': 98, 'red_spots_over_body': 99, 'belly_pain': 100, 'abnormal_menstruation': 101, 'dischromic_patches': 102, 'watering_from_eyes': 103, 'increased_appetite': 104, 'polyuria': 105, 'family_history': 106, 'mucoid_sputum': 107, 'rusty_sputum': 108, 'lack_of_concentration': 109, 'visual_disturbances': 110, 'receiving_blood_transfusion': 111, 'receiving_unsterile_injections': 112, 'coma': 113, 'stomach_bleeding': 114, 'distention_of_abdomen': 115, 'history_of_alcohol_consumption': 116, 'blood_in_sputum': 118, 'prominent_veins_on_calf': 119, 'palpitations': 120, 'painful_walking': 121, 'pus_filled_pimples': 122, 'blackheads': 123, 'scurring': 124, 'skin_peeling': 125, 'silver_like_dusting': 126, 'small_dents_in_nails': 127, 'inflammatory_nails': 128, 'blister': 129, 'red_sore_around_nose': 130, 'yellow_crust_ooze': 131 }
var send_data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var temp = new Set;
const Symptom = () => {

    const [answerState, setAnswerset] = useState([])
    const multiselectRef = useRef()
    const [displayAnswer, setDisplayAnswer] = useState(false)
    const [disease, setDisease] = useState([])
    const [probability, setprob] = useState([])

    const submitHandler = async () => {
        setDisease([])
        setprob([])
        for (var i = 0; i < send_data.length; i++) {
            send_data[i] = 0;
        }
        for (var i = 0; i < answerState.length; i++) {
            send_data[obj[answerState[i]]] = 1;
        }
        console.log(send_data);
        const data = {
            "symptom": send_data
        }
        await axios.post('http://127.0.0.1:5000/api/disease', {
            data
        }).then(res => {
            console.log(res)
            setDisease(res.data.disease)
            console.log(disease)
            setprob(res.data.prob)
            console.log(probability)
            setDisplayAnswer(true)
            // console.log(res.data.probabilityArray.other_symp)
            // setOtherSymp(res.data.probabilityArray.other_symp)
            // setPrecaution(res.data.probabilityArray.precaution)
            // setDesc(res.data.probabilityArray.description)
        }).catch(err => {
            console.log(err)
        })
    }

    console.log(answerState)


    return (
        <>

            <header id="header">
                <nav>
                    <div class="text-center header1">
                        <a class="nav-brand text-dark" >
                            {
                                !displayAnswer ? <>Symptoms</> : <>Report</>
                            }
                        </a>
                    </div>
                </nav>
            </header>

            <div className="symContainer">
                <div className="searchSize" style={{ width: '50%' }}>
                    <Multiselect
                        className="symSearch"
                        isObject={false}
                        options={opt}
                        ref={multiselectRef}
                        onSelect={(event) => {
                            setAnswerset(event)
                            console.log(answerState)

                        }}
                        onRemove={(event) => {
                            console.log(answerState)
                            setAnswerset(event)
                        }}
                    />


                </div>

                <div class="container text-center">
                    <button class="btn px-5 pt-2 btn-success" onClick={submitHandler}><h5>Submit</h5></button>
                </div>
            </div>
            {           
            displayAnswer ? (<div class='m-5'>
                {
                disease.map((key,value) => (
                <div class="row-sm m-3 p-2 ">
                  <div class="card">
                    <div class="card-body cardback">
                      <h4 class="card-title"><b>{key}</b></h4>
                      <p class="card-prob">Probability : {probability[key]} %</p>
                      <p class="card-text">{ddesc[key]}</p>
                      <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                  </div>
              </div>))}




            </div>) : <></>}
        </>
    )
}

export default Symptom