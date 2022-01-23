import axios from 'axios';
import React, { useState } from 'react';
import ImageUploader from 'react-images-upload';
import { toast } from 'react-toastify';
import { EditIcons } from '../../ui/Icons';
import Images from '../recipes/Images';

export default function EditImage({ recipe }) {

    const [edit, setEdit] = useState(false)

    /* HANDLE IMAGE DROP */
    const [picture, setPicture] = useState([])
    const onDrop = (picture) => {
        setPicture(picture)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('file', picture[0], picture[0].name)
        formData.append('recipe', '/api/recipes/' + recipe.id)
        try {
            await axios.post('/api/recipes/' + recipe.id + '/image', formData)
            window.location.reload()
        } catch (e) {
            toast.warning('Erreur, merci de réessayer.')
        }
    }

    const handleError = ({ target }) => {
        target.src = 'images/recipes/default-placeholder.png'
    }

    if (edit) return <div className="d-flex flex-column align-items-center fade-left">
        <button onClick={() => setEdit(false)}>Annuler</button>
        <form onSubmit={handleSubmit} className='d-flex flex-column align-items-center'>
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
            <button type='submit' className="btn btn-outline-dark">
                Enregistrer
            </button>
        </form>
    </div>


    return <>
        <div className='position-relative'>
            <Images recipe={recipe} />
            <button onClick={() => setEdit(true)} className='position-absolute top-0 start-100 translate-middle badge rounded-pill text-muted bg-light'>
                <EditIcons size='12' />
            </button>
        </div>
    </>

}