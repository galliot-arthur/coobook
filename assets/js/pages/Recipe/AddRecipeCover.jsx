import Axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import ImageUploader from 'react-images-upload';
import { toast } from 'react-toastify';
import AddRecipeContext from '../../context/AddRecipeContext';

export default function AddRecipeCover({ match, history }) {
    const [loading, setLoading] = useState(false)

    /* GET THE RECIPE WE ARE CURRENTLY RECORDING */
    const { IRI, setIRI } = useContext(AddRecipeContext);
    useEffect(() => {
        if (IRI === "") setIRI(window.localStorage.getItem('recipeIRI'))
    }, [])

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
            await Axios.post(IRI + '/image', formData)
            toast.info('Félicitation, votre recette à bien été sauvegardée !')
            window.localStorage.removeItem('IRI')
            history.push('/')
        } catch (e) {
            toast.warning('Erreur, merci de réessayer.')
        }
    }
    return (
        <div>
            <h1 className="display-4">Ajouter une photo de couverture</h1>
            <p className="lead">C'est cette photo qui sera l'illustration de votre recette</p>
            <hr className="my-4" />
            {/* THEN */}

            <form onSubmit={handleSubmit} className="form-group">

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
                <div className="form-group mt-3">
                    <button className={"btn btn-primary " + (loading && "disabled")}>
                        Enregistrer
                    </button>
                </div>
            </form>
        </div>
    )
}
