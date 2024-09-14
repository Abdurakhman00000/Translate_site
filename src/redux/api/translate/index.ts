import { api as index } from "..";

const api = index.injectEndpoints({
    endpoints: (builder) => ({
        translateText: builder.mutation<
            { data: { translations: Array<{ translatedText: string }> } }, // Исправлено: структура ответа
            { text: string; sourceLanguage: string; targetLanguage: string } // Добавлены sourceLanguage и targetLanguage
        >({
            query: (data) => ({
                url: `https://translation.googleapis.com/language/translate/v2?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`, // Полный URL
                method: 'POST',
                body: {
                    q: data.text,           
                    source: data.sourceLanguage,  
                    target: data.targetLanguage,  
                    format: 'text',         
                },
                headers: {
                    'Content-Type': 'application/json', // Убедитесь, что формат запроса указан
                }
            }),
            invalidatesTags: ["Translate"],
        }),
    }),
});

export const { useTranslateTextMutation } = api;
