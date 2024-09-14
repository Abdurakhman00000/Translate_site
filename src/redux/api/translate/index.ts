import { api as index } from "..";

const api = index.injectEndpoints({
    endpoints: (builder) => ({
        translateText: builder.mutation<
            { data: { translations: Array<{ translatedText: string }> } }, 
            { text: string; sourceLanguage: string; targetLanguage: string } 
        >({
            query: (data) => ({
                url: `https://translation.googleapis.com/language/translate/v2?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`, 
                method: 'POST',
                body: {
                    q: data.text,           
                    source: data.sourceLanguage,  
                    target: data.targetLanguage,  
                    format: 'text',         
                },
                headers: {
                    'Content-Type': 'application/json', 
                }
            }),
            invalidatesTags: ["Translate"],
        }),
    }),
});

export const { useTranslateTextMutation } = api;
