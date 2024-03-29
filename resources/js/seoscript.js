var seoObject = [
    {
        "@context": "https://schema.org",
        "@type": "Blog",
        "abstract": "Be it objectivist epistemology shaping my weltanschauung or pflichterfullung learned as part of my culture growing up, it all boils down to the quality of our lives and how well we take responsibility for ourselves as well as being erudite, together with a sense of Gezelligheld from my perspective, is what makes us co-exist to achieving a better civilization",
        "author": {
            "@type": "Person",
            "givenName": "Nathaniel",
            "familyName": "Cobbinah"
        },
        "blogPost": "I've had the taste of what it feels like to be a front-end, back-end, or combining both of these stack disciplines in my development as a professional developer.My plan to staying adaptable in the computing industry has been to have the requisite knowledge of best practices, tools and processes regarded by the industry to be optimal in building better systems that achieve business goals for individuals or corporate organizations, with top priority on establishing positive connections with clients. To sum it all, the end in sight is not only about moi-même seulement, but to making positive contributions in any environment of my presence."
    }
];

//seo
seoObject.forEach(structuredTextData => {
    const script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.textContent = structuredTextData;
    document.head.appendChild(script);
})

module.exports = seoObject
