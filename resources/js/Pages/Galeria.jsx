import React, { useState, useEffect } from "react";
import { MDBLightbox } from "mdb-react-ui-kit";
import {
    MDBMultiCarousel,
    MDBMultiCarouselItem,
} from "mdb-react-multi-carousel";

const Galeria = ({ links }) => {
    const [youtubeVideoIds, setYoutubeVideoIds] = useState([]);
    const [instagramPostIds, setInstagramPostIds] = useState([]);

    useEffect(() => {
        // Función para extraer video IDs de enlaces de YouTube
        const extractYouTubeVideoIds = (links) => {
            return links.map((link) => {
                // Utiliza una expresión regular para encontrar el primer "=" en la URL de YouTube
                const match = link.link.match(/youtube\.com\/watch\?v=([^&]+)/);
                if (match && match[1]) {
                    // Si se encontró el ID del video, devuélvelo
                    return match[1];
                }
                // Si no se encontró, devuelve el enlace original (o puedes manejarlo de otra manera)
                return link.link;
            });
        };

        // Función para extraer IDs de publicaciones de Instagram
        const extractInstagramPostIds = (links) => {
            return links.map((link) => {
                // Utiliza una expresión regular para extraer el ID de la publicación de Instagram
                const match = link.link.match(/\/p\/([^/]+)/);
                if (match && match[1]) {
                    // Si se encontró el ID de la publicación, devuélvelo
                    return match[1];
                }
                // Si no se encontró, devuelve el enlace original (o puedes manejarlo de otra manera)
                return link.link;
            });
        };

        // Separar los enlaces de YouTube e Instagram
        const separateLinks = () => {
            const youtube = [];
            const instagram = [];

            if (links) {
                Object.keys(links).forEach((tipo) => {
                    links[tipo].forEach((link) => {
                        const platform = {
                            id: link.id,
                            type: tipo,
                            link: link.link,
                        };

                        if (tipo === "Youtube") {
                            youtube.push(platform);
                        } else if (tipo === "Instagram") {
                            instagram.push(platform);
                        }
                    });
                });
            }

            return { youtube, instagram };
        };

        const { youtube, instagram } = separateLinks();

        // Extraer video IDs de enlaces de YouTube
        const extractedYoutubeVideoIds = extractYouTubeVideoIds(youtube);
        setYoutubeVideoIds(extractedYoutubeVideoIds);

        // Extraer IDs de publicaciones de Instagram
        const extractedInstagramPostIds = extractInstagramPostIds(instagram);
        setInstagramPostIds(extractedInstagramPostIds);
    }, [links]);

    return (
        <div>
            <MDBLightbox>
                <MDBMultiCarousel lightbox>
                    <MDBMultiCarouselItem
                        src="https://mdbcdn.b-cdn.net/img/Photos/Thumbnails/Slides/1.webp"
                        fullscreenSrc="https://mdbcdn.b-cdn.net/img/Photos/Slides/1.webp"
                        alt="Table Full of Spices"
                    />
                    <MDBMultiCarouselItem
                        src="https://mdbcdn.b-cdn.net/img/Photos/Thumbnails/Slides/2.webp"
                        fullscreenSrc="https://mdbcdn.b-cdn.net/img/Photos/Slides/2.webp"
                        alt="Winter Landscape"
                    />
                    <MDBMultiCarouselItem
                        src="https://mdbcdn.b-cdn.net/img/Photos/Thumbnails/Slides/3.webp"
                        fullscreenSrc="https://mdbcdn.b-cdn.net/img/Photos/Slides/3.webp"
                        alt="View of the City in the Mountains"
                    />
                    <MDBMultiCarouselItem
                        src="https://mdbcdn.b-cdn.net/img/Photos/Thumbnails/Slides/4.webp"
                        fullscreenSrc="https://mdbcdn.b-cdn.net/img/Photos/Slides/4.webp"
                        alt="Place Royale Bruxelles"
                    />
                </MDBMultiCarousel>
            </MDBLightbox>
            <h2>Videos de YouTube</h2>
            <div className="youtube-videos">
                {youtubeVideoIds.map((videoId) => (
                    <iframe
                        key={videoId}
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                ))}
                <h1>{youtubeVideoIds}</h1>
            </div>
            <h2>Publicaciones de Instagram</h2>

            <div className="instagram-links">
                {instagramPostIds.map((postId) => (
                    <div key={postId}>
                        <iframe
                            src={`https://www.instagram.com/p/${postId}/embed`}
                            width="500"
                            height="600"
                            frameBorder="0"
                            scrolling="no"
                            allowtransparency="true"
                        ></iframe>
                        Ver en Instagram
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Galeria;
