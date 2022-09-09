import React, { useState, useRef } from "react";
//import Navbar from "./Navbar";
import './Symptom.css'
import SymptomButton from "./SymptomButton";
import axios from 'axios'
import Multiselect from "multiselect-react-dropdown"
import { useSearchParams } from "react-router-dom";
//import { useGlobalState } from "./state";
//import Doctor from "./Doctor";
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const initial_symptoms = ['itching', 'skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing', 'shivering', 'chills', 'joint_pain', 'stomach_pain', 'acidity', 'ulcers_on_tongue', 'muscle_wasting', 'vomiting', 'burning_micturition', 'spotting_urination', 'fatigue', 'weight_gain', 'anxiety', 'cold_hands_and_feets', 'mood_swings', 'weight_loss', 'restlessness', 'lethargy', 'patches_in_throat', 'irregular_sugar_level', 'cough', 'high_fever', 'sunken_eyes', 'breathlessness', 'sweating', 'dehydration', 'indigestion', 'headache', 'yellowish_skin', 'dark_urine', 'nausea', 'loss_of_appetite', 'pain_behind_the_eyes', 'back_pain', 'constipation', 'abdominal_pain', 'diarrhoea', 'mild_fever', 'yellow_urine', 'yellowing_of_eyes', 'acute_liver_failure', 'fluid_overload', 'swelling_of_stomach', 'swelled_lymph_nodes', 'malaise', 'blurred_and_distorted_vision', 'phlegm', 'throat_irritation', 'redness_of_eyes', 'sinus_pressure', 'runny_nose', 'congestion', 'chest_pain', 'weakness_in_limbs', 'fast_heart_rate', 'pain_during_bowel_movements', 'pain_in_anal_region', 'bloody_stool', 'irritation_in_anus', 'neck_pain', 'dizziness', 'cramps', 'bruising', 'obesity', 'swollen_legs', 'swollen_blood_vessels', 'puffy_face_and_eyes', 'enlarged_thyroid', 'brittle_nails', 'swollen_extremeties', 'excessive_hunger', 'extra_marital_contacts', 'drying_and_tingling_lips', 'slurred_speech', 'knee_pain', 'hip_joint_pain', 'muscle_weakness', 'stiff_neck', 'swelling_joints', 'movement_stiffness', 'spinning_movements', 'loss_of_balance', 'unsteadiness', 'weakness_of_one_body_side', 'loss_of_smell', 'bladder_discomfort', 'foul_smell_ofurine', 'continuous_feel_of_urine', 'passage_of_gases', 'internal_itching', 'toxic_look_(typhos)', 'depression', 'irritability', 'muscle_pain', 'altered_sensorium', 'red_spots_over_body', 'belly_pain', 'abnormal_menstruation', 'dischromic_patches', 'watering_from_eyes', 'increased_appetite', 'polyuria', 'family_history', 'mucoid_sputum', 'rusty_sputum', 'lack_of_concentration', 'visual_disturbances', 'receiving_blood_transfusion', 'receiving_unsterile_injections', 'coma', 'stomach_bleeding', 'distention_of_abdomen', 'history_of_alcohol_consumption', 'fluid_overload', 'blood_in_sputum', 'prominent_veins_on_calf', 'palpitations', 'painful_walking', 'pus_filled_pimples', 'blackheads', 'scurring', 'skin_peeling', 'silver_like_dusting', 'small_dents_in_nails', 'inflammatory_nails', 'blister', 'red_sore_around_nose', 'yellow_crust_ooze']
const opt = ['itching', 'skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing', 'shivering', 'chills', 'joint_pain', 'stomach_pain', 'acidity', 'ulcers_on_tongue', 'muscle_wasting', 'vomiting', 'burning_micturition', 'spotting_urination', 'fatigue', 'weight_gain', 'anxiety', 'cold_hands_and_feets', 'mood_swings', 'weight_loss', 'restlessness', 'lethargy', 'patches_in_throat', 'irregular_sugar_level', 'cough', 'high_fever', 'sunken_eyes', 'breathlessness', 'sweating', 'dehydration', 'indigestion', 'headache', 'yellowish_skin', 'dark_urine', 'nausea', 'loss_of_appetite', 'pain_behind_the_eyes', 'back_pain', 'constipation', 'abdominal_pain', 'diarrhoea', 'mild_fever', 'yellow_urine', 'yellowing_of_eyes', 'acute_liver_failure', 'fluid_overload', 'swelling_of_stomach', 'swelled_lymph_nodes', 'malaise', 'blurred_and_distorted_vision', 'phlegm', 'throat_irritation', 'redness_of_eyes', 'sinus_pressure', 'runny_nose', 'congestion', 'chest_pain', 'weakness_in_limbs', 'fast_heart_rate', 'pain_during_bowel_movements', 'pain_in_anal_region', 'bloody_stool', 'irritation_in_anus', 'neck_pain', 'dizziness', 'cramps', 'bruising', 'obesity', 'swollen_legs', 'swollen_blood_vessels', 'puffy_face_and_eyes', 'enlarged_thyroid', 'brittle_nails', 'swollen_extremeties', 'excessive_hunger', 'extra_marital_contacts', 'drying_and_tingling_lips', 'slurred_speech', 'knee_pain', 'hip_joint_pain', 'muscle_weakness', 'stiff_neck', 'swelling_joints', 'movement_stiffness', 'spinning_movements', 'loss_of_balance', 'unsteadiness', 'weakness_of_one_body_side', 'loss_of_smell', 'bladder_discomfort', 'foul_smell_ofurine', 'continuous_feel_of_urine', 'passage_of_gases', 'internal_itching', 'toxic_look_(typhos)', 'depression', 'irritability', 'muscle_pain', 'altered_sensorium', 'red_spots_over_body', 'belly_pain', 'abnormal_menstruation', 'dischromic_patches', 'watering_from_eyes', 'increased_appetite', 'polyuria', 'family_history', 'mucoid_sputum', 'rusty_sputum', 'lack_of_concentration', 'visual_disturbances', 'receiving_blood_transfusion', 'receiving_unsterile_injections', 'coma', 'stomach_bleeding', 'distention_of_abdomen', 'history_of_alcohol_consumption', 'fluid_overload', 'blood_in_sputum', 'prominent_veins_on_calf', 'palpitations', 'painful_walking', 'pus_filled_pimples', 'blackheads', 'scurring', 'skin_peeling', 'silver_like_dusting', 'small_dents_in_nails', 'inflammatory_nails', 'blister', 'red_sore_around_nose', 'yellow_crust_ooze']


