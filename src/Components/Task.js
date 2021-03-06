import React, { useEffect, useState } from "react";
import { FormBuilder } from '@ginkgo-bioworks/react-json-schema-form-builder';
import firebase from '../util/Firebase'
import Form from "@rjsf/bootstrap-4";
import caseType from '../case_type.json'
import caseStage from '../case_stage.json'
import {
    useParams
  } from "react-router-dom";

const Builder = () => {
    const [schema, setSchema] = useState({})
    const [uiSchema, setUiSchema] = useState({})
    const [formResponses, setFormResponses] = useState({})
    let { id } = useParams();

    useEffect(() => {
        firebase.firestore().collection('stage').doc(id).get().then(doc => {
            let data = doc.data()
            if (data.end) {
                console.log(data.end)
                setSchema(JSON.parse(data.end))
            }
            if (data.end_ui) {
                console.log(data.end_ui)
                setUiSchema(JSON.parse(data.end_ui))
            }
        })
    }, [id])

    const handleSubmit = (e) => {
        // let data = {...formResponses, end: schema, end_ui: uiSchema}
        // firebase.firestore().collection('stage').doc(id).set(data)
        console.log(formResponses)
        // console.log(schema)
        // console.log(uiSchema)
        firebase.firestore().collection('tasks').doc(id).set(formResponses)
    }

    return (
        <div>
            <Form schema={schema} uiSchema={uiSchema} formData={formResponses} onChange={(e) => setFormResponses(e.formData)} onSubmit={handleSubmit} />
        </div>
    )
}


export default Builder


