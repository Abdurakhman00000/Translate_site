"use client";

import { useTranslateTextMutation } from "@/redux/api/translate";
import React, { useState, useEffect, useCallback } from "react";
import scss from "./Translator.module.scss";
import MicIcon from '@mui/icons-material/Mic';

const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const Translator = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState("en");
  const [sourceLanguage, setSourceLanguage] = useState("ru");

  const [translateText, { isError }] = useTranslateTextMutation();

  const handleTranslate = useCallback(
    async (text: string) => {
      if (!text) return;

      try {
        const result = await translateText({
          text,
          sourceLanguage,
          targetLanguage,
        }).unwrap();

        console.log("Результат перевода:", result);

        if (
          result &&
          result.data.translations &&
          result.data.translations.length > 0
        ) {
          setTranslatedText(result.data.translations[0].translatedText);
        }
      } catch (error) {
        console.error("Ошибка перевода:", error);
      }
    },
    [sourceLanguage, targetLanguage, translateText]
  );

  const debouncedTranslate = useCallback(debounce(handleTranslate, 500), [
    handleTranslate,
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setInputText(text);
    debouncedTranslate(text);
  };

  const handleSpeechRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Ваш браузер не поддерживает распознавание речи.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = sourceLanguage;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      handleTranslate(transcript); // Переводим сразу после распознавания
    };

    recognition.start();
  };

  return (
    <section className={scss.Translator}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.translator_selector}>
            <select
              value={sourceLanguage}
              onChange={(e) => setSourceLanguage(e.target.value)}
            >
              <option value="ru">Русский</option>
              <option value="en">Английский</option>
              <option value="de">Немецкий</option>
              <option value="zh">Китайский</option>
              <option value="es">Испанский</option>
              <option value="ky">Кыргызский</option>
            </select>

            <select
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
            >
              <option value="en">Английский</option>
              <option value="de">Немецкий</option>
              <option value="zh">Китайский</option>
              <option value="es">Испанский</option>
              <option value="ky">Кыргызский</option>
              <option value="ru">Русский</option>
            </select>
          </div>

          <div className={scss.translator_inputs}>
            <input
              type="text"
              placeholder="Введите текст"
              value={inputText}
              onChange={handleInputChange}
            />

            <div className={scss.translator_result_place}>
              {translatedText && (
                <div>
                  <p>{translatedText}</p>
                </div>
              )}
            </div>
          </div>

          <div className={scss.translator_buttons}>
            <div className={scss.main_speech_button}>
              <button
                className={scss.speech_button}
                onClick={handleSpeechRecognition}
              >
                {isListening ? (
                  <MicIcon
                    sx={{ color: "red", fontSize: "50px", paddingTop: "5px" }}
                  />
                ) : (
                  <MicIcon
                    sx={{ color: "white", fontSize: "50px", paddingTop: "5px" }}
                  />
                )}
              </button>
            </div>
          </div>

          {isError && <p>Ошибка при переводе</p>}
        </div>
      </div>
    </section>
  );
};

export default Translator;
