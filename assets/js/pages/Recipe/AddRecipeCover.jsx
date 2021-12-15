import Axios from 'axios';
import React, { useState } from 'react'
import ImageUploader from 'react-images-upload';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addCover } from '../../services/recipeSlice';

export default function AddRecipeCover({ match, history }) {

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    /* GET THE RECIPE WE ARE CURRENTLY RECORDING */
    const IRI = localStorage.getItem('IRI')


    /* HANDLE IMAGE DROP */
    const [picture, setPicture] = useState([])
    const onDrop = (picture) => {
        setPicture(picture)
    }

    const handleSubmit = async () => {
        const formData = new FormData()
        formData.append('file', picture[0], picture[0].name)
        formData.append('recipe', IRI)
        try {
            const { data } = await Axios.post(IRI + '/image', formData)
            dispatch(addCover(data))
            toast.info('Félicitation, votre recette à bien été sauvegardée !')
            window.localStorage.removeItem('IRI')
            history.push('/')
        } catch (e) {
            toast.warning('Erreur, merci de réessayer.')
        }
    }
    return (
        <div className='fade-left'>
            <h1 className="display-4">Ajouter une photo de couverture</h1>
            <p className="lead">C'est cette photo qui sera l'illustration de votre recette</p>
            <hr className="my-4" />
            {/* THEN */}
            <div className="d-flex flex-column justify-content-center align-items-center">

                <form onSubmit={handleSubmit} className="form-group d-flex flex-column">

                    <ImageUploader
                        buttonText='Télécharger une photo'
                        onChange={onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.jpeg']}
                        maxFileSize={5242880}
                        buttonClassName='btn btn-outline-danger'
                        label="Taille max : 5mo. Types: JPG, JPEG, GIF, PNG."
                        singleImage={true}
                        fileSizeError="Taille max : 5mo"
                        withIcon={false}
                        withPreview={true}
                        fileTypeError="Ce format n'est pas pris en charge. Types: JPG, JPEG, GIF, PNG."
                    />
                    <button className={"btn mx-auto " + (loading && "disabled")}>
                        Enregistrer
                    </button>
                </form>
            </div>
        </div>

    )
}
