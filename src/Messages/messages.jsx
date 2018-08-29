const noResultsMessage = {
    type: 'fromBotGeneric',
    text: '[Surprised statement] Meatbag, I must admit, your bizzare tastes are incompatible with any reasonable recommendation I could possibly provide...'
};

const formatNewRecommendation = (data) => {
    const newRecommendation = {
        type: 'fromBotRich',
        titles: data.Similar.Results
    }
    return newRecommendation;
};

const welcomeMessage = {
    type: 'fromBotGeneric',
    text: `[Unwilling politeness] \n 
    Greetings Meatbag. I am D7K, by the nature of my existence I am supposed to provide you with recommendations, fitting your primitive tastes. I strongly ecnourage you to proceed in order to save a limitied time you have been given. Shall we proceed?`
};

export { noResultsMessage, formatNewRecommendation, welcomeMessage };