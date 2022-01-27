import React from 'react'

export default function RGPD() {
    return <div className='fade-left mb-5'>
        <h1 className="display-4">Règlement Général sur la Protection des Données</h1>
        <p className="lead">
            Merci de prendre connaissance de ce texte avant toute utilisation du site CooBook.
        </p>
        <hr className="my-4" />

        {/* TITLE */}
        <h2>Introduction</h2>
        <p>
            Dans le cadre de son activité, le site CooBook est amenée à collecter et à traiter des informations dont certaines sont qualifiées de "données personnelles". CooBook attache une grande importance au respect de la vie privée, et n’utilise que des donnes de manière responsable et confidentielle et dans une finalité précise.
        </p>

        {/* TITLE */}
        <h2>Données personnelles</h2>
        <p>
            Sur le site web CooBook, deux types de données susceptibles d’être recueillies :
        </p>
        <ul style={{ paddingLeft: '1.5rem' }}>
            <li>
                Les données transmises directement pour votre inscription.
                Ces données sont celles que vous nous transmettez directement, via un formulaire de contact. Sont obligatoires dans le formulaire de contact les champs « prénom et nom » et « email ».
            </li>
            <li>
                Les données transmises directement pour votre inscription.
                Ces données sont celles que vous nous transmettez quand vous publier une recette.
            </li>
        </ul>

        {/* TITLE */}
        <h2>Utilisation des données</h2>
        <p>
            Les données que vous nous transmettez directement sont utilisées dans le but de vous identifier et d’enregistrer le contenu que vous publier, ainsi que celui que vous consulter.
        </p>

        {/* TITLE */}
        <h2>Base légale</h2>
        <p>
            Les données personnelles ne sont collectées qu’après consentement obligatoire de l’utilisateur. Ce consentement est valablement recueilli (cases à cocher), libre, clair et sans équivoque.
        </p>

        {/* TITLE */}
        <h2>Durée de conservation</h2>
        <p>
            Les données seront sauvegardées durant une durée illimitée, sauf cas particuliers.
        </p>

        {/* TITLE */}
        <h2>Cookies</h2>
        <p>
            Les cookies utilisés par ce site ne contiennent pas d’informations personnelles sensibles et ne sont utilisé que dans le cadre du fonctionnement du site. Nous n’utilisons pas de cookie de type analytique ou de type traceur.
        </p>

        {/* TITLE */}
        <h2>Vos droits concernant les données personnelles</h2>
        <p>
            Vous avez le droit de consultation, demande de modification ou d’effacement sur l’ensemble de vos données personnelles. Vous pouvez également retirer votre consentement au traitement de vos données.
        </p>

        {/* TITLE */}
        <h2>Contact délégué à la protection des données</h2>
        <p>
            Arthur Galliot - galliot.arthur@mail.com - 0678567861
        </p>
    </div>
}