const symptoms = [
    'itching', 'skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing', 'shivering', 'chills', 'joint_pain', 'stomach_pain', 'acidity', 'ulcers_on_tongue', 'vomiting', 'fatigue', 'weight_gain', 'anxiety', 'cold_hands_and_feets', 'mood_swings', 'weight_loss', 'restlessness', 'lethargy', 'patches_in_throat', 'cough', 'high_fever', 'sunken_eyes', 'breathlessness', 'sweating'
]

var obj = { 'itching': 0, 'skin_rash': 1, 'nodal_skin_eruptions': 2, 'continuous_sneezing': 3, 'shivering': 4, 'chills': 5, 'joint_pain': 6, 'stomach_pain': 7, 'acidity': 8, 'ulcers_on_tongue': 9, 'muscle_wasting': 10, 'vomiting': 11, 'burning_micturition': 12, 'spotting_urination': 13, 'fatigue': 14, 'weight_gain': 15, 'anxiety': 16, 'cold_hands_and_feets': 17, 'mood_swings': 18, 'weight_loss': 19, 'restlessness': 20, 'lethargy': 21, 'patches_in_throat': 22, 'irregular_sugar_level': 23, 'cough': 24, 'high_fever': 25, 'sunken_eyes': 26, 'breathlessness': 27, 'sweating': 28, 'dehydration': 29, 'indigestion': 30, 'headache': 31, 'yellowish_skin': 32, 'dark_urine': 33, 'nausea': 34, 'loss_of_appetite': 35, 'pain_behind_the_eyes': 36, 'back_pain': 37, 'constipation': 38, 'abdominal_pain': 39, 'diarrhoea': 40, 'mild_fever': 41, 'yellow_urine': 42, 'yellowing_of_eyes': 43, 'acute_liver_failure': 44, 'fluid_overload': 117, 'swelling_of_stomach': 46, 'swelled_lymph_nodes': 47, 'malaise': 48, 'blurred_and_distorted_vision': 49, 'phlegm': 50, 'throat_irritation': 51, 'redness_of_eyes': 52, 'sinus_pressure': 53, 'runny_nose': 54, 'congestion': 55, 'chest_pain': 56, 'weakness_in_limbs': 57, 'fast_heart_rate': 58, 'pain_during_bowel_movements': 59, 'pain_in_anal_region': 60, 'bloody_stool': 61, 'irritation_in_anus': 62, 'neck_pain': 63, 'dizziness': 64, 'cramps': 65, 'bruising': 66, 'obesity': 67, 'swollen_legs': 68, 'swollen_blood_vessels': 69, 'puffy_face_and_eyes': 70, 'enlarged_thyroid': 71, 'brittle_nails': 72, 'swollen_extremeties': 73, 'excessive_hunger': 74, 'extra_marital_contacts': 75, 'drying_and_tingling_lips': 76, 'slurred_speech': 77, 'knee_pain': 78, 'hip_joint_pain': 79, 'muscle_weakness': 80, 'stiff_neck': 81, 'swelling_joints': 82, 'movement_stiffness': 83, 'spinning_movements': 84, 'loss_of_balance': 85, 'unsteadiness': 86, 'weakness_of_one_body_side': 87, 'loss_of_smell': 88, 'bladder_discomfort': 89, 'foul_smell_ofurine': 90, 'continuous_feel_of_urine': 91, 'passage_of_gases': 92, 'internal_itching': 93, 'toxic_look_(typhos)': 94, 'depression': 95, 'irritability': 96, 'muscle_pain': 97, 'altered_sensorium': 98, 'red_spots_over_body': 99, 'belly_pain': 100, 'abnormal_menstruation': 101, 'dischromic_patches': 102, 'watering_from_eyes': 103, 'increased_appetite': 104, 'polyuria': 105, 'family_history': 106, 'mucoid_sputum': 107, 'rusty_sputum': 108, 'lack_of_concentration': 109, 'visual_disturbances': 110, 'receiving_blood_transfusion': 111, 'receiving_unsterile_injections': 112, 'coma': 113, 'stomach_bleeding': 114, 'distention_of_abdomen': 115, 'history_of_alcohol_consumption': 116, 'blood_in_sputum': 118, 'prominent_veins_on_calf': 119, 'palpitations': 120, 'painful_walking': 121, 'pus_filled_pimples': 122, 'blackheads': 123, 'scurring': 124, 'skin_peeling': 125, 'silver_like_dusting': 126, 'small_dents_in_nails': 127, 'inflammatory_nails': 128, 'blister': 129, 'red_sore_around_nose': 130, 'yellow_crust_ooze': 131 }
var send_data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var temp = new Set;
const Symptom = () => {

    const [questionState, setQuestionset] = useState(symptoms)
    const [answerState, setAnswerset] = useState([])
    const multiselectRef = useRef()
    const [displayAnswer, setDisplayAnswer] = useState(false)
    const [disease, setDisease] = useState('')
    const [otherSymp, setOtherSymp] = useState([])
    const [precaution, setPrecaution] = useState([])
    const [desc, setDesc] = useState()
    const [displayDoctor, setDisplayDoctor] = useState(false)
    //var name=useGlobalState('token')[0].email
    //    if(name){
    //        name=name.split('@')[0]
    //    }
    //    console.log(name)

    // const getSelectedSearchedItems = () => {
    //     return multiselectRef.current.getSelectedItems()
    // }
    // const ClickHandler = (value) => {
    //     console.log(value.key)
    //     if (answerState.indexOf(value.key) <= -1) {

    //         setAnswerset([...answerState, value.key])
    //     } else {

    //         let filteredQuestion = answerState.filter(item => item !== value.key)
    //         setAnswerset(filteredQuestion)
    //     }
    // }

    // const getAnswerState = () => {
    //     var selectedSearchedSymptoms = multiselectRef.current.getSelectedItems()
    //     for (var i = 0; i < selectedSearchedSymptoms.length; i++) {

    //         //console.log(selectedSearchedSymptoms.indexOf(selectedSearchedSymptoms[i]))
    //         setAnswerset([...answerState, selectedSearchedSymptoms[i]])


    //     }
    // }
    const nextQuestionSubmit = () => {


        axios.post('http://localhost:5000/api/v1/ml/disease', {
            answerState
        }).then(res => {
            console.log(res.data.probabilityArray.answer)
            if (res.data.probabilityArray.answer) {
                console.log(res.data.probabilityArray.answer)
                if (res.data.probabilityArray.answer.length === 0) {
                    setDisplayAnswer(true)
                } else {
                    setQuestionset(res.data.probabilityArray.answer)
                }

            } else {
                console.log(res.data.probabilityArray.answer)
            }

        }).catch(err => {
            console.log(err)
        })
    }



    const submitHandler = () => {
        for (var i = 0; i < answerState.length; i++) {
            send_data[obj[answerState[i]]] = 1;
        }
        console.log(send_data);
        const data = {
            "symptom": send_data
        }
        axios.post('http://127.0.0.1:5000/api/disease', {
            data
        }).then(res => {
            console.log(res)
            // setDisplayAnswer(true)
            // setDisease(res.data.probabilityArray.answer)
            // console.log(res.data.probabilityArray.other_symp)
            // setOtherSymp(res.data.probabilityArray.other_symp)
            // setPrecaution(res.data.probabilityArray.precaution)
            // setDesc(res.data.probabilityArray.description)

        }).catch(err => {
            console.log(err)
        })
    }

    console.log(answerState)
    const getSelected = (item) => {
        return answerState.includes(item.key)
    }

    function showDoctor() {
        setDisplayDoctor(true)
    }


    return (
        <>

            <header id="header">
                <nav>
                    <div class="text-center">
                        <a class="nav-brand text-dark">
                            {
                                !displayAnswer ? <>Symptoms</> : <>Report</>
                            }
                        </a>
                    </div>
                </nav>
            </header>

            {
                !displayAnswer ? (
                    <div className="symContainer">
                        <div className="searchSize" style={{ width: '50%' }}>
                            <Multiselect
                                className="symSearch"
                                isObject={false}
                                options={opt}
                                ref={multiselectRef}
                                onSelect={(event) => {
                                    answerState.push(event[event.length - 1])
                                    console.log(answerState)
                                    temp.add(event[event.length - 1]);
                                }}
                                onRemove={(event) => {
                                    // console.log(event)
                                    for (let value of temp) {
                                        var f = 0
                                        for (var i = 0; i < event; i++) {
                                            if (event[i] == value) {
                                                f = 1;
                                                break;
                                            }
                                        }
                                        if (!f) {
                                            var filteredQuestion = []
                                            for (var i = 0; i < answerState.length; i++)
                                                if (answerState[i] != value)
                                                    filteredQuestion.push(answerState[i]);
                                            setAnswerset(filteredQuestion)
                                            temp.delete(value);
                                            break;
                                        }
                                    }


                                    console.log(answerState)
                                }}
                            />


                        </div>
                        {/* yellow region */}

                        <div className='d-flex flex-row justify-content-center '>
                            <button style={{ marginRight: '50px', border: 'none', borderRadius: '5px', marginTop: '20px', padding: '6px 20px', backgroundColor: '#00A6A6', color: 'white', }} onClick={submitHandler}>submit</button>
                            <button style={{ border: 'none', borderRadius: '5px', marginTop: '20px', padding: '6px 20px', backgroundColor: 'black', color: 'white', }} onClick={nextQuestionSubmit}>next</button>

                        </div>





                    </div>
                ) : (
                    !disease ? (
                        <div className='d-flex justify-content-center align-items-center reportDisease '>
                            <button style={{ marginRight: '50px', border: 'none', borderRadius: '5px', marginTop: '20px', padding: '6px 20px', backgroundColor: '#00A6A6', color: 'white', }} onClick={submitHandler}>submit</button>
                        </div>

                    ) :
                        <div>
                            <div className='reportDisease  mt-5'>
                                {/* <h2>Hi {name}!</h2> */}

                                <div className='d-flex flex-row'>
                                    As per your symptoms:
                                    <div className='d-flex flex-row ml-3'>
                                        {
                                            answerState.map((key, value) => (
                                                <p style={{ marginRight: '10px', fontWeight: '500' }}>{key},</p>
                                            ))
                                        }
                                    </div>
                                </div>

                                <p>We found out you are dignosed with</p>
                                <h1 style={{ fontFamily: 'Bebas Neue', textAlign: 'center', color: '#F49F0A', fontSize: '60px' }}>{disease}</h1>
                                <p style={{ color: '#00A6A6', fontWeight: '500' }}>{desc}</p>
                                The other common symptoms of this disease are:
                                <div className='d-flex flex-wrap'>
                                    {
                                        otherSymp.map((key, value) => (
                                            <p style={{ marginRight: '10px', fontWeight: 500 }}>{key},</p>
                                        ))
                                    }
                                </div>

                                <p>You can take following preacution in case of mild symptoms:</p>
                                <ul>
                                    <div className='d-flex flex-column'>
                                        {
                                            precaution.map((key, value) => (
                                                <li style={{ marginRight: '10px' }}>{key}</li>
                                            ))
                                        }
                                    </div>
                                </ul>
                                <p style={{ fontWeight: 500 }}>NOTE** In case these symptoms become severe we recommend you to visit your Doctor, you can show this report to them</p>

                                <button onClick={showDoctor} className='form-submit' style={{ 'border': 'none' }}>Consult specialist</button>
                            </div>




                        </div>

                )
            }

        </>
    )
}

export default Symptom