import React from 'react'

export default function About() {
    return (
        <div>
            <h1 className="display-4">À propos</h1>
            <p className="lead">
                CooBook est le projet de fin de formation d'Arthur Galliot en vue de passer le titre de Développeur Web et Web Mobile (RNCP31114).</p>
            <hr className="my-4" />
            {/* THEN */}
            <p>Pensé comme un véritable réseau social centré sur les recettes de cuisine, le site s'inspire fortement d'Instagram pour en décortiquer certaine fonctionnalités, les comprendre et les appliquer.</p>
            <p>Ce site étant work in progress, certains comportements seront parfois hésitants, voir non fonctionnels, mais seront complétés et finalisés au fur et à mesure des mois de décembre / janvier.</p>
            <a href="https://www.arthur-galliot.com">www.arthur-galliot.com</a>
        </div>
    )
}
